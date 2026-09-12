from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from ..auth import decode_access_token
from ..database import get_db
from ..models import User
from ..schemas import CharacterWorldUpdate, UserResponse


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

security = HTTPBearer()


def get_user(
    credentials: HTTPAuthorizationCredentials,
    db: Session,
):
    user_id = decode_access_token(
        credentials.credentials
    )

    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token.",
        )

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return user


@router.get(
    "/me",
    response_model=UserResponse,
)
def profile(
    credentials: HTTPAuthorizationCredentials = Depends(
        security
    ),
    db: Session = Depends(get_db),
):
    return get_user(credentials, db)


@router.patch(
    "/me",
    response_model=UserResponse,
)
def update_profile(
    data: CharacterWorldUpdate,
    credentials: HTTPAuthorizationCredentials = Depends(
        security
    ),
    db: Session = Depends(get_db),
):
    user = get_user(credentials, db)

    if data.character_id is not None:
        if data.character_id not in ["boy", "girl"]:
            raise HTTPException(
                status_code=400,
                detail="Invalid character.",
            )

        user.character_id = data.character_id

    if data.world_id is not None:
        allowed_worlds = [
            "riverside",
            "library",
            "mountain",
            "town",
        ]

        if data.world_id not in allowed_worlds:
            raise HTTPException(
                status_code=400,
                detail="Invalid world.",
            )

        user.world_id = data.world_id

    db.commit()
    db.refresh(user)

    return user