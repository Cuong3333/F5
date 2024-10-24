from fastapi import APIRouter
from .demo import router as router_demo

router = APIRouter()

router.include_router(router_demo)