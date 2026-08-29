import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient

from app.main import app

from app.services.order_service import (
    get_all_orders,
    get_order_by_id,
    create_order
)


client = TestClient(app)


def test_get_all_orders():
    orders = get_all_orders()

    assert isinstance(orders, list)
    assert len(orders) > 0


def test_get_order_by_id():
    order = get_order_by_id(1)

    assert order["id"] == 1


def test_get_order_not_found():
    with pytest.raises(HTTPException) as exc:
        get_order_by_id(9999)

    assert exc.value.status_code == 404


def test_create_order(mocker):
    mocker.patch(
        "app.services.order_service.get_product",
        return_value={
            "id": 1,
            "name": "Hambúrguer",
            "price": 25.00
        }
    )

    order = create_order(1, 2)

    assert order["product_id"] == 1
    assert order["quantity"] == 2
    assert order["status"] == "pending"


def test_create_order_product_not_found(mocker):
    mocker.patch(
        "app.services.order_service.get_product",
        return_value=None
    )

    with pytest.raises(HTTPException) as exc:
        create_order(9999, 2)

    assert exc.value.status_code == 404


def test_create_order_product_service_unavailable(mocker):
    mocker.patch(
        "app.services.order_service.get_product",
        side_effect=RuntimeError("Product Service is unavailable")
    )

    with pytest.raises(HTTPException) as exc:
        create_order(1, 2)

    assert exc.value.status_code == 503

def test_create_order_when_product_service_unavailable(mocker):
    mocker.patch(
        "app.services.order_service.get_product",
        side_effect=RuntimeError("Product Service is unavailable")
    )

    response = client.post(
        "/orders",
        json={
            "product_id": 1,
            "quantity": 2
        }
    )

    assert response.status_code == 503
    assert response.json()["detail"] == "Product Service is unavailable"