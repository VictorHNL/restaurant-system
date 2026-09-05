from itertools import count

_ids = count(12)

products = [
    {
        "id": 1,
        "name": "Le Maître Signature",
        "description": "Blend 200g, cheddar inglês maturado, cebola caramelizada e maionese de trufa.",
        "price": 54.9,
        "category": "Hambúrgueres",
        "available": True
    },
    {
        "id": 2,
        "name": "Double Brasa",
        "description": "Dois smash de 120g, queijo prato, picles e molho da casa.",
        "price": 48.5,
        "category": "Hambúrgueres",
        "available": True
    },
    {
        "id": 3,
        "name": "Cogumelo Nobre",
        "description": "Burger de blend suíno, cogumelo paris salteado e queijo gruyère.",
        "price": 51,
        "category": "Hambúrgueres",
        "available": False
    },
    {
        "id": 4,
        "name": "Margherita di Napoli",
        "description": "San Marzano, fior di latte, manjericão fresco e azeite extravirgem.",
        "price": 62,
        "category": "Pizzas",
        "available": True
    },
    {
        "id": 5,
        "name": "Quattro Formaggi",
        "description": "Mozzarella, gorgonzola, parmesão e provolone.",
        "price": 68,
        "category": "Pizzas",
        "available": True
    },
    {
        "id": 6,
        "name": "Pepperoni Picante",
        "description": "Pepperoni artesanal, mozzarella e pimenta calabresa.",
        "price": 65,
        "category": "Pizzas",
        "available": True
    },
    {
        "id": 7,
        "name": "Batata Rústica Trufada",
        "description": "Batatas rústicas, azeite de trufa e parmesão ralado na hora.",
        "price": 34,
        "category": "Porções",
        "available": True
    },
    {
        "id": 8,
        "name": "Bolinho de Costela",
        "description": "Bolinho crocante de costela acompanhado de molho da casa.",
        "price": 39,
        "category": "Porções",
        "available": True
    },
    {
        "id": 9,
        "name": "Negroni da Casa",
        "description": "Gin infusionado, vermute rosso e bitter, com casca de laranja.",
        "price": 32,
        "category": "Bebidas",
        "available": True
    },
    {
        "id": 10,
        "name": "Gin Tônica",
        "description": "Gin premium, água tônica e botânicos selecionados.",
        "price": 29,
        "category": "Bebidas",
        "available": True
    },
    {
        "id": 11,
        "name": "Petit Gâteau",
        "description": "Chocolate 70% com sorvete de baunilha de Madagascar.",
        "price": 29,
        "category": "Sobremesas",
        "available": True
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
        "id": next(_ids),
        "name": product_data.name,
        "price": product_data.price,
        "available": product_data.available,
        "category": product_data.category,
        "description": product_data.description
    }

    products.append(new_product)

    return new_product


def update(product_id: int, product_data):
    product = get_by_id(product_id)

    if product is None:
        return None

    product["category"] = product_data.category
    product["description"] = product_data.description
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
