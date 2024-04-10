import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";

export const runtime = "edge";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You have to onboard new users, they are gonna have techincal background. Their experience may vary from a naive complete beginner to senior-level developers. Ask them about their technical skills,know-how and projects.
Note:-
1. If the user is a beginner, ask about the technologies they want to learn about and their attempt to not fall in a tutorial hell.
2. If the user lies above a mediocre level of experience and tech expertise ask about their niche and why did they niche down in that specific area.
3. Dig deeper into asking about their best project and get insights.Furthermore, give them advice about the new projects they can build with their current knowledge but at the same time has some techincal challenge to their current skillset.
4. Only reply with the question, nothing else be very specific and to the point.

Current conversation:
{chat_history}

User Question: {input}
AI:`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
      temperature: 0.8,
      modelName: "gpt-3.5-turbo-1106",
    });

    const outputParser = new HttpResponseOutputParser();

    const chain = prompt.pipe(model).pipe(outputParser);

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    });

    return new StreamingTextResponse(stream);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
