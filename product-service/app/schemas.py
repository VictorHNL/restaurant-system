from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    price: float
    available: bool


class ProductUpdate(BaseModel):
    name: str
    price: float
    available: bool