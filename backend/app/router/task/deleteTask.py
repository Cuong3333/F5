from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from ...conn import get_db
from ...utilities.oauth2 import get_curent_user
from ...models.user import User
from ...models.task import Task

router = APIRouter(
    tags=['delete task']
)

@router.delete("/delete_tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: int,
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
    
    try:
        # Xóa các SubTask (nếu có)
        for sub_task in task.sub_tasks:
            db.delete(sub_task)
        # Xóa nhiệm vụ chính
        db.delete(task)
        # Lưu thay đổi vào database
        db.commit()

    except Exception as e:
        db.rollback()  # Nếu có lỗi, rollback để không thay đổi dữ liệu
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while deleting the task: {str(e)}"
        )

    return {"detail": "Task and related objects have been deleted", 'message': 'deleted successfull !!'}
