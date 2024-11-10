from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from ...conn import get_db
from ...models.user import User
from ...utilities import hash_password
from ...utilities import oauth2
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

# Thiết lập logging
import logging
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
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",  # Trả về lỗi 401 nếu thông tin sai
        )
    
    # Kiểm tra mật khẩu có đúng không
    if not hash_password.verify_password(user_credentials.password, user.hashed_password):
        logger.warning(f"Login failed for username: {user_credentials.username} - Incorrect password")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,  # Sử dụng 401 thay vì 403
            detail="Invalid authentication credentials."
        )

    # Tạo token truy cập
    access_token = oauth2.create_access_token(data={"user_id": str(user.id)})
    logger.info(f"Login successful for username: {user_credentials.username}")

    # Trả về thông tin người dùng kèm theo token
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "title": user.title,
            "created_at": user.created_at,
            "updated_at": user.updated_at,
            "isActivate": user.is_activate,
            "isAdmin": user.isAdmin
        }
    }
# F5/backend/app/router/User/auth.py

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from ...conn import get_db
from ...models.user import User
from ...utilities.oauth2 import verify_access_token  # Hàm xác thực token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')

def get_curent_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_access_token(token, credentials_exception)
    user = db.query(User).filter(User.id == token_data.id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user
