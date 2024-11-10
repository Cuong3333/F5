from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from datetime import datetime
from ...conn import get_db
from ...utilities.oauth2 import get_curent_user
from ...schema.subTaskCreate import SubTaskCreate
from ...models.user import User
from ...models.task import Task
from ...models.subTask import SubTask

router = APIRouter(
    tags=['tạo nhiệm vụ phụ']
)

@router.post("/tasks/{task_id}/subtasks", response_model=SubTaskCreate)
async def create_subtask(
    task_id: int,
    subtask: SubTaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_curent_user)
):
    # Kiểm tra xem nhiệm vụ chính có tồn tại không và có thuộc về người dùng hiện tại không
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or you do not have access to this task"
        )

    # Tạo nhiệm vụ phụ
    new_subtask = SubTask(
        title=subtask.title,
        date=subtask.date,
        tag=subtask.tag,
        task_id=task_id  # Liên kết nhiệm vụ phụ với nhiệm vụ chính
    )

    # Lưu nhiệm vụ phụ vào cơ sở dữ liệu
    db.add(new_subtask)
    db.commit()
    db.refresh(new_subtask)

    return { 'new_task' : new_subtask, 'message': 'Update successfull !!'}
