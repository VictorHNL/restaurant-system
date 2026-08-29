from app.repositories import product_repository


def get_all_products():
    return product_repository.get_all()


def get_product_by_id(product_id: int):
    return product_repository.get_by_id(product_id)


def create_product(product_data):
    return product_repository.create(product_data)


def update_product(product_id: int, product_data):
    return product_repository.update(product_id, product_data)


def delete_product(product_id: int):
    return product_repository.delete(product_id)