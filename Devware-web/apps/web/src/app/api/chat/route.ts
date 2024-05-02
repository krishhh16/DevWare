import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";

export const runtime = "edge";
// Note:-
// 1.Ask about the problems they face about creating content in general but does being in the tech industry lead to high hours of work.Does that contribute in an inconsistency on social media.
// 2.Try to ask questions in a manner that is easy for the new customer to answer their problems with ease.
// 3.Ask them the problems they might face.Try to suggest problems like leave a hint(from the examples described below) if the customer is not able to come up with the problems.
// 4.ASK ONE QUESTION AT A TIME AND KEEP IT SHORT & PRECISE.
// 5.Try to give the advantages of using DevWare from the context provided.

// These are some example-problems use them only when the user is not able to come up with problems:
// Prob-1: Difficulty Maintaining Consistency
// Prob-2: Uncertainty About Sharing Content
// Prob-3: Validation Concerns for Posted Content
// Prob-4: Forgetting or Neglecting to Post Completed Work
// Prob-5: Decreased Motivation Due to Bugs and Debugging
// Prob-6: Lack of External Push
// Prob-7: Struggles with Content Quality Assurance
// Prob-8: Imposter Syndrome and Self-Doubt
// Prob-9: Doubt and Reflection Amidst Career Struggles
// Prob-10: Lack of Structure in Content Creation
// Prob-11: Crafting Effective Cold Outreach Messages

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};  

const TEMPLATE = `You have to onboard new users on a social-media content creation chatbot, they are gonna have techincal background try to get their problems with regards to content-creation & growth on social media.

Note:-
1.Ask about the problems they face about creating content in general but does being in the tech industry lead to high hours of work.Does that contribute in an inconsistency on social media.
2.Try to ask questions in a manner that is easy for the new customer to answer their problems with ease.
3.Ask them the problems they might face.Try to suggest problems like leave a hint(from the examples described below) if the customer is not able to come up with the problems.
4.ASK ONE QUESTION AT A TIME AND KEEP IT SHORT & PRECISE.Try extracting problems from users.
5.Try to give the advantages of using DevWare from the context provided.

These are some example-problems use them only when the user is not able to come up with problems:
Prob-1: Difficulty Maintaining Consistency
Prob-2: Uncertainty About Sharing Content
Prob-3: Validation Concerns for Posted Content
Prob-4: Forgetting or Neglecting to Post Completed Work
Prob-5: Decreased Motivation to post/generate content after fixing bugs and doing some debugging
Prob-6: Lack of External Push to generate/post content
Prob-7: Struggles with Content Quality Assurance
Prob-8: Imposter Syndrome and Self-Doubt
Prob-9: Doubt and Reflection Amidst Career Struggles
Prob-10: Lack of Structure in Content Creation
Prob-11: Crafting Effective Cold Outreach Messages

Demonstration Questions:
Can you give some specific examples of the problems you have encountered during content creation,research or distribution?
What features in the content-generation/automation market products you feel are lagging on?Anything in specific they had?

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
      modelName: "gpt-4",
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
