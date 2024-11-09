from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...models.task import Task
from ...models.assets import Asset
from ...models.team import TeamMember
from ...models.user import User
from ...schema.task import TaskCreate
from ...utilities.oauth2 import get_curent_user
from ...conn import get_db

router = APIRouter(
    tags=["Task"]
)

@router.post("/tasks/", status_code=status.HTTP_201_CREATED)
def create_task(
    task_create: TaskCreate,  # Schema xác thực dữ liệu đầu vào
    db: Session = Depends(get_db),
    current_user: User = Depends(get_curent_user)  # Lấy user hiện tại từ token
):
    try:
        # Tạo task mới
        new_task = Task(
            title=task_create.title,
            stage=task_create.stage,
            date=task_create.date,
            priority=task_create.priority,
            user_id=current_user.id  # Gắn task với người dùng hiện tại
        )
        
        db.add(new_task)
        db.commit()
        db.refresh(new_task)

        # Thêm assets (nếu có)
        for asset_url in task_create.assets:
            asset = Asset(url=asset_url, task_id=new_task.id)
            db.add(asset)

        # Thêm team (nếu có) với các trường name, title, email
        for team_member in task_create.teams:
            team_member_record = TeamMember(
                task_id=new_task.id, 
                name=team_member.name, 
                title=team_member.title, 
                email=team_member.email, 
                user_id=team_member.user_id  # Nếu cần user_id trong schema TeamMemberCreate, bạn có thể thêm vào
            )
            db.add(team_member_record)

        db.commit()

        # Lấy lại tất cả dữ liệu liên quan đến task
        new_task_with_details = db.query(Task).filter(Task.id == new_task.id).first()
        assets = db.query(Asset).filter(Asset.task_id == new_task.id).all()
        team_members = db.query(TeamMember).filter(TeamMember.task_id == new_task.id).all()

        # Trả về tất cả thông tin đã lưu
        return {
            "id": new_task_with_details.id,
            "title": new_task_with_details.title,
            "stage": new_task_with_details.stage,
            "date": new_task_with_details.date,
            "priority": new_task_with_details.priority,
            "assets": [{"id": asset.id, "url": asset.url} for asset in assets],
            "teams": [{"user_id": team_member.user_id} for team_member in team_members]
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
