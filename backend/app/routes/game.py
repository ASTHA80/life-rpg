from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from ..auth import decode_access_token
from ..database import get_db
from ..models import User


router = APIRouter(
    prefix="/game",
    tags=["Game"],
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


def xp_required_for_level(level: int) -> int:
    return int(100 * (level ** 1.5))


def calculate_level(xp: int) -> int:
    level = 1
    remaining_xp = xp

    while remaining_xp >= xp_required_for_level(level):
        remaining_xp -= xp_required_for_level(level)
        level += 1

    return level


@router.get("/stats")
def get_game_stats(
    credentials: HTTPAuthorizationCredentials = Depends(
        security
    ),
    db: Session = Depends(get_db),
):
    user = get_user(credentials, db)

    return {
        "xp": user.xp,
        "level": user.level,
        "gold": user.gold,
        "streak": user.streak,
        "attributes": {
            "intellect": user.intellect,
            "discipline": user.discipline,
            "creativity": user.creativity,
            "strength": user.strength,
        },
    }


@router.post("/reward")
def reward_player(
    xp: int = 0,
    gold: int = 0,
    category: str = "intellect",
    credentials: HTTPAuthorizationCredentials = Depends(
        security
    ),
    db: Session = Depends(get_db),
):
    user = get_user(credentials, db)

    if xp < 0 or gold < 0:
        raise HTTPException(
            status_code=400,
            detail="Rewards cannot be negative.",
        )

    user.xp += xp
    user.gold += gold

    user.level = calculate_level(user.xp)

    valid_categories = {
        "intellect",
        "discipline",
        "creativity",
        "strength",
    }

    if category in valid_categories:
        current = getattr(user, category)
        setattr(user, category, current + 1)

    db.commit()
    db.refresh(user)

    return {
        "xp": user.xp,
        "level": user.level,
        "gold": user.gold,
        "streak": user.streak,
        "attributes": {
            "intellect": user.intellect,
            "discipline": user.discipline,
            "creativity": user.creativity,
            "strength": user.strength,
        },
    }