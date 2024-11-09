from sqlalchemy import event
from datetime import datetime
from .user import User

# Lắng nghe sự kiện trước khi cập nhật bản ghi
@event.listens_for(User, 'before_update')
def receive_before_update(mapper, connection, target):
    target.updated_at = datetime.utcnow()
