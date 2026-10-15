from datetime import datetime, timezone
from decimal import Decimal
from fastapi import HTTPException
from app.clients.product_client import get_product
from app.events import publish
from app.repositories import order_repository

def _resolve_items(items):
    quantities = {}
    for item in items:
        quantities[item.product_id] = quantities.get(item.product_id, 0) + item.quantity
    resolved = []
    for product_id, quantity in quantities.items():
        if quantity > 100:
            raise HTTPException(422, "Quantidade máxima por produto: 100")
        try:
            product = get_product(product_id)
        except RuntimeError:
            raise HTTPException(503, "Product Service is unavailable")
        if product is None:
            raise HTTPException(404, "Product not found")
        if not product.get("available", False):
            raise HTTPException(409, f"{product['name']} está indisponível")
        price = Decimal(str(product["price"])).quantize(Decimal("0.01"))
        resolved.append(dict(product_id=product_id, name=product["name"],
            quantity=quantity, unit_price=float(price), subtotal=float(price * quantity)))
    return resolved

def create_order(items, user_id: int):
    resolved = _resolve_items(items)
    order = order_repository.create(resolved,
        float(sum(Decimal(str(item["subtotal"])) for item in resolved)),
        "PAGAMENTO_PENDENTE", user_id, datetime.now(timezone.utc))
    publish("order.created", order)
    return order

def get_all_orders():
    return order_repository.get_all()

def update_payment_status(order_id: int, payment_status: str):
    order = get_order_by_id(order_id)
    if payment_status == "APPROVED":
        order["status"] = "EM_PREPARACAO"
    elif payment_status == "DECLINED":
        order["status"] = "CANCELADO"
    else:
        order["status"] = "PAGAMENTO_PENDENTE"
    order = order_repository.update_status(order_id, order["status"])
    publish("order.status.updated", {"order_id": order_id, "status": order["status"]})
    return order

def advance_status(order_id: int, status: str):
    allowed = {
        "EM_PREPARACAO": {"PRONTO", "CANCELADO"},
        "PRONTO": {"FINALIZADO"},
        "PAGAMENTO_PENDENTE": {"CANCELADO"},
    }
    order = get_order_by_id(order_id)
    if status not in allowed.get(order["status"], set()):
        raise HTTPException(409, "Transição de status não permitida")
    order = order_repository.update_status(order_id, status)
    publish("order.status.updated", {"order_id": order_id, "status": status})
    return order

def get_order_by_id(order_id):
    order = order_repository.get_by_id(order_id)
    if order is None:
        raise HTTPException(404, "Order not found")
    return order

def update_order(order_id, items):
    get_order_by_id(order_id)
    resolved = _resolve_items(items)
    if get_order_by_id(order_id)["status"] != "CRIADO":
        raise HTTPException(409, "Este pedido não pode ser alterado")
    order = order_repository.update_items(order_id, resolved,
        float(sum(Decimal(str(item["subtotal"])) for item in resolved)))
    if order is None:
        raise HTTPException(409, "Este pedido não pode ser alterado")
    return order

def delete_order(order_id):
    if order_repository.delete(order_id) is None:
        raise HTTPException(404, "Order not found")
    return {"message": "Order deleted successfully"}
