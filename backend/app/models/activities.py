from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from ..conn import Base
from datetime import datetime
import enum

# Enum class cho type của Activities
class ActivityTypeEnum(str, enum.Enum):
    in_progress = "in_progress"
    started = "started"
    completed = "completed"

class Activities(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(ActivityTypeEnum), default=ActivityTypeEnum.started, nullable=False)
    activity = Column(String)
    date = Column(DateTime, default=datetime.utcnow)

    # Liên kết với bảng User và Task
    by = Column(Integer, ForeignKey('users.id'), nullable=False)
    task_id = Column(Integer, ForeignKey('tasks.id'))
    
    # Mối quan hệ với Task
    task = relationship("Task", back_populates="activities")
