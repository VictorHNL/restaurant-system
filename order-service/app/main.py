from fastapi import FastAPI
import logging

from app.routes.order_routes import router


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s"
)

logger = logging.getLogger("order-service")

app = FastAPI(title="Order Service")

app.include_router(router)


@app.get("/")
def root():
    logger.info("Order Service root endpoint accessed")

    return {
        "message": "Order Service is running"
    }


@app.get("/health")
def health_check():
    logger.info("Health check requested")

    return {
        "status": "healthy",
        "service": "order-service"
    }