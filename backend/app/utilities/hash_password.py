from passlib.context import CryptContext

# Tạo context để hash mật khẩu
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hàm để băm mật khẩu
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Hàm để kiểm tra mật khẩu đã băm
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)