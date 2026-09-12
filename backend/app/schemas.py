from typing import Optional

from pydantic import BaseModel, EmailStr


class UserSignup(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserResponse(BaseModel):
    id: int
    email: str
    character_id: str
    world_id: str
    xp: int
    level: int
    gold: int
    streak: int
    intellect: int
    discipline: int
    creativity: int
    strength: int

    class Config:
        from_attributes = True


class CharacterWorldUpdate(BaseModel):
    character_id: Optional[str] = None
    world_id: Optional[str] = None


class TaskCreate(BaseModel):
    title: str
    description: str = ""
    category: str = "intellect"
    duration: int = 25
    xp_reward: int = 50
    gold_reward: int = 20


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    duration: int
    xp_reward: int
    gold_reward: int
    completed: bool

    class Config:
        from_attributes = True


class InventoryPurchase(BaseModel):
    item_id: str