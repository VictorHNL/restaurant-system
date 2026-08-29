import httpx


PRODUCT_SERVICE_URL = "http://localhost:8000"


def test_product_service_is_available():
    response = httpx.get(
        f"{PRODUCT_SERVICE_URL}/products/1",
        timeout=5.0
    )

    assert response.status_code == 200


def test_order_service_can_access_product():
    product_response = httpx.get(
        f"{PRODUCT_SERVICE_URL}/products/1",
        timeout=5.0
    )

    assert product_response.status_code == 200

    product = product_response.json()

    assert product["id"] == 1