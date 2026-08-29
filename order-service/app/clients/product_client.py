import httpx


PRODUCT_SERVICE_URL = "http://product-service:8000"


def get_product(product_id: int):
    try:
        response = httpx.get(
            f"{PRODUCT_SERVICE_URL}/products/{product_id}",
            timeout=3.0
        )

        if response.status_code == 404:
            return None

        response.raise_for_status()

        return response.json()

    except httpx.RequestError:
        raise RuntimeError("Product Service is unavailable")