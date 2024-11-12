from fastapi import APIRouter
from .menu import router as menu_router


router = APIRouter()
router.include_router(menu_router)