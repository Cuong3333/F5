from fastapi import APIRouter
from .createTask import router as createTask_router
from .getTask import router as getTask_router
from .getTaskId import router as getTaskID_router
from .createSubTask import router as createSubTask_router
from .updateTask import router as updateTask_router
from .deleteTask import router as deleteTask_router

router = APIRouter()
router.include_router(createTask_router)
router.include_router(getTask_router)
router.include_router(getTaskID_router)
router.include_router(createSubTask_router)
router.include_router(updateTask_router)
router.include_router(deleteTask_router)

