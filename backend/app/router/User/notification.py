from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...models.task import Task, StageType
from ...models.user import User
from ...utilities.oauth2 import get_curent_user  # Dependency lấy người dùng hiện tại
from ...conn import get_db

router = APIRouter(tags=["Notification"])

@router.get("/Notification", response_model=dict)
def get_task_reminder(current_user: User = Depends(get_curent_user), db: Session = Depends(get_db)):
    try:
        # Truy vấn tất cả các nhiệm vụ của người dùng
        tasks = db.query(Task).filter(Task.user_id == current_user.id).all()
        
        if not tasks:
            raise HTTPException(
                status_code=404,
                detail="Không có nhiệm vụ nào cho người dùng này"
            )

        # Lọc các nhiệm vụ chưa hoàn thành hoặc trong quá trình làm
        incomplete_tasks = [task for task in tasks if task.stage != StageType.completed]

        # Số lượng nhiệm vụ chưa hoàn thành
        incomplete_count = len(incomplete_tasks)

        # Danh sách các nhiệm vụ đang trong quá trình làm (inProgress)
        in_progress_tasks = [task for task in incomplete_tasks if task.stage == StageType.inProgress]

        # Trả về thông báo
        return {
            "total_incomplete": incomplete_count,
            "in_progress_tasks": [{"title": task.title, "priority": task.priority} for task in in_progress_tasks]
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
