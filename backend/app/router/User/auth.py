# app/User/auth.py

import logging
from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from F5.backend.app.conn import get_db
from F5.backend.app.models.user import User
from F5.backend.app.utilities import hash_password
from F5.backend.app.utilities import oauth2
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

# Thiết lập logging
logger = logging.getLogger(__name__)

router = APIRouter(
    tags=['Login']
)

@router.post('/login', status_code=status.HTTP_200_OK)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Ghi log khi nhận được yêu cầu đăng nhập
    logger.info(f"Received login attempt for username: {user_credentials.username}")

    # Tìm người dùng trong cơ sở dữ liệu theo email
    user = db.query(User).filter(User.email == user_credentials.username).first()

    # Kiểm tra người dùng có tồn tại hay không
    if not user:
        logger.warning(f"Login failed for username: {user_credentials.username} - User not found")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid authentication credentials."
        )
    
    # Kiểm tra mật khẩu có đúng không
    if not hash_password.verify_password(user_credentials.password, user.hashed_password):
        logger.warning(f"Login failed for username: {user_credentials.username} - Incorrect password")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid authentication credentials."
        )
    
    # Tạo token truy cập
    access_token = oauth2.create_access_token(data={"user_id": str(user.id)})
    logger.info(f"Login successful for username: {user_credentials.username}")
    
    # Trả về token truy cập
    return {"access_token": access_token, "token_type": "bearer"}
