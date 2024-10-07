from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from ...conn import get_db  # Giả sử bạn có hàm này để lấy phiên làm việc với DB
from ...models.posts import Post  # Mô hình bài viết của bạn
from ...utilities.oauth2 import get_curent_user

router = APIRouter(
    tags=['Delete Post']
)

@router.delete("/posts/{post_id}", response_model=dict)
def delete_post(post_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_curent_user)):
    # Tìm bài viết theo post_id
    post = db.query(Post).filter(Post.id == post_id).first()
    
    # Kiểm tra xem bài viết có tồn tại không
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Kiểm tra quyền sở hữu bài viết
    if post.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform this action")
    
    # Xóa bài viết và xác nhận thay đổi
    db.delete(post)
    db.commit()
    
    return {"detail": "Post deleted successfully"}
