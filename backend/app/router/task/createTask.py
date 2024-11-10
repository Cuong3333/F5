from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...models.task import Task  # Model Task từ models của bạn
from ...models.user import User  # Model User từ models của bạn
from ...schema.task import TaskCreate  # Schema Pydantic để validate dữ liệu đầu vào
from ...utilities.oauth2 import get_curent_user  # Hàm để lấy user hiện tại
from ...conn import get_db  # Hàm để lấy kết nối DB

router = APIRouter(
    tags=["Task"]
)

@router.post("/create_tasks/", status_code=status.HTTP_201_CREATED)
def create_task(
    task_create: TaskCreate,  # Schema xác thực dữ liệu đầu vào
    db: Session = Depends(get_db),  # Kết nối cơ sở dữ liệu
    current_user: User = Depends(get_curent_user)  # Lấy user hiện tại từ token
):
    try:
        # Tạo task mới từ dữ liệu đầu vào
        new_task = Task(
            title=task_create.title,  # Tiêu đề của task
            stage=task_create.stage,  # Giai đoạn của task (Enum)
            priority=task_create.priority,  # Độ ưu tiên của task (Enum)
            user_id=current_user.id  # Gán task cho user hiện tại
        )

        # Thêm task vào phiên làm việc của SQLAlchemy
        db.add(new_task)
        # Commit để lưu task vào database
        db.commit()
        # Refresh để lấy lại đối tượng task với ID mới được tạo từ DB
        db.refresh(new_task)

        # Trả về thông tin chi tiết của task vừa tạo
        return {
            "id": new_task.id,
            "title": new_task.title,
            "date": new_task.date,
            "priority": new_task.priority,
            "stage": new_task.stage,
            "user_id": new_task.user_id,
            "message": "Task created successfully!"  # Thêm thông báo ở đây
        }

    except Exception as e:
        # Rollback nếu có lỗi xảy ra
        db.rollback()
        # Trả về thông báo lỗi HTTP 500 cùng với chi tiết lỗi
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
