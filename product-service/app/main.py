from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routes.products import router as products_router
from app.repositories.product_repository import init_db


app = FastAPI()
@app.on_event("startup")
def startup():
    init_db()

app.add_middleware(CORSMiddleware, allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5178,http://127.0.0.1:5178,http://localhost:5173,http://127.0.0.1:5173").split(","), allow_methods=["GET", "POST", "PUT", "DELETE"], allow_headers=["Content-Type"])


@app.get("/")
def home():
    return {"message": "Product Service funcionando!"}


app.include_router(products_router)
