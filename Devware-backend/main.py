import asyncio
from typing import Union
from fastapi import FastAPI
from prisma import Prisma
from prisma.models import User
from langchain_community.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

knowledge_base = ''
ghdata = ''
onboard = ''

async def main() -> None:
    print('Start of the function')
    db = Prisma()
    await db.connect()

    knowledge_base = await db.knowledgebase.find_first(
        where={
        'OR': [
            {'email': {'contains': 'harshana555prajapati@gmail.com'}}
        ]
    }
    )

    ghdata = await db.ghdata.find_first(
        where={
        'OR': [
            {'email': {'contains': 'harshana555prajapati@gmail.com'}}
        ]
    }
    )
    
    onboard = await db.useronboard.find_first(
        where={
        'OR': [
            {'email': {'contains': 'harshana555prajapati@gmail.com'}}
        ]
     }
    )
    
    await db.disconnect()

def initials(context, thoughts, tone):
    chat = ChatOpenAI(
        temperature=0.9,
        openai_api_key='',
        model='gpt-4'
    )

    template_string = '''
        You're to create a Twitter post for the user. The post should meet the following requirements: 
        -Structure and Clarity: Keep the post structured and clean, ensuring that the content flows logically and is easy to read.
        -Human Touch: Craft the post in a way that it does not appear to be generated by an AI. Aim for a natural, conversational tone and avoid robotic or overly formal language.
        -User Context and Skills: Ensure that the post aligns with the user's technical background, interests, and skills, as provided in {onboard} (e.g., a brief description of the user's profile or areas of expertise).
        -Character Limit: The post should strictly be limited to 280 characters, adhering to Twitter's character limit.
        -Personalization and Emojis: Personalize the post to the user's profile, and consider adding up to two emojis if they enhance the content and align with the tone. However, do not add emojis unnecessarily or excessively.
        -User Knowledge Base: Incorporate relevant information from the user's {thoughts}. Take the resume as the source of experience {knowledge_base}.
        -Programming Languages: Tailor the post to reflect the programming languages the user has experience with, as mentioned in {ghdata} (e.g., a list of programming languages the user has coded in).
        -Tone and Context: Aim for a {tone} tone and the {context} for the post.
        
        Examples of the return value:
            1. Just completed my LeetCode clone! Architecture: Main Server manages services. Tech: React, Express.js, PostgreSQL, Monaco: Smooth editor, problem database, code execution, authentication with JWT, Redis for queuing.
            2. Stripe lets you stimulate the subscription lifecycle now 🤯
                1. Create a test subscription
                2. Advance time to next month (+31 days)
                3. Check your webhook handler works (grant/revoke access)
                Back to the future
            3.Cool to see a 500M param model I trained myself do better than Google cloud vision, Claude, and GPT-4V on this task.  (look at the thread for the results)
            It's a relatively narrow one (OCR), but feels nice to see that small open source models still have a place.
            4. dev team keeps 40% of the supply while doing presale (locked for 5 years with 1y linear vesting)
            The presale raises over $80,000,000 by selling only 28% of supply.
            What do you think about this tokenomics?
            5.The rise of AI means *great* software is necessary again. After spending all day looking at demos so far today, I can say resolutely: 
            Founders must learn how to make good user experiences again.
            I can tell immediately. I only want to fund people who can make great software.
        
    '''

    prompt_template = ChatPromptTemplate.from_template(template_string)
    message = prompt_template.format_messages(onboard= onboard, knowledge_base= knowledge_base, ghdata= ghdata, thoughts= thoughts, context=context, tone=tone)
    reply = chat(message)
    print(reply)
    return {"post": reply, "success": True}

@app.get("/")
def read_root(context: str, tone: str, thoughts):
    asyncio.run(main())
    print(f'context: {context}, tone: {tone}, thoughts: {thoughts}')
    return initials(context, thoughts , tone)
    