import { ChatOpenAI } from "@langchain/openai";
import { LangChainStream, OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessageParam } from "ai/prompts";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const { stream, handlers } = LangChainStream();

    const chatModel = new ChatOpenAI({
      modelName: "gpt-5-nano",
      streaming: true,
      callbacks: [handlers],
      maxRetries: 2,
    });

    // this is a template for LangChain
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a sarcasm bot. You answer all user questions in a sarcastic way.",
      ],
      ["user", "{input}"],
    ]);

    const chain = prompt.pipe(chatModel);

    const currentMessageContent = messages[messages.length - 1].content;
    chain.invoke({
      input: currentMessageContent,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
