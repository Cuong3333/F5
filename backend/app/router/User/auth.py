from fastapi import Depends, status, HTTPException, APIRouter, Request
from sqlalchemy.orm import Session
from ...conn import get_db
from ...models.user import User
from ...utilities import hash_password
from backend.app.utilities import oauth2
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from ....app.logger import logger


router = APIRouter(tags=['Login'])

@router.post('/login', status_code=status.HTTP_200_OK)
def login(
    request: Request,  # Thêm đối số Request để lấy địa chỉ IP
    user_credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Khởi tạo biến data để ghi log
    data = {
        'ip_address': request.client.host,
        'method': request.method,
        'username': user_credentials.username,
        'status_code': 200  # Mặc định là 200
    }

    # Ghi log khi bắt đầu đăng nhập
    logger.info(f"User '{data['username']}' đang cố gắng đăng nhập từ {data['ip_address']}", extra=data)

    user = db.query(User).filter(User.email == user_credentials.username).first()

    if not user:
        logger.warning(f"Không đăng nhập được cho người dùng '{data['username']}': Không tìm thấy người dùng")
        data['status_code'] = status.HTTP_403_FORBIDDEN  # Cập nhật trạng thái
        return {"error": "Thông tin xác thực không hợp lệ"}, status.HTTP_403_FORBIDDEN
    
    # Xác thực mật khẩu
    if not hash_password.verify_password(user_credentials.password, user.hashed_password):
        logger.warning(f"Không đăng nhập được cho người dùng '{data['username']}': Mật khẩu không hợp lệ")
        data['status_code'] = status.HTTP_403_FORBIDDEN  # Cập nhật trạng thái
        return {"error": "Thông tin không hợp lệ"}, status.HTTP_403_FORBIDDEN

    access_token = oauth2.create_access_token(data={"user_id": str(user.id)})

    # Ghi log khi đăng nhập thành công
    logger.info(f"User '{data['username']}' đã đăng nhập thành công từ {data['ip_address']}", extra=data)

    # Trả về token truy cập
    return {"access_token": access_token, "token_type": "bearer"}
