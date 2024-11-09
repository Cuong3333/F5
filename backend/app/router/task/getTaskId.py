from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...conn import get_db
from ...utilities.oauth2 import get_curent_user
from sqlalchemy.orm import joinedload
from ...models.task import Task
from ...models.user import User
from ...schema.taskWithDetails import TaskWithDetails

router = APIRouter(
    tags=["get id task"]
)

@router.get("/tasks/{task_id}", response_model=TaskWithDetails)
async def get_task_details(
    task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_curent_user)
):
    # Kiểm tra xem người dùng có quyền truy cập vào nhiệm vụ này không
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or you do not have access to this task"
        )

    # Lấy tất cả các dữ liệu liên quan đến nhiệm vụ
    task_with_details = db.query(Task).filter(Task.id == task_id).options(
        joinedload(Task.sub_tasks),
        joinedload(Task.teams),
        joinedload(Task.activities),
        joinedload(Task.assets)
    ).first()

    return task_with_details
