# F5/backend/app/schema/PostOut.py
from pydantic import BaseModel
from datetime import datetime
from typing import List
from typing import Optional

class PostOut(BaseModel):
    id: int
    title: str
    content: str
    image_url: Optional[str]
    created_at: datetime
    owner_id: int
    like_count: int
    liked_by_user: bool  # Flag to indicate if the user liked the post

    class Config:
        orm_mode = True
