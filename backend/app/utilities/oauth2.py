from jose import JWTError, jwt
from datetime import datetime, timedelta
from ..schema.oauth2_token import TokenData  # Đảm bảo rằng TokenData đã được định nghĩa trong schema
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from ..conn import get_db  # Sử dụng import đúng cho get_db
from sqlalchemy.orm import Session
from ..models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')

# Đổi SELECT_KEY thành SECRET_KEY để dễ hiểu hơn
SECRET_KEY = "stringkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
        token_data = TokenData(id=user_id)  # Đảm bảo TokenData nhận tham số `id`
    except JWTError:
        raise credentials_exception
    return token_data

def get_curent_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Không thể xác thực thông tin đăng nhập",
        headers={"WWW-Authenticate": "Bearer"}
    )
    token_data = verify_access_token(token, credentials_exception)
    user = db.query(User).filter(User.id == token_data.id).first()
    
    # Trả về lỗi nếu không tìm thấy người dùng
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy người dùng"
        )
    
    return user
