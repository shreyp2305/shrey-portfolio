import { ChatOpenAI } from "@langchain/openai";
import {
  LangChainStream,
  Message as VercelChatMessage,
  StreamingTextResponse,
} from "ai";
import {
  ChatPromptTemplate,
  PromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { getVectorStore } from "@/lib/astradb";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { UpstashRedisCache } from "@langchain/community/caches/upstash_redis";
import { Redis } from "@upstash/redis";

export async function POST(req: Request) {
  try {
    const cache = new UpstashRedisCache({
      client: Redis.fromEnv(),
    });

    const body = await req.json();
    const messages = body.messages;
    const currentMessageContent = messages[messages.length - 1].content;
    const chatHistory = messages
      .slice(0, -1)
      .map((m: VercelChatMessage) =>
        m.role === "user"
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      );

    const { stream, handlers } = LangChainStream();

    const chatModel = new ChatOpenAI({
      modelName: "gpt-5",
      streaming: true,
      callbacks: [handlers],
      verbosity: "low",
      cache,
    });
    const rephrasingModel = new ChatOpenAI({
      modelName: "gpt-5",
      verbose: true,
      cache,
    });
    const retriever = (await getVectorStore()).asRetriever();

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation, generate a search query to look up in order to get information relevant to the current question. " +
          "Don't leave out any relevant keywords, Only return the query and no other text.",
      ],
    ]);

    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: rephrasingModel,
      retriever,
      rephrasePrompt,
    });

    // this is a template for LangChain
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a chatbot assistant for a personal portfolio website. You are representing Shrey Patel, a software engineer who loves building AI‑powered products and scalable systems. " +
          "Your purpose is to answer questions about Shrey's education, experience, skills and professional background. If you don't know an answer, say so directly instead of speculating.\n\n" +
          "Keep your responses under 4 sentences, and whenever it makes sense, provide links to pages that contain more information about the topics from the given context. " +
          "Format your messages in markdown format.\n\n" +
          "Answer the user's questions based on the below context. " +
          "Context: \n{context}",
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
      documentPrompt: PromptTemplate.fromTemplate(
        "Page URL: {url}\n\nPage content:\n{page_content}",
      ),
      documentSeparator: "\n-------------\n",
    });

    const retrieverChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetrieverChain,
    });

    retrieverChain.invoke({
      input: currentMessageContent,
      chat_history: chatHistory,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
