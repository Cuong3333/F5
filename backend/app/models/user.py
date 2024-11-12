from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..conn import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    title =  Column(String)
    
    name = Column(String)  # Tên của người dùng

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    is_activate = Column(Boolean, nullable=False, default=True)

    isAdmin = Column(Boolean, nullable=False, default=True)

    # Quan hệ 1-n với Task (1 User có thể có nhiều nhiệm vụ)
    tasks = relationship("Task", back_populates="user")

    menus = relationship("Menu", back_populates="user")

    # Quan hệ với bảng UserProfile
    profile = relationship("UserProfile", back_populates="user", uselist=False)  # Thiết lập quan hệ 1-1