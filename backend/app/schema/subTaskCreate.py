from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SubTaskCreate(BaseModel):
    title: str
    date: datetime
    tag: Optional[str] = None

    class Config:
        orm_mode = True
