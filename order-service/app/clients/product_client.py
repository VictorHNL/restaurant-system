import httpx
import os


PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL", "http://localhost:8000")


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

    except (httpx.HTTPError, ValueError):
        raise RuntimeError("Product Service is unavailable")
