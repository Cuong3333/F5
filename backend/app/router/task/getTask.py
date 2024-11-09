from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session, joinedload  # Thêm joinedload từ sqlalchemy.orm
from ...utilities.oauth2 import get_curent_user  # Hàm xác thực người dùng hiện tại
from ...conn import get_db  # Hàm kết nối database
from ...models.task import Task
from ...models.user import User

router = APIRouter(
    tags=["get all task"]
)
 
@router.get("/tasks")
async def get_user_tasks(
    current_user: User = Depends(get_curent_user),  # Xác thực người dùng hiện tại
    db: Session = Depends(get_db)  # Kết nối cơ sở dữ liệu
):
    try:
        # Tạo câu truy vấn để lọc các nhiệm vụ theo người dùng hiện tại mà không có is_trashed và stage
        query = db.query(Task).filter(Task.user_id == current_user.id)
        
        # Truy vấn các nhiệm vụ và lấy kèm theo các bảng liên quan (sub_tasks, teams, assets)
        tasks = query.options(
            # Load các bảng liên quan
            joinedload(Task.sub_tasks),
            joinedload(Task.teams),
            joinedload(Task.assets),
            joinedload(Task.activities),
        ).all()

        # Nếu không có nhiệm vụ nào, trả về thông báo lỗi
        if not tasks:
            raise HTTPException(status_code=404, detail="No tasks found for this user")

        return {
            "status": True,
            "tasks": tasks
        }

    except Exception as e:
        # Xử lý lỗi và trả về thông báo lỗi
        return {"status": False, "message": str(e)}
