from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from ..conn import Base

class SubTask(Base):
    __tablename__ = "sub_tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    date = Column(DateTime)
    tag = Column(String)

    # Khóa ngoại tham chiếu đến Task
    task_id = Column(Integer, ForeignKey('tasks.id'))
    task = relationship("Task", back_populates="sub_tasks")
