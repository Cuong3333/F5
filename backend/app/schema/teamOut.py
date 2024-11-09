from pydantic import BaseModel
from typing import Optional

class TeamMemberOut(BaseModel):
    name: str
    title: str
    email: str
    is_activate: bool  # Thêm trường is_activate từ User

    class Config:
        from_attributes = True  # Cấu hình để SQLAlchemy object có thể được chuyển thành Pydantic model
