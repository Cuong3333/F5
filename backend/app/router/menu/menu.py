from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...models.menu import Menu  # Model Menu từ models của bạn
from ...models.user import User  # Model User từ models của bạn
from ...schema.menu import MenuCreate  # Schema Pydantic để validate dữ liệu đầu vào
from ...utilities.oauth2 import get_curent_user  # Hàm để lấy user hiện tại
from ...conn import get_db  # Hàm để lấy kết nối DB

router = APIRouter(
    tags=["Menu"]  # Đặt tên cho tag của nhóm endpoint này
)

# Endpoint để tạo kế hoạch ăn uống mới
@router.post("/create_menu/", status_code=status.HTTP_201_CREATED)
def create_menu(
    menu_create: MenuCreate,  # Schema xác thực dữ liệu đầu vào
    db: Session = Depends(get_db),  # Kết nối cơ sở dữ liệu
    current_user: User = Depends(get_curent_user)  # Lấy user hiện tại từ token
):
    try:
        # Tạo menu mới từ dữ liệu đầu vào
        new_menu = Menu(
            MenuName=menu_create.MenuName,  # Tên thực đơn
            MealType=menu_create.MealType,  # Loại bữa ăn (MORNING, LUNCH, DINNER, SNACK)
            ServingSize=menu_create.ServingSize,  # Khẩu phần ăn
            Calories=menu_create.Calories,  # Số calo
            user_id=current_user.id  # Gán menu cho user hiện tại
        )

        # Thêm menu vào phiên làm việc của SQLAlchemy
        db.add(new_menu)
        # Commit để lưu menu vào database
        db.commit()
        # Refresh để lấy lại đối tượng menu với ID mới được tạo từ DB
        db.refresh(new_menu)

        # Trả về thông tin chi tiết của menu vừa tạo
        return {
            "MealPlanId": new_menu.MealPlanId,
            "MenuName": new_menu.MenuName,
            "MealType": new_menu.MealType,
            "ServingSize": new_menu.ServingSize,
            "Calories": new_menu.Calories,
            "date": new_menu.date,
            "user_id": new_menu.user_id,
            "message": "Menu created successfully!"  # Thông báo thành công
        }

    except Exception as e:
        # Rollback nếu có lỗi xảy ra
        db.rollback()
        # Trả về thông báo lỗi HTTP 500 cùng với chi tiết lỗi
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))



# Endpoint để lấy tất cả thực đơn
@router.get("/get_menu", status_code=status.HTTP_200_OK)
def get_menus(
    db: Session = Depends(get_db),  # Kết nối cơ sở dữ liệu
    current_user: User = Depends(get_curent_user)  # Lấy user hiện tại từ token
):
    
    try:
        # Truy vấn tất cả thực đơn từ cơ sở dữ liệu
        menu = db.query(Menu).filter(Menu.user_id == current_user.id).all()

        # Kiểm tra nếu không có thực đơn nào
        if not menu:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No menus found")

        # Trả về danh sách thực đơn
        return {'menu': menu, 'message': 'get successfully'}
        
        
        # return current_user.id
    
    except Exception as e:
        # Rollback nếu có lỗi xảy ra
        db.rollback()
        # Trả về thông báo lỗi HTTP 500 cùng với chi tiết lỗi
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))