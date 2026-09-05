import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.data.orders import orders

client = TestClient(app)

@pytest.fixture(autouse=True)
def clean_orders():
    orders.clear()
    yield
    orders.clear()

@pytest.fixture
def products(mocker):
    return mocker.patch("app.services.order_service.get_product", side_effect=lambda id:
        {"id": id, "name": f"Produto {id}", "price": 12.35 if id == 1 else 5.10, "available": True})

def test_multiple_items_server_total(products):
    response = client.post("/orders", json={"items": [{"product_id": 1, "quantity": 2}, {"product_id": 2, "quantity": 3}], "total": 0})
    assert response.status_code == 201
    data = response.json()
    assert data["total"] == 40
    assert len(data["items"]) == 2
    assert data["status"] == "CRIADO"
    assert client.get(f"/orders/{data['id']}").json() == data

@pytest.mark.parametrize("items", [[], [{"product_id": 1, "quantity": 0}], [{"product_id": 0, "quantity": 1}], [{"product_id": 1, "quantity": 101}]])
def test_invalid_items(items):
    assert client.post("/orders", json={"items": items}).status_code == 422
    assert not orders

def test_no_partial_order(mocker):
    mocker.patch("app.services.order_service.get_product", side_effect=[
        {"id": 1, "name": "A", "price": 10, "available": True},
        {"id": 2, "name": "B", "price": 10, "available": False}])
    assert client.post("/orders", json={"items": [{"product_id": 1, "quantity": 1}, {"product_id": 2, "quantity": 1}]}).status_code == 409
    assert not orders

@pytest.mark.parametrize("failure, expected", [(None, 404), (RuntimeError("offline"), 503)])
def test_dependency_failure(mocker, failure, expected):
    mocker.patch("app.services.order_service.get_product", side_effect=failure if isinstance(failure, Exception) else None, return_value=None)
    assert client.post("/orders", json={"items": [{"product_id": 1, "quantity": 1}]}).status_code == expected

def test_ids_after_delete(products):
    payload = {"items": [{"product_id": 1, "quantity": 1}]}
    first = client.post("/orders", json=payload).json()
    second = client.post("/orders", json=payload).json()
    client.delete(f"/orders/{first['id']}")
    third = client.post("/orders", json=payload).json()
    assert third["id"] > second["id"]

def test_cors():
    r = client.options("/orders", headers={"Origin": "http://localhost:5173", "Access-Control-Request-Method": "POST", "Access-Control-Request-Headers": "content-type"})
    assert r.status_code == 200
    assert r.headers["access-control-allow-origin"] == "http://localhost:5173"
    r = client.options("/orders", headers={"Origin": "https://unknown.example", "Access-Control-Request-Method": "POST"})
    assert "access-control-allow-origin" not in r.headers

def test_empty_history_and_missing():
    assert client.get("/orders").json() == []
    assert client.get("/orders/999").status_code == 404

def test_update(products):
    data = client.post("/orders", json={"items": [{"product_id": 1, "quantity": 1}]}).json()
    r = client.put(f"/orders/{data['id']}", json={"items": [{"product_id": 2, "quantity": 2}]})
    assert r.json()["total"] == 10.2

def test_health():
    assert client.get("/health").json()["status"] == "healthy"
