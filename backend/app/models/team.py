from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..conn import Base

class TeamMember(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    title = Column(String)
    email = Column(String)  # Có thể không cần thiết nữa nếu đã có user_id

    # Mối quan hệ với bảng Task
    task_id = Column(Integer, ForeignKey('tasks.id'))
    task = relationship("Task", back_populates="teams") # teams là thuộc tính bên models task
    
    # Mối quan hệ với bảng User
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)  # Tham chiếu đến bảng User
    user = relationship("User", back_populates="teams")
