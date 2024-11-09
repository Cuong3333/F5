from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from ..conn import Base
from datetime import datetime
import enum

# Định nghĩa Enum class cho type
class ActivityTypeEnum(str, enum.Enum):
    Inprogress = "In progress"
    started = "started"
    completed = "completed"

class Activities(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(ActivityTypeEnum), default=ActivityTypeEnum.started, nullable=False)  # Enum cho type
    activity = Column(String)
    date = Column(DateTime, default=datetime.utcnow)
    
    # Khóa ngoại tham chiếu đến bảng User
    by = Column(Integer, ForeignKey('users.id'), nullable=False)  # Tham chiếu đến user.id

    # Mối quan hệ với bảng User (nếu bạn cần)
    # user = relationship("User", back_populates="activities")

    # Khóa ngoại tham chiếu đến bảng Task
    task_id = Column(Integer, ForeignKey('tasks.id'))
    # Mối quan hệ với bảng Task
    task = relationship("Task", back_populates="activities")
