from pydantic import BaseModel
from datetime import date

class HealthData(BaseModel):
    weight: float
    height: float
    blood_pressure: str
    heart_rate: int
    sleep_hours: float
    water_intake: float
    activity_level: str
    current_conditions: str

    class Config:
        orm_mode = True  # Giúp tương tác với SQLAlchemy models
