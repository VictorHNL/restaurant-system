from pydantic import BaseModel, Field

class OrderItemCreate(BaseModel):
    product_id: int = Field(gt=0)
    quantity: int = Field(gt=0, le=100)

class OrderCreate(BaseModel):
    items: list[OrderItemCreate] = Field(min_length=1, max_length=100)

class OrderItemResponse(BaseModel):
    product_id: int
    name: str
    quantity: int
    unit_price: float
    subtotal: float

class OrderResponse(BaseModel):
    id: int
    items: list[OrderItemResponse]
    total: float
    status: str
    created_at: str
