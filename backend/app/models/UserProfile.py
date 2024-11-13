# app/models/UserProfile.py

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..conn import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # Khoá ngoại đến bảng User
    
    # Các cột khác
    name = Column(String, nullable=True)
    goal = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    weight = Column(Integer, nullable=True)
    health_history = Column(String, nullable=True)
    
    # Quan hệ với User
    user = relationship("User", back_populates="profile")
