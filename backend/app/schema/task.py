from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from typing import List, Optional

class StageType(str, Enum):
    completed = "completed"
    start = "start"
    inProgress = "in progress"

class PriorityType(str, Enum):
    high = "high"
    medium = "medium"
    normal = "normal"
    low = "low"

class TeamMemberCreate(BaseModel):
    name: str
    title: Optional[str] = None
    email: Optional[str] = None
    user_id: int  # Thêm trường user_id

class TaskCreate(BaseModel):
    title: str
    date: datetime
    priority: PriorityType
    stage: StageType
    assets: Optional[List[str]] = []
    teams: Optional[List[TeamMemberCreate]] = []  # Thêm các thông tin về team vào schema
    
    class Config:
        orm_mode = True
