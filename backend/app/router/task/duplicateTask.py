# from fastapi import APIRouter, HTTPException, Depends
# from sqlalchemy.orm import Session
# from datetime import datetime
# import models.assets
# import models.subTask
# import models.task
# import models.team
# from ...conn import get_db
# from ...models.user import User
# from ...utilities.oauth2 import get_curent_user

# router = APIRouter()

# @router.post("/tasks/{task_id}/duplicate")
# async def duplicate_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_curent_user)):
#     # Lấy nhiệm vụ gốc từ database
#     task = db.query(models.task.Task).filter(models.task.Task.id == task_id).first()

#     if not task:
#         raise HTTPException(status_code=404, detail="Task not found")

#     # Kiểm tra quyền của người dùng: chỉ người sở hữu nhiệm vụ mới có thể nhân bản
#     if task.user_id != current_user.id:
#         raise HTTPException(status_code=403, detail="You do not have permission to duplicate this task")

#     # Tạo nhiệm vụ mới và sao chép dữ liệu từ nhiệm vụ gốc
#     new_task = models.task.Task(
#         title=task.title + " - Duplicate",  # Thêm " - Duplicate" vào title
#         date=datetime.utcnow(),
#         priority=task.priority,
#         stage=task.stage,
#         user_id=task.user_id,  # Liên kết với user của nhiệm vụ gốc
#     )

#     db.add(new_task)
#     db.commit()
#     db.refresh(new_task)

#     # Nhân bản các mối quan hệ liên quan
#     # Nhân bản team
#     for team_member in task.teams:
#         new_team_member = models.team.TeamMember(
#             name=team_member.name,
#             title=team_member.title,
#             email=team_member.email,
#             user_id=team_member.user_id,
#             task_id=new_task.id  # Liên kết với task mới
#         )
#         db.add(new_team_member)

#     # Nhân bản các nhiệm vụ phụ
#     for sub_task in task.sub_tasks:
#         new_sub_task = models.subTask.SubTask(
#             title=sub_task.title,
#             date=sub_task.date,
#             tag=sub_task.tag,
#             task_id=new_task.id  # Liên kết với task mới
#         )
#         db.add(new_sub_task)

#     # Nhân bản các tài sản
#     for asset in task.assets:
#         new_asset = models.assets.Asset(
#             url=asset.url,
#             task_id=new_task.id  # Liên kết với task mới
#         )
#         db.add(new_asset)

#     # Lưu tất cả các thay đổi vào database
#     db.commit()

#     # Trả về nhiệm vụ mới cùng với tất cả các bảng liên kết đã được sao chép
#     return new_task
