from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...models.health_data import HealthData
from ...schema.data_health import HealthDataCreate  # Đảm bảo bạn đã import đúng schema
from ...utilities.oauth2 import get_curent_user
from ...conn import get_db
from ...models.user import User

router = APIRouter(
    tags=["HealthData"]
)

@router.post("/health_data/", status_code=status.HTTP_201_CREATED)
def create_health_data(
    health_data_create: HealthDataCreate,  # Sử dụng schema xác thực
    db: Session = Depends(get_db),
    current_user: User = Depends(get_curent_user)  # Lấy user hiện tại từ token
):
    try:
        # Tạo HealthData mới
        new_health_data = HealthData(
            user_id=current_user.id,  # Liên kết với người dùng hiện tại
            weight=health_data_create.weight,
            height=health_data_create.height,
            blood_pressure=health_data_create.blood_pressure,
            heart_rate=health_data_create.heart_rate,
            sleep_hours=health_data_create.sleep_hours,
            water_intake=health_data_create.water_intake,
            activity_level=health_data_create.activity_level,
            current_conditions=health_data_create.current_conditions,
            date=health_data_create.date or None,  # Nếu không có ngày thì sử dụng ngày hiện tại
        )
        
        # Lưu vào database
        db.add(new_health_data)
        db.commit()
        db.refresh(new_health_data)

        return {"id": new_health_data.id, "user_id": new_health_data.user_id, "date": new_health_data.date}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
