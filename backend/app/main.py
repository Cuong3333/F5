from fastapi import FastAPI
from .conn import Base, engine
from .models import posts, user
from .router.User import router as user_router
from .router.Posts import router as posts_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_router)

app.include_router(posts_router)






