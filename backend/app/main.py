#app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Thêm import này
from F5.backend.app.conn import Base, engine
from F5.backend.app.models import posts, user
from F5.backend.app.router.User import router as user_router
from F5.backend.app.router.Posts import router as posts_router

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
    allow_origins=["*","https://well-green.btecit.tech", "https://be-well-green.btecit.tech"],  # Bạn có thể thay đổi "*" thành danh sách các miền cụ thể nếu cần
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức
    allow_headers=["*"],  # Cho phép tất cả các headers
)

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(posts_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000)
