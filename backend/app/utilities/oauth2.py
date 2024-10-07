from jose import JWTError, jwt
from datetime import datetime, timedelta
from ..schema import oauth2_token
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from ...app import conn
from sqlalchemy.orm import Session
from ...app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')


SELECT_KEY = "stringkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SELECT_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def verify_access_token(token: str, credentials_exception):

    try:
        payload = jwt.decode(token, SELECT_KEY, algorithms=[ALGORITHM])

        id: str = payload.get("user_id")

        if id is None:
            raise credentials_exception
        
        token_data = oauth2_token.TokenData(id=str(id))

    except JWTError:
        raise credentials_exception
    
    return token_data

def get_curent_user(token: str = Depends(oauth2_scheme), db: Session = Depends(conn.get_db)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                          detail=f"could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
    token = verify_access_token(token, credentials_exception)
    user = db.query(User).filter(User.id == token.id).first()
    return user