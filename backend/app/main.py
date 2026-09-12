from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine

from .routes import (
    auth,
    game,
    inventory,
    tasks,
    users,
)


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Life RPG API",
    description="Backend API for Life RPG productivity game.",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tasks.router)
app.include_router(game.router)
app.include_router(inventory.router)


@app.get("/")
def root():
    return {
        "message": "Life RPG API is running!",
        "status": "ok",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }