from fastapi import APIRouter
from .auth import router as auth_router
from .register import router as register_router

router = APIRouter()
router.include_router(auth_router)
router.include_router(register_router)