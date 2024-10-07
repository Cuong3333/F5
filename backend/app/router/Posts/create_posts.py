from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...conn import get_db  # Điều chỉnh import dựa trên cấu trúc của bạn
from ...models.posts import Post  # Điều chỉnh import dựa trên cấu trúc của bạn
from ...schema.crePosts import PostCreate  # Điều chỉnh import dựa trên cấu trúc của bạn
from ...utilities.oauth2 import get_curent_user

router = APIRouter(
    tags=['Create_Posts']
)

@router.post("/posts/", response_model=PostCreate)
async def create_post(post: PostCreate, db: Session = Depends(get_db), current_user: str = Depends(get_curent_user)):
    try:
        db_post = Post(owner_id=current_user.id, title=post.title, content=post.content)
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post
    except Exception as e:
        raise HTTPException(status_code=500, detail="Có lỗi xảy ra khi tạo bài viết.")