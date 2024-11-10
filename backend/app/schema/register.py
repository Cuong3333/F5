# app/schema/register.py

from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    title: str
    name: str
    password: str


