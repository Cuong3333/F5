from sqlalchemy import Column, Integer, String, DateTime, Enum, Date, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from ..conn import Base
from sqlalchemy.sql import func

# Enum cho mức độ hoàn thành công việc (stage)
class StageType(enum.Enum):
    completed = "completed"
    start = "start"
    inProgress = "in progress"

# Enum cho mức độ ưu tiên (priority)
class PriorityType(enum.Enum):
    high = "high"
    medium = "medium"
    normal = "normal"
    low = "low"

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    
    # Sử dụng Enum cho mức độ ưu tiên (priority)
    priority = Column(Enum(PriorityType), default=PriorityType.normal)
    
    # Sử dụng Enum cho giai đoạn của công việc (stage)
    stage = Column(Enum(StageType), default=StageType.inProgress)
    
    is_trashed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Khóa ngoại liên kết với User
    user_id = Column(Integer, ForeignKey('users.id'))
    
    # Quan hệ với User (1 nhiệm vụ thuộc về 1 User)
    user = relationship("User", back_populates="tasks")

    # Các mối quan hệ khác
    assets = relationship("Asset", back_populates="task")
    teams = relationship("TeamMember", back_populates="task")
    activities = relationship("Activities", back_populates="task")  # Thay 'Activity' thành 'Activities'
    sub_tasks = relationship("SubTask", back_populates="task")
