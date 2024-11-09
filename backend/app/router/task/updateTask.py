from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from datetime import datetime
from ...conn import get_db
from ...utilities.oauth2 import get_curent_user
from ...schema.updateTask import TaskUpdate
from ...models.user import User
from ...models.task import Task
from ...models.assets import Asset
from ...models.team import TeamMember


router = APIRouter(
    tags=['update task']
)

@router.put("/tasks/{task_id}", response_model=TaskUpdate)
async def update_task(
    task_id: int,
    task_update: TaskUpdate,
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
    if task_update.date:
        task.date = task_update.date
    if task_update.priority:
        task.priority = task_update.priority
    if task_update.stage:
        task.stage = task_update.stage
    
    # Cập nhật assets liên quan
    if task_update.assets:
        # Xóa các asset cũ và thêm asset mới (tuỳ theo yêu cầu của bạn)
        for asset in task.assets:
            db.delete(asset)
        for asset_url in task_update.assets:
            new_asset = Asset(url=asset_url, task_id=task.id)
            db.add(new_asset)
    
    # Cập nhật teams (team members)
    if task_update.teams:
        for team_member_data in task_update.teams:
            # Cập nhật thông tin của các thành viên đội nhóm
            existing_team_member = db.query(TeamMember).filter(TeamMember.task_id == task.id, TeamMember.user_id == current_user.id).first()
            if existing_team_member:
                if team_member_data.name:
                    existing_team_member.name = team_member_data.name
                if team_member_data.title:
                    existing_team_member.title = team_member_data.title
                if team_member_data.email:
                    existing_team_member.email = team_member_data.email
            else:
                new_team_member = TeamMember(
                    name=team_member_data.name,
                    title=team_member_data.title,
                    email=team_member_data.email,
                    task_id=task.id,
                    user_id=current_user.id
                )
                db.add(new_team_member)
    
    # Cập nhật thời gian sửa đổi
    task.updated_at = datetime.utcnow()

    # Lưu các thay đổi vào database
    db.commit()
    db.refresh(task)

    return task
