from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...conn import get_db  # Điều chỉnh import dựa trên cấu trúc của bạn
from ...models.posts import Post  # Điều chỉnh import dựa trên cấu trúc của bạn
from ...schema.PostOut import PostOut
from ...utilities.oauth2 import get_curent_user

router = APIRouter(
    tags=['Get All Post Of User Login']
)

@router.get("/postsAll/", response_model=list[PostOut])
async def get_posts(current_user: str = Depends(get_curent_user), db: Session = Depends(get_db)):
    print(f"Current user ID: {current_user.id}")  # Thêm dòng này để kiểm tra user ID

    user_id = current_user.id  # Lấy user_id của người dùng hiện tại
    
    # Truy vấn để lấy tất cả các bài viết của user đã đăng nhập
    posts = db.query(Post).filter(Post.owner_id == user_id).all()

    return posts
