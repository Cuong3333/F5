from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Enum cho mức độ hoàn thành công việc (stage)
class StageType(str, Enum):
    completed = "completed"
    start = "start"
    inProgress = "in progress"

# Enum cho mức độ ưu tiên (priority)
class PriorityType(str, Enum):
    high = "high"
    medium = "medium"
    normal = "normal"
    low = "low"

class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    email: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    date: Optional[datetime] = None
    priority: Optional[PriorityType] = None
    stage: Optional[StageType] = None
    assets: Optional[List[str]] = []
    teams: Optional[List[TeamMemberUpdate]] = []  # Các thông tin đội nhóm có thể cần thay đổi

    class Config:
        orm_mode = True
