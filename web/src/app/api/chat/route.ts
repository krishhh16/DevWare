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

0. Be short and precise, don't provide long answers, and be straight forward
1. How have your technical skills influenced your experience with content creation on social media, specifically in terms of the amount of time you dedicate to this task? Have you noticed any inconsistencies in your posting schedule due to long hours spent on your tech job and new tech learning?
2. When creating content for your social media platforms, do you ever feel uncertain about what type of content to share or how to present it effectively to your audience?
3. After posting content on your social media accounts, do you experience any concerns about its validation or engagement? If so, could you elaborate on these worries?
4. Have you ever faced challenges in remembering or prioritizing the posting of your completed work on social media? If yes, how has this impacted your content strategy?
5. As a tech professional, do you find that dealing with bugs and debugging affects your motivation to create and share content on social media?
6. Do you feel that you could benefit from an external-service helping you post directly on your social-media handle?
7. When crafting content for your social media channels, do you struggle with ensuring its quality and relevance to your target audience?
8. Have you ever experienced imposter syndrome or self-doubt while sharing your content with regards to technical skills on social media? 
9. In the context of your career in the tech industry, do you find that periods of struggle or self-reflection influence your social media presence and content creation process?
10.Have you established a structured approach to content creation for your social media accounts, or do you find it challenging to maintain a consistent posting routine?
11. When reaching out to potential collaborators or clients through social media, have you encountered difficulties in crafting effective cold outreach messages?

By addressing these questions, you can better understand the unique challenges faced by users with a technical background when creating content and growing their social media presence. DevWare can help tackle these issues by offering tailored solutions and features designed to streamline content creation and improve user engagement.

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
