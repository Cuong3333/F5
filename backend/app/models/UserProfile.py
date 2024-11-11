# app/models/UserProfile.py

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..conn import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # Tham chiếu đến bảng User
    
    # Các cột lưu trữ thông tin chi tiết
    name = Column(String, nullable=True)  # Tên người dùng
    goal = Column(String, nullable=True)  # Mục tiêu người dùng
    gender = Column(String, nullable=True)  # Giới tính người dùng (Nam hoặc Nữ)
    age = Column(Integer, nullable=True)  # Tuổi người dùng
    height = Column(Integer, nullable=True)  # Chiều cao người dùng (cm)
    weight = Column(Integer, nullable=True)  # Cân nặng người dùng (kg)
    health_history = Column(String, nullable=True)  # Tiền sử bệnh của người dùng
    
    # Thiết lập quan hệ 1-1 với User
    user = relationship("User", back_populates="profile")
