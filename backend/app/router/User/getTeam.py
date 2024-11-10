from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...models.team import TeamMember
from ...models.user import User
from ...schema.teamOut import TeamMemberOut  # Định nghĩa schema để trả về dữ liệu
from ...utilities.oauth2 import get_curent_user  # Dependency đã tạo trước đó
from ...conn import get_db

router = APIRouter(tags=["Team"])

@router.get("/my_team", response_model=List[TeamMemberOut])
def get_my_team(current_user: User = Depends(get_curent_user), db: Session = Depends(get_db)):
    try:
        # Lấy tất cả thành viên trong nhóm của người dùng hiện tại
        team_members = db.query(TeamMember).filter(TeamMember.user_id == current_user.id).all()

        if not team_members:
            raise HTTPException(
                status_code=404,
                detail="No team members found for this user"
            )
        
        team_member_out_list = []
        for member in team_members:
            # Chỉ cần lấy `is_activate` từ người dùng
            team_member_out_list.append({
                "name": member.name,
                "title": member.title,
                "email": member.email,
                "is_activate": current_user.is_activate  # Trả về `is_activate` của người dùng
            })

        return team_member_out_list
    
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.delete("/team/{team_member_id}", response_model=dict)
def delete_team_member(team_member_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        # Lấy thành viên nhóm dựa trên team_member_id
        team_member = db.query(TeamMember).filter(TeamMember.id == team_member_id).first()

        # Kiểm tra xem thành viên nhóm có tồn tại không
        if not team_member:
            raise HTTPException(
                status_code=404,
                detail="Team member not found"
            )

        # Kiểm tra quyền sở hữu: chỉ có thể xóa thành viên thuộc nhóm của người dùng hiện tại
        if team_member.user_id != current_user.id:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to delete this team member"
            )

        # Xóa thành viên khỏi cơ sở dữ liệu
        db.delete(team_member)
        db.commit()

        return {"detail": "Team member deleted successfully"}
    
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"An error occurred: {str(e)}"
        )