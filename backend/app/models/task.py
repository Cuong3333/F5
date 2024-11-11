from sqlalchemy import Column, Integer, String, DateTime, Date, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from ..conn import Base
from sqlalchemy.sql import func

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=True)
    date = Column(DateTime, default=datetime.utcnow)
    
    # Sử dụng String cho mức độ ưu tiên (priority) và đặt mặc định là 'normal'
    priority = Column(String, default="NORMAL")
    
    # Sử dụng String cho giai đoạn của công việc (stage) và đặt mặc định là 'inProgress'
    stage = Column(String, default="INPROGRESS")
    
    is_trashed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Khóa ngoại liên kết với User
    user_id = Column(Integer, ForeignKey('users.id'))
    
    # Quan hệ với User (1 nhiệm vụ thuộc về 1 User)
    user = relationship("User", back_populates="tasks")

    # Các mối quan hệ khác
    sub_tasks = relationship("SubTask", back_populates="task")
