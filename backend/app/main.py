from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Thêm import này
from .conn import Base, engine
from .models import posts, user
from .router.User import router as user_router
from .router.Posts import router as posts_router

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
