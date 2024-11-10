# F5/backend/app/router/User/post.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...models.posts import Post, PostLike  # Adjusted path for models
from ...schema.crePosts import PostCreate  # Adjusted path for schemas
from ...schema.PostOut import PostOut  # Adjusted path for schemas
from ...conn import get_db
from ...router.User.auth import get_curent_user
from typing import List  

from ...models.user import User 
router = APIRouter()

@router.post("/posts", response_model=PostOut)
def create_post(post: PostCreate, db: Session = Depends(get_db), user: User = Depends(get_curent_user)):
    db_post = Post(title=post.title, content=post.content, image_url=post.image_url, owner_id=user.id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.get("/posts", response_model=List[PostOut])
def get_posts(db: Session = Depends(get_db), user: User = Depends(get_curent_user)):
    posts = db.query(Post).all()
    return [PostOut.from_orm(post) for post in posts]

@router.post("/posts/{post_id}/like")
def like_post(post_id: int, db: Session = Depends(get_db), user: User = Depends(get_curent_user)):
    post_like = db.query(PostLike).filter_by(post_id=post_id, user_id=user.id).first()
    if post_like:
        db.delete(post_like)
    else:
        post_like = PostLike(post_id=post_id, user_id=user.id)
        db.add(post_like)
    db.commit()
    return {"message": "Successfully liked/unliked the post"}
