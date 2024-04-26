import asyncio
from typing import Union
from fastapi import FastAPI
from prisma import Prisma
from langchain_community.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

async def main() -> None:
    print('Start of the function')
    db = Prisma(auto_register=True)
    await db.connect()

    user = await db.user.find_first({
        "where":{
            "email":'harshana555prajapati@gmail.com'
        }
    })

    print(user)
    
    await db.disconnect()

def initials(question):
  chat = ChatOpenAI(
      temperature=0.7,
      openai_api_key='',
      model='gpt-4'
      )
  kb = '''

  '''
  template_string = '''
  You are a translator,  convert user query to spanish  
  user query:{query}
  '''
  prompt_template = ChatPromptTemplate.from_template(template_string)
  message = prompt_template.format_messages(query=question)
  return chat(message)


@app.get("/")
def read_root():
    asyncio.run(main())
    # return initials(question)
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id:int, q:Union[str,None]):
    return {"item_id":item_id, "q": q }
