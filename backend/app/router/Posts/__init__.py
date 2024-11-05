from fastapi import APIRouter
from .create_posts import router as create_posts_router
from .getAllPosts import router as get_all_posts_router
from .getPostbyId import router as get_post_by_id_router
from .delete_posts import router as delete_post_router
from .getAllPostsOfUser import router as getpostofUser_post_router
from .Update_post import router as update


router = APIRouter()
router.include_router(create_posts_router)
router.include_router(get_all_posts_router)
router.include_router(get_post_by_id_router)
router.include_router(delete_post_router)
router.include_router(getpostofUser_post_router)
router.include_router(update)
