# app/models/user.py

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from ..conn import Base

class User(Base):
    __tablename__ = "table_users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    