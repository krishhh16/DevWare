from typing import Union
from fastapi import FastAPI
from prisma import Prisma

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello":"World"}

@app.get("/items/{item_id}")
def read_item(item_id:int, q:Union[str,None]):
    return {"item_id":item_id, "q": q }