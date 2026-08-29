from fastapi import APIRouter, HTTPException

from app.schemas import ProductCreate, ProductUpdate
from app.services import product_service


router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get("/")
def get_products():
    return product_service.get_all_products()


@router.get("/{product_id}")
def get_product(product_id: int):
    product = product_service.get_product_by_id(product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Produto não encontrado"
        )

    return product


@router.post("/")
def create_product(product: ProductCreate):
    return product_service.create_product(product)


@router.put("/{product_id}")
def update_product(product_id: int, product_data: ProductUpdate):
    product = product_service.update_product(
        product_id,
        product_data
    )

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Produto não encontrado"
        )

    return product


@router.delete("/{product_id}")
def delete_product(product_id: int):
    product = product_service.delete_product(product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Produto não encontrado"
        )

    return {
        "message": "Produto removido com sucesso"
    }