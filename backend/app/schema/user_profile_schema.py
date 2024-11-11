# backend/app/schema/user_profile_schema.py

from pydantic import BaseModel
from typing import Optional

class UserProfileRequest(BaseModel):
    name: Optional[str] = None  # Tên người dùng
    goal: Optional[str] = None  # Mục tiêu người dùng
    gender: Optional[str] = None  # Giới tính người dùng
    age: Optional[int] = None  # Tuổi người dùng
    height: Optional[int] = None  # Chiều cao người dùng (cm)
    weight: Optional[int] = None  # Cân nặng người dùng (kg)
    health_history: Optional[str] = None  # Tiền sử bệnh của người dùng

    class Config:
        orm_mode = True
