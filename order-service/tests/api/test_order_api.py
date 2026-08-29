from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_get_orders():
    response = client.get("/orders")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_order():
    response = client.get("/orders/1")

    assert response.status_code == 200
    assert response.json()["id"] == 1


def test_get_order_not_found():
    response = client.get("/orders/9999")

    assert response.status_code == 404

def test_create_order_invalid_quantity():
    response = client.post(
        "/orders",
        json={
            "product_id": 1,
            "quantity": 0
        }
    )

    assert response.status_code == 422


def test_create_order_negative_quantity():
    response = client.post(
        "/orders",
        json={
            "product_id": 1,
            "quantity": -1
        }
    )

    assert response.status_code == 422


def test_create_order_invalid_product_id():
    response = client.post(
        "/orders",
        json={
            "product_id": 0,
            "quantity": 2
        }
    )

    assert response.status_code == 422

def test_health_check():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "healthy",
        "service": "order-service"
    }