from pydantic import BaseModel


class MenuCreate(BaseModel):
    MealType: str  # MORNING, LUNCH, DINNER, SNACK
    MenuName: str  # Tên thực đơn
    ServingSize: float  # Mặc định là 100g
    Calories: float  # Mặc định là 200 calo

    class Config:
        orm_mode = True
