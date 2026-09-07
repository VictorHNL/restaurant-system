from fastapi import APIRouter, Header, HTTPException
import base64, hashlib, hmac, json, os

from app.schemas.order_schema import OrderCreate, OrderResponse
from app.services.order_service import (
    create_order,
    get_all_orders,
    get_order_by_id,
    update_order,
    delete_order
)
from app.services.order_service import update_payment_status
from app.services.order_service import advance_status


router = APIRouter()
SECRET = os.getenv("JWT_SECRET", "development-secret-change-in-production").encode()
def current_user(authorization: str | None):
    if not authorization or not authorization.startswith("Bearer "): raise HTTPException(401, "Faça login para continuar")
    try:
        payload, signature = authorization[7:].split(".", 1)
        if not hmac.compare_digest(hmac.new(SECRET,payload.encode(),hashlib.sha256).hexdigest(), signature): raise ValueError()
        data=json.loads(base64.urlsafe_b64decode(payload + "=" * (-len(payload)%4)))
        return int(data["sub"])
    except Exception: raise HTTPException(401, "Token inválido ou expirado")


@router.get("/orders")
def get_orders(authorization: str | None = Header(default=None)):
    user_id=current_user(authorization)
    return [order for order in get_all_orders() if order["user_id"] == user_id]


@router.get("/orders/{order_id}")
def get_order(order_id: int, authorization: str | None = Header(default=None)):
    order=get_order_by_id(order_id)
    if order["user_id"] != current_user(authorization): raise HTTPException(404, "Order not found")
    return order


@router.post("/orders", response_model=OrderResponse, status_code=201)
def post_order(order: OrderCreate, authorization: str | None = Header(default=None)):
    return create_order(
        order.items, current_user(authorization)
    )


@router.put("/orders/{order_id}")
def put_order(order_id: int, order: OrderCreate, authorization: str | None = Header(default=None)):
    if get_order_by_id(order_id)["user_id"] != current_user(authorization): raise HTTPException(404, "Order not found")
    return update_order(
        order_id,
        order.items
    )


@router.delete("/orders/{order_id}")
def remove_order(order_id: int, authorization: str | None = Header(default=None)):
    if get_order_by_id(order_id)["user_id"] != current_user(authorization): raise HTTPException(404, "Order not found")
    return delete_order(order_id)

@router.post("/orders/{order_id}/payment-result")
def payment_result(order_id: int, result: str, authorization: str | None = Header(default=None)):
    current_user(authorization)
    return update_payment_status(order_id, result.upper())

@router.patch("/orders/{order_id}/status/{status}")
def change_status(order_id: int, status: str, authorization: str | None = Header(default=None)):
    if get_order_by_id(order_id)["user_id"] != current_user(authorization): raise HTTPException(404, "Order not found")
    return advance_status(order_id, status.upper())
