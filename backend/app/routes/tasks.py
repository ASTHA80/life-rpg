from datetime import datetime, date

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from ..auth import decode_access_token
from ..database import get_db
from ..models import Task, User
from ..schemas import TaskCreate, TaskResponse

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)

security = HTTPBearer()


def get_user(
    credentials: HTTPAuthorizationCredentials,
    db: Session,
):
    user_id = decode_access_token(credentials.credentials)

    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token.",
        )

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return user


@router.get("", response_model=list[TaskResponse])
def get_tasks(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    user = get_user(credentials, db)

    return (
        db.query(Task)
        .filter(Task.user_id == user.id)
        .order_by(Task.id.asc())
        .all()
    )


@router.post("", response_model=TaskResponse)
def create_task(
    data: TaskCreate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    user = get_user(credentials, db)

    if not data.title.strip():
        raise HTTPException(
            status_code=400,
            detail="Task title cannot be empty.",
        )

    if data.duration < 1:
        raise HTTPException(
            status_code=400,
            detail="Duration must be at least 1 minute.",
        )

    task = Task(
        user_id=user.id,
        title=data.title.strip(),
        description=data.description,
        category=data.category,
        duration=data.duration,
        xp_reward=data.xp_reward,
        gold_reward=data.gold_reward,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    user = get_user(credentials, db)

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.user_id == user.id,
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found.",
        )

    db.delete(task)
    db.commit()

    return {
        "message": "Task deleted."
    }


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    data: TaskCreate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    user = get_user(credentials, db)

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.user_id == user.id,
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found.",
        )

    if not data.title.strip():
        raise HTTPException(
            status_code=400,
            detail="Task title cannot be empty.",
        )

    task.title = data.title.strip()
    task.description = data.description
    task.category = data.category
    task.duration = data.duration
    task.xp_reward = data.xp_reward
    task.gold_reward = data.gold_reward

    db.commit()
    db.refresh(task)

    return task


@router.post("/{task_id}/complete")
def complete_task(
    task_id: int,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    user = get_user(credentials, db)

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.user_id == user.id,
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found.",
        )

    # Prevent duplicate rewards.
    if task.completed:
        return {
            "message": "Task already completed.",
            "task_id": task.id,
            "xp_earned": 0,
            "gold_earned": 0,
            "streak": user.streak,
            "level": user.level,
            "total_xp": user.xp,
            "total_gold": user.gold,
        }

    # Complete task.
    task.completed = True
    task.completed_at = datetime.utcnow()

    # Give rewards.
    user.xp += task.xp_reward
    user.gold += task.gold_reward

    # Increase the relevant attribute.
    valid_categories = {
        "intellect",
        "discipline",
        "creativity",
        "strength",
    }

    if task.category in valid_categories:
        current_value = getattr(user, task.category)
        setattr(
            user,
            task.category,
            current_value + 1,
        )

    # Simple daily streak system.
    today = date.today()

    previous_completed = (
        db.query(Task)
        .filter(
            Task.user_id == user.id,
            Task.completed == True,
            Task.id != task.id,
            Task.completed_at != None,
        )
        .order_by(Task.completed_at.desc())
        .first()
    )

    if previous_completed and previous_completed.completed_at:
        previous_date = previous_completed.completed_at.date()

        if previous_date == today:
            # Already studied today.
            user.streak = max(user.streak, 1)

        elif (today - previous_date).days == 1:
            # Continued yesterday's streak.
            user.streak += 1

        else:
            # Streak broken.
            user.streak = 1

    else:
        # First completed quest.
        user.streak = 1

    # Calculate level.
    level = 1
    remaining_xp = user.xp

    while remaining_xp >= int(100 * (level ** 1.5)):
        remaining_xp -= int(100 * (level ** 1.5))
        level += 1

    user.level = level

    db.commit()
    db.refresh(task)
    db.refresh(user)

    return {
        "message": "Quest completed!",
        "task_id": task.id,
        "xp_earned": task.xp_reward,
        "gold_earned": task.gold_reward,
        "streak": user.streak,
        "level": user.level,
        "total_xp": user.xp,
        "total_gold": user.gold,
        "attributes": {
            "intellect": user.intellect,
            "discipline": user.discipline,
            "creativity": user.creativity,
            "strength": user.strength,
        },
    }