from fastapi import APIRouter

from app.schemas.order_schema import OrderCreate, OrderResponse
from app.services.order_service import (
    create_order,
    get_all_orders,
    get_order_by_id,
    update_order,
    delete_order
)


router = APIRouter()


@router.get("/orders")
def get_orders():
    return get_all_orders()


@router.get("/orders/{order_id}")
def get_order(order_id: int):
    return get_order_by_id(order_id)


@router.post("/orders", response_model=OrderResponse, status_code=201)
def post_order(order: OrderCreate):
    return create_order(
        order.items
    )


@router.put("/orders/{order_id}")
def put_order(order_id: int, order: OrderCreate):
    return update_order(
        order_id,
        order.items
    )


@router.delete("/orders/{order_id}")
def remove_order(order_id: int):
    return delete_order(order_id)
