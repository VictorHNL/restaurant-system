from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routes.products import router as products_router


app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(","), allow_methods=["GET", "POST", "PUT", "DELETE"], allow_headers=["Content-Type"])


@app.get("/")
def home():
    return {"message": "Product Service funcionando!"}


app.include_router(products_router)
