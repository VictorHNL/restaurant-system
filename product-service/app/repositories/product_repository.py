products = [
    {
        "id": 1,
        "name": "Hambúrguer",
        "price": 25.0,
        "available": True
    },
    {
        "id": 2,
        "name": "Batata Frita",
        "price": 12.0,
        "available": True
    },
    {
        "id": 3,
        "name": "Refrigerante",
        "price": 7.0,
        "available": False
    }
]


def get_all():
    return products


def get_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product

    return None


def create(product_data):
    new_product = {
        "id": len(products) + 1,
        "name": product_data.name,
        "price": product_data.price,
        "available": product_data.available
    }

    products.append(new_product)

    return new_product


def update(product_id: int, product_data):
    product = get_by_id(product_id)

    if product is None:
        return None

    product["name"] = product_data.name
    product["price"] = product_data.price
    product["available"] = product_data.available

    return product


def delete(product_id: int):
    product = get_by_id(product_id)

    if product is None:
        return None

    products.remove(product)

    return product