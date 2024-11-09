from sqlalchemy import Column, Integer, String, ForeignKey, Float, Date
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..conn import Base

class HealthData(Base):
    __tablename__ = "health_data"
    
    id = Column(Integer, primary_key=True, index=True)

    weight = Column(Float)
    height = Column(Float)
    blood_pressure = Column(String)
    heart_rate = Column(Integer)
    sleep_hours = Column(Float)
    water_intake = Column(Float)
    activity_level = Column(String(20))

    # Thêm mục "bệnh lý hiện tại"
    current_conditions = Column(String, nullable=True)  # Bệnh lý hiện tại, có thể để trống

    # Thêm cột "date" với giá trị mặc định là ngày hiện tại
    date = Column(Date, default=func.current_date())

    # Quan hệ ngược lại với User
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)  # Quan hệ 1-1, user_id phải là unique
    user = relationship("User", back_populates="health_data")