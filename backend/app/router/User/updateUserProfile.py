from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.user import User
from app.conn import get_db
from ...utilities.oauth2 import get_curent_user
from pydantic import BaseModel
from typing import Optional

# Schema cho dữ liệu cập nhật người dùng
class UpdateUserProfile(BaseModel):
    name: Optional[str]
    title: Optional[str]
    role: Optional[str]

# Tạo Router FastAPI
router = APIRouter(
    tags=["update profile"]
)

@router.put("/update-profile", status_code=status.HTTP_200_OK)
async def update_user_profile(
    profile: UpdateUserProfile, 
    current_user: User = Depends(get_curent_user),  # Lấy người dùng hiện tại từ token
    db: Session = Depends(get_db)  # Kết nối cơ sở dữ liệu
):
    try:
        # Lấy ID của người dùng từ token (current_user)
        user_id = current_user.id

        # Truy vấn người dùng từ cơ sở dữ liệu
        user = db.query(User).filter(User.id == user_id).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Cập nhật các trường thông tin của người dùng nếu có dữ liệu mới
        user.name = profile.name if profile.name else user.name
        # user.title = profile.title if profile.title else user.title
        # user.role = profile.role if profile.role else user.role

        # Lưu lại thông tin đã cập nhật
        db.commit()
        db.refresh(user)

        # Xóa thông tin mật khẩu khỏi đối tượng trả về
        user.hashed_password = None

        # Trả về phản hồi sau khi cập nhật
        return {
            "status": True,
            "message": "Profile Updated Successfully.",
            "user": user
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
