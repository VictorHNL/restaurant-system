from fastapi import HTTPException

from app.data.orders import orders
from app.clients.product_client import get_product
import logging


logger = logging.getLogger("order-service")


def create_order(product_id: int, quantity: int):
    logger.info(
        "Creating order - product_id=%s quantity=%s",
        product_id,
        quantity
    )
    try:
        product = get_product(product_id)
    except RuntimeError:
        logger.error(
            "Product Service unavailable - product_id=%s",
            product_id
        )

        raise HTTPException(
            status_code=503,
            detail="Product Service is unavailable"
        )

    if product is None:
        logger.warning(
            "Product not found - product_id=%s",
            product_id
        )
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    new_order = {
        "id": len(orders) + 1,
        "product_id": product_id,
        "quantity": quantity,
        "status": "pending"
    }

    orders.append(new_order)

    return new_order


def get_all_orders():
    return orders


def get_order_by_id(order_id: int):
    for order in orders:
        if order["id"] == order_id:
            return order

    raise HTTPException(
        status_code=404,
        detail="Order not found"
    )


def update_order(order_id: int, product_id: int, quantity: int):
    try:
        product = get_product(product_id)
    except RuntimeError:
        raise HTTPException(
            status_code=503,
            detail="Product Service is unavailable"
        )

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    for order in orders:
        if order["id"] == order_id:
            order["product_id"] = product_id
            order["quantity"] = quantity

            return order

    raise HTTPException(
        status_code=404,
        detail="Order not found"
    )

def delete_order(order_id: int):
    for order in orders:
        if order["id"] == order_id:
            orders.remove(order)

            return {
                "message": "Order deleted successfully"
            }

    raise HTTPException(
        status_code=404,
        detail="Order not found"
    )