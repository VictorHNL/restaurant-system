from fastapi import FastAPI

from app.routes.products import router as products_router


app = FastAPI()


@app.get("/")
def home():
    return {"message": "Product Service funcionando!"}


app.include_router(products_router)