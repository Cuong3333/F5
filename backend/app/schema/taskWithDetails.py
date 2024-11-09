from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SubTaskBase(BaseModel):
    id: int
    title: str
    date: datetime
    tag: Optional[str]

class TeamMemberBase(BaseModel):
    id: int
    name: str
    title: Optional[str]
    email: Optional[str]

class TaskWithDetails(BaseModel):
    id: int
    title: str
    date: datetime
    priority: str
    stage: str
    is_trashed: bool
    created_at: datetime
    updated_at: datetime
    sub_tasks: List[SubTaskBase]
    teams: List[TeamMemberBase]

    class Config:
        orm_mode = True
