from fastapi import APIRouter
from .auth import router as auth_router
from .register import router as register_router
from .logout import router as logout_router
from .user_profile import router as user_profile_router

router = APIRouter()
router.include_router(auth_router)
router.include_router(register_router)
router.include_router(logout_router)
router.include_router(user_profile_router)
