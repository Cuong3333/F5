# app/router/user_profile.py

from fastapi import APIRouter, HTTPException, Depends,status
from sqlalchemy.orm import Session
from ...schema.user_profile_schema import UserProfileRequest
from ...models.user import User
from ...models.UserProfile import UserProfile
from ...utilities.oauth2 import get_curent_user

from ...conn import get_db

router = APIRouter()

@router.post("/save-user-profile")
async def save_user_profile(profile_data: UserProfileRequest, db: Session = Depends(get_db), current_user: User = Depends(get_curent_user) ):


    try:
        # Tạo task mới từ dữ liệu đầu vào
        new_user_profile = UserProfile(
            user_id=current_user.id,  
            name=profile_data.name,  
            goal=profile_data.goal, 
            gender=profile_data.gender, 
            age=profile_data.age,  
            height=profile_data.height, 
            weight=profile_data.weight, 
            health_history=profile_data.health_history
        )

        # Thêm task vào phiên làm việc của SQLAlchemy
        db.add(new_user_profile)
        # Commit để lưu task vào database
        db.commit()
        # Refresh để lấy lại đối tượng task với ID mới được tạo từ DB
        db.refresh(new_user_profile)

        return {
            "message": "Task created successfully!"  
        }

    except Exception as e:
        # Rollback nếu có lỗi xảy ra
        db.rollback()
        # Trả về thông báo lỗi HTTP 500 cùng với chi tiết lỗi
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
