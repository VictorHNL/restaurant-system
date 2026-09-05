from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    category: str = "Outros"
    description: str = ""
    name: str
    price: float = Field(ge=0, allow_inf_nan=False)
    available: bool


class ProductUpdate(BaseModel):
    category: str = "Outros"
    description: str = ""
    name: str
    price: float = Field(ge=0, allow_inf_nan=False)
    available: bool
