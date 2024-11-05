from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...conn import get_db  # Điều chỉnh import dựa trên cấu trúc của bạn
from ...models.posts import Post  # Điều chỉnh import dựa trên cấu trúc của bạn
from ...schema.PostOut import PostOut  # Điều chỉnh import dựa trên cấu trúc của bạn
from ...utilities.oauth2 import get_curent_user

router = APIRouter(
     tags=['Get Post By ID']
)

@router.get("/posts/{post_id}", response_model=PostOut)
async def get_post(post_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_curent_user)):
    post = db.query(Post).filter(Post.id == post_id).first()  # Lấy bài viết theo ID
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")  # Kiểm tra xem bài viết có tồn tại không
    return post
