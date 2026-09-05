from datetime import datetime, timezone
from decimal import Decimal
from itertools import count
from threading import Lock
from fastapi import HTTPException
from app.data.orders import orders
from app.clients.product_client import get_product

_ids = count(1)
_lock = Lock()

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

def create_order(items):
    resolved = _resolve_items(items)
    with _lock:
        order = dict(id=next(_ids), items=resolved,
            total=float(sum(Decimal(str(item["subtotal"])) for item in resolved)),
            status="CRIADO", created_at=datetime.now(timezone.utc).isoformat())
        orders.append(order)
    return order

def get_all_orders():
    return list(reversed(orders))

def get_order_by_id(order_id):
    for order in orders:
        if order["id"] == order_id:
            return order
    raise HTTPException(404, "Order not found")

def update_order(order_id, items):
    get_order_by_id(order_id)
    resolved = _resolve_items(items)
    with _lock:
        order = get_order_by_id(order_id)
        if order["status"] != "CRIADO":
            raise HTTPException(409, "Este pedido não pode ser alterado")
        order.update(items=resolved,
            total=float(sum(Decimal(str(item["subtotal"])) for item in resolved)))
    return order

def delete_order(order_id):
    with _lock:
        order = get_order_by_id(order_id)
        orders.remove(order)
    return {"message": "Order deleted successfully"}
