from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import logging

from app.routes.order_routes import router


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s"
)

logger = logging.getLogger("order-service")

app = FastAPI(title="Order Service")
app.add_middleware(CORSMiddleware, allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(","), allow_methods=["GET", "POST", "PUT", "DELETE"], allow_headers=["Content-Type"])

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
