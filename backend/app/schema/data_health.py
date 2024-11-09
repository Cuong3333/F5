from pydantic import BaseModel
from typing import Optional
from datetime import date  # Importing `date` type from `datetime`

class HealthDataCreate(BaseModel):
    weight: Optional[float] = None
    height: Optional[float] = None
    blood_pressure: Optional[str] = None
    heart_rate: Optional[int] = None
    sleep_hours: Optional[float] = None
    water_intake: Optional[float] = None
    activity_level: Optional[str] = None
    current_conditions: Optional[str] = None
    date: Optional[date] = None  # Use `date` from `datetime`

    class Config:
        orm_mode = True
