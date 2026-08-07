import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { toBaseMessages, toUIMessageStream } from "@ai-sdk/langchain";
import { createUIMessageStreamResponse, UIMessage } from "ai";
import { AstraRetriever } from "@/lib/astradb";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const langchainMessages = await toBaseMessages(messages);
    const chatHistory = langchainMessages.slice(0, -1);
    const currentMessageContent = langchainMessages.at(-1)?.text ?? "";

    const chatModel = new ChatOpenAI({
      modelName: "gpt-5",
      streaming: true,
      verbosity: "low",
      // The answer only needs to stuff retrieved context into a few short
      // sentences — no multi-step reasoning required. Left at the default
      // effort, gpt-5 spends many seconds "thinking" before the first
      // streamed token, which was most of the 90s latency.
      reasoning: { effort: "minimal" },
    });

    // Skip the rephrasing LLM call entirely on the first turn (no history
    // to disambiguate against) — the user's message is already a standalone
    // query. This cuts one full sequential gpt-5 round trip for the common
    // case of a fresh conversation.
    let searchQuery = currentMessageContent;
    if (chatHistory.length > 0) {
      const rephrasingModel = new ChatOpenAI({
        modelName: "gpt-5",
        // Query rewriting is a trivial, low-stakes task — minimal reasoning
        // effort is plenty and avoids paying gpt-5's full "thinking" budget.
        reasoning: { effort: "minimal" },
      });

      // Turn a follow-up question + chat history into a standalone search
      // query for retrieval (replaces the old createHistoryAwareRetriever).
      const rephrasePrompt = ChatPromptTemplate.fromMessages([
        new MessagesPlaceholder("chat_history"),
        ["user", "{input}"],
        [
          "user",
          "Given the above conversation, generate a search query to look up in order to get information relevant to the current question. " +
            "Don't leave out any relevant keywords, Only return the query and no other text.",
        ],
      ]);
      const rephraseResult = await rephrasePrompt.pipe(rephrasingModel).invoke({
        chat_history: chatHistory,
        input: currentMessageContent,
      });
      searchQuery = rephraseResult.text;
    }

    const retriever = new AstraRetriever();
    const docs = await retriever.invoke(searchQuery);
    const context = docs
      .map((doc) => `Page URL: ${doc.metadata.url}\n\nPage content:\n${doc.pageContent}`)
      .join("\n-------------\n");

    // Stuff the retrieved context into the system prompt and stream the
    // answer (replaces createStuffDocumentsChain + createRetrievalChain).
    const answerPrompt = ChatPromptTemplate.fromMessages([
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

    const stream = await answerPrompt.pipe(chatModel).stream({
      context,
      chat_history: chatHistory,
      input: currentMessageContent,
    });

    return createUIMessageStreamResponse({ stream: toUIMessageStream(stream) });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
