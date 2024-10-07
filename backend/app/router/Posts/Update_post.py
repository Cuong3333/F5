from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ...conn import get_db  # Giả sử bạn có hàm này để lấy phiên làm việc với DB
from ...models.posts import Post  # Mô hình bài viết của bạn
from pydantic import BaseModel
from ...utilities.oauth2 import get_curent_user

router = APIRouter(
     tags=['update']
)

# Tạo schema để nhận dữ liệu cập nhật
class PostUpdate(BaseModel):
    title: str
    content: str

@router.put("/posts/{post_id}", response_model=dict)
def update_post(post_id: int, post_update: PostUpdate, db: Session = Depends(get_db), current_user: str = Depends(get_curent_user)):
    # Tìm bài viết theo post_id
    post = db.query(Post).filter(Post.id == post_id).first()
    
    # Kiểm tra xem bài viết có tồn tại không
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Kiểm tra quyền sở hữu bài viết
    if post.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this post")
    
    # Cập nhật các trường
    post.title = post_update.title
    post.content = post_update.content
    
    # Lưu thay đổi vào cơ sở dữ liệu
    db.commit()

    return {"detail": "Post updated successfully"}
