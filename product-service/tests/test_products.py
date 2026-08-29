from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_get_products():
    response = client.get("/products/")

    assert response.status_code == 200

    data = response.json()

    assert len(data) >= 3


def test_create_product():
    response = client.post(
        "/products/",
        json={
            "name": "Pizza",
            "price": 35.0,
            "available": True
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["name"] == "Pizza"
    assert data["price"] == 35.0
    assert data["available"] is True


def test_create_product_invalid_price():
    response = client.post(
        "/products/",
        json={
            "name": "Pizza",
            "price": "banana",
            "available": True
        }
    )

    assert response.status_code == 422

def test_get_product_by_id():
    response = client.get("/products/1")

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == 1
    assert data["name"] == "Hambúrguer"

def test_get_product_not_found():
    response = client.get("/products/999")

    assert response.status_code == 404

    data = response.json()

    assert data["detail"] == "Produto não encontrado"

def test_update_product():
    response = client.put(
        "/products/1",
        json={
            "name": "Hambúrguer Artesanal",
            "price": 30.0,
            "available": True
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == 1
    assert data["name"] == "Hambúrguer Artesanal"
    assert data["price"] == 30.0
    assert data["available"] is True

def test_update_product_not_found():
    response = client.put(
        "/products/999",
        json={
            "name": "Pizza",
            "price": 35.0,
            "available": True
        }
    )

    assert response.status_code == 404

    data = response.json()

    assert data["detail"] == "Produto não encontrado"

def test_delete_product():
    response = client.delete("/products/2")

    assert response.status_code == 200

    data = response.json()

    assert data["message"] == "Produto removido com sucesso"

def test_delete_product_not_found():
    response = client.delete("/products/999")

    assert response.status_code == 404

    data = response.json()

    assert data["detail"] == "Produto não encontrado"