from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from ..conn import Base
from sqlalchemy.sql import func

def default_meal_type():
    current_hour = datetime.now().hour
    if 5 <= current_hour < 8:
        return 'MORNING'
    elif 10 <= current_hour < 12:
        return 'LUNCH'
    elif 18 <= current_hour < 20:
        return 'DINNER'
    else:
        return 'SNACK'

class Menu(Base):
    __tablename__ = "menu"

    MealPlanId = Column(Integer, primary_key=True, index=True)
    
    # Thêm trường tên món ăn
    MenuName = Column(String, default='No menu') 
   
    date = Column(DateTime, default=datetime.utcnow) 
    
    # MealType tự động xác định dựa trên thời gian
    MealType = Column(String, default=default_meal_type)  # Loại bữa ăn
    
    ServingSize = Column(Float, default=0)  # khẩu phần ăn số gam
    
    Calories = Column(Float, default=0) #calo

    is_trashed = Column(Boolean, default=False)
    
    user_id = Column(Integer, ForeignKey('users.id'))
    
    user = relationship("User", back_populates="menus")
