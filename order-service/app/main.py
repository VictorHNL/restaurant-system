from fastapi import FastAPI

from app.routes.order_routes import router


app = FastAPI(title="Order Service")


app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "Order Service is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "order-service"
    }