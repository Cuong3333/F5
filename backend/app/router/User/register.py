# app/User/register.py

import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...models.user import User
from ...schema.register import UserCreate
from ...conn import get_db
from ...utilities.hash_password import hash_password

# Thiết lập logging
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/user",
    tags=["Register"]
)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(user_create: UserCreate, db: Session = Depends(get_db)):
    # Kiểm tra xem email đã tồn tại chưa
    logger.info(f"Attempting to register user with email: {user_create.email}")
    existing_user = db.query(User).filter(User.email == user_create.email).first()
    if existing_user:
        logger.warning(f"Registration failed: Email {user_create.email} is already registered.")
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
    
    # Băm mật khẩu trước khi lưu
    hashed_password = hash_password(user_create.password)
    
    # Tạo người dùng mới
    new_user = User(email=user_create.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    logger.info(f"User registered successfully with email: {user_create.email}, ID: {new_user.id}")
    
    return {"id": new_user.id, "email": new_user.email, "created_at": new_user.created_at}
