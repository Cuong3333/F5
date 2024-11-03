#app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Thêm import này
from .conn import Base, engine
from .models import posts, user
from .router.User import router as user_router
from .router.Posts import router as posts_router

import logging

# Cấu hình logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("app.log"),   # Ghi log vào file app.log
        logging.StreamHandler()           # Ghi log ra console để tiện theo dõi
    ]
)

logger = logging.getLogger(__name__)


app = FastAPI()

# Thêm middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Bạn có thể thay đổi "*" thành danh sách các miền cụ thể nếu cần
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức
    allow_headers=["*"],  # Cho phép tất cả các headers
)

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(posts_router)
