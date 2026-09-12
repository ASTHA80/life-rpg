from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from ..auth import decode_access_token
from ..database import get_db
from ..models import InventoryItem, User
from ..schemas import InventoryPurchase


router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"],
)

security = HTTPBearer()


SHOP_ITEMS = {
    "focus-potion": 50,
    "scholar-hat": 100,
    "golden-sword": 200,
    "star-badge": 300,
}


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


@router.get("")
def get_inventory(
    credentials: HTTPAuthorizationCredentials = Depends(
        security
    ),
    db: Session = Depends(get_db),
):
    user = get_user(credentials, db)

    items = (
        db.query(InventoryItem)
        .filter(
            InventoryItem.user_id == user.id
        )
        .all()
    )

    return {
        "gold": user.gold,
        "items": [
            {
                "id": item.id,
                "item_id": item.item_id,
                "purchased_at": item.purchased_at,
            }
            for item in items
        ],
    }


@router.post("/purchase")
def purchase_item(
    data: InventoryPurchase,
    credentials: HTTPAuthorizationCredentials = Depends(
        security
    ),
    db: Session = Depends(get_db),
):
    user = get_user(credentials, db)

    price = SHOP_ITEMS.get(data.item_id)

    if price is None:
        raise HTTPException(
            status_code=404,
            detail="Item not found.",
        )

    already_owned = (
        db.query(InventoryItem)
        .filter(
            InventoryItem.user_id == user.id,
            InventoryItem.item_id == data.item_id,
        )
        .first()
    )

    if already_owned:
        raise HTTPException(
            status_code=400,
            detail="You already own this item.",
        )

    if user.gold < price:
        raise HTTPException(
            status_code=400,
            detail="Not enough gold.",
        )

    user.gold -= price

    item = InventoryItem(
        user_id=user.id,
        item_id=data.item_id,
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return {
        "message": "Item purchased.",
        "gold": user.gold,
        "item_id": item.item_id,
    }