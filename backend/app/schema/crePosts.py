# app/schema/crePosts.py

from pydantic import BaseModel

class PostCreate(BaseModel):
    title: str
    content: str
    
