# app/router/user_profile.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ...schema.user_profile_schema import UserProfileRequest
from ...models.user import User
from ...models.UserProfile import UserProfile

from ...conn import get_db

router = APIRouter()

@router.post("/save-user-profile/{user_id}")
async def save_user_profile(user_id: int, profile_data: UserProfileRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Nếu user profile đã tồn tại, cập nhật nó
    user_profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    if user_profile:
        for key, value in profile_data.dict().items():
            setattr(user_profile, key, value)
    else:
        user_profile = UserProfile(user_id=user_id, **profile_data.dict())
        db.add(user_profile)
    
    db.commit()
    db.refresh(user_profile)
    return {"message": "User profile saved successfully"}
