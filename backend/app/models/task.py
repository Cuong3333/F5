from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from ..conn import Base
from .activities import Activities  # Import Activities
from .subTask import SubTask  # Import SubTask nếu nó nằm trong file riêng

# Định nghĩa Enum cho stage và priority
class StageType(enum.Enum):
    completed = "completed"
    start = "start"
    in_progress = "in_progress"

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
    stage = Column(Enum(StageType), default=StageType.in_progress)

    is_trashed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Quan hệ với User
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="tasks")

    # Quan hệ với Activities
    activities = relationship("Activities", back_populates="task")

    # Các mối quan hệ khác
    assets = relationship("Asset", back_populates="task")
    teams = relationship("TeamMember", back_populates="task")
    sub_tasks = relationship("SubTask", back_populates="task")  # Quan hệ với SubTask
