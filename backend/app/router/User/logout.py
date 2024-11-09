from fastapi import APIRouter, Response, HTTPException, status
from fastapi.responses import JSONResponse

router = APIRouter(
    tags=["Logout"]
)

@router.post("/logout")
async def logout_user(response: Response):
    try:
        # Xóa token bằng cách đặt cookie "token" với giá trị rỗng và thời gian hết hạn là ngay lập tức.
        response.delete_cookie("token")  # Xóa cookie "token"
        
        # Trả về phản hồi với thông báo logout thành công
        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Logout successful"})
    
    except Exception as error:
        # Nếu có lỗi, trả về thông báo lỗi
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error))
