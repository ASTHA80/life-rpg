from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )

    password_hash = Column(
        String(255),
        nullable=False,
    )

    character_id = Column(
        String(50),
        default="boy",
        nullable=False,
    )

    world_id = Column(
        String(50),
        default="riverside",
        nullable=False,
    )

    xp = Column(
        Integer,
        default=0,
        nullable=False,
    )

    level = Column(
        Integer,
        default=1,
        nullable=False,
    )

    gold = Column(
        Integer,
        default=0,
        nullable=False,
    )

    streak = Column(
        Integer,
        default=0,
        nullable=False,
    )

    intellect = Column(
        Integer,
        default=1,
        nullable=False,
    )

    discipline = Column(
        Integer,
        default=1,
        nullable=False,
    )

    creativity = Column(
        Integer,
        default=1,
        nullable=False,
    )

    strength = Column(
        Integer,
        default=1,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )


class Task(Base):
    __tablename__ = "tasks"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    title = Column(
        String(255),
        nullable=False,
    )

    description = Column(
        Text,
        default="",
    )

    category = Column(
        String(50),
        default="intellect",
        nullable=False,
    )

    duration = Column(
        Integer,
        default=25,
        nullable=False,
    )

    xp_reward = Column(
        Integer,
        default=50,
        nullable=False,
    )

    gold_reward = Column(
        Integer,
        default=20,
        nullable=False,
    )

    completed = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    completed_at = Column(
        DateTime,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )


class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    item_id = Column(
        String(100),
        nullable=False,
    )

    purchased_at = Column(
        DateTime,
        default=datetime.utcnow,
    )