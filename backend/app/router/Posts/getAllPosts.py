from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...conn import get_db  # Điều chỉnh import dựa trên cấu trúc của bạn
from ...models.posts import Post  # Điều chỉnh import dựa trên cấu trúc của bạn
from ...schema.PostOut import PostOut
from ...utilities.oauth2 import get_curent_user

router = APIRouter(
    tags=['Get All Post']
)

@router.get("/posts/", response_model=list[PostOut])
async def get_posts(current_user: str = Depends(get_curent_user),db: Session = Depends(get_db)):
    posts = db.query(Post).all()  # Lấy tất cả các bài viết từ database
    return posts

