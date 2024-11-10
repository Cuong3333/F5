from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from datetime import datetime
from ...conn import get_db
from ...utilities.oauth2 import get_curent_user
from ...schema.task import TaskCreate
from ...models.user import User
from ...models.task import Task


router = APIRouter(
    tags=['update task']
)

@router.put("/update_tasks/{task_id}")
async def update_task(
    task_id: int,
    task_update: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_curent_user)
):
    # Kiểm tra xem nhiệm vụ có tồn tại và có thuộc về người dùng hiện tại không
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or you do not have access to this task"
        )
    
    # Cập nhật các trường trong task chính
    if task_update.title:
        task.title = task_update.title
    if task_update.priority:
        task.priority = task_update.priority
    if task_update.stage:
        task.stage = task_update.stage
    
    # Cập nhật thời gian sửa đổi
    task.updated_at = datetime.utcnow()

    # Lưu các thay đổi vào database
    db.commit()
    db.refresh(task)

    return { 'new_task' : task, 'message': 'Update successfull !!'}
