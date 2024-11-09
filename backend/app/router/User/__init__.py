from fastapi import APIRouter
from .auth import router as auth_router
from .register import router as register_router
from .logout import router as logout_router
from .getTeam import router as getTeam_router
from .notification import router as notification_router
from .updateUserProfile import router as updateUserProfile_router
from .sevaHealth_data import router as sevaHealth_data_router

router = APIRouter()
router.include_router(auth_router)
router.include_router(register_router)
router.include_router(logout_router)
router.include_router(getTeam_router)
router.include_router(notification_router)
router.include_router(updateUserProfile_router)
router.include_router(sevaHealth_data_router)
