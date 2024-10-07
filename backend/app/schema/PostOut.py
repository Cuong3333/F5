from pydantic import BaseModel
from datetime import datetime

class PostOut(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime

    owner_id: int

    class Config:
        from_attributes  = True  # Bật chế độ tương thích với ORM
