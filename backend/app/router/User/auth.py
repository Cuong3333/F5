from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from ...conn import get_db
from ...models.user import User
from ...utilities import hash_password
from ...utilities import oauth2
from fastapi.security.oauth2 import OAuth2PasswordRequestForm


router = APIRouter(
    tags=['Login']
)

@router.post('/login', status_code=status.HTTP_200_OK)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == user_credentials.username).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="xác thực không hợp lệ")
    # Xác thực mật khẩu
    if not hash_password.verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, 
                            detail=f"Invalid Credentials")
    
    
    access_token = oauth2.create_access_token(data={"user_id": str(user.id)})

    # Trả về token truy cập
    return {"access_token": access_token, "token_type": "bearer"}