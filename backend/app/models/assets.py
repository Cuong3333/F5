from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..conn import Base

class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, nullable=False)

    task_id = Column(Integer, ForeignKey('tasks.id'))
    task = relationship("Task", back_populates="assets")
