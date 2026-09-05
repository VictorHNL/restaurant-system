from app.services.order_service import _resolve_items
from app.schemas.order_schema import OrderItemCreate
from fastapi import HTTPException
import pytest

def test_duplicate_items_merged(mocker):
    mocker.patch("app.services.order_service.get_product",
        return_value={"name": "A", "price": 0.1, "available": True})
    result = _resolve_items([OrderItemCreate(product_id=1, quantity=1), OrderItemCreate(product_id=1, quantity=2)])
    assert len(result) == 1
    assert result[0]["quantity"] == 3
    assert result[0]["subtotal"] == 0.3

def test_merged_quantity_limit():
    with pytest.raises(HTTPException) as error:
        _resolve_items([OrderItemCreate(product_id=1, quantity=60), OrderItemCreate(product_id=1, quantity=60)])
    assert error.value.status_code == 422
