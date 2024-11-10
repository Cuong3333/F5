from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

# Schema để tạo Task mới
class TaskCreate(BaseModel):
    title: str
    priority: str
    stage: str

    class Config:
        orm_mode = True
