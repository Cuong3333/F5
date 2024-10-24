from fastapi import FastAPI
import uvicorn
from .conn import Base, engine
from .router.User import router as user_router
from .router.Posts import router as posts_router
from .router.demo_logger import router as demo_logger_router
from .logger import logger


app = FastAPI()
logger.info("Starting API....")

Base.metadata.create_all(bind=engine)

app.include_router(user_router)

app.include_router(posts_router)

app.include_router(demo_logger_router)



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)





