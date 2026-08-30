import { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import "./Menu.css";

import burgersImage from "../../assets/cat-burgers.jpg";
import pizzasImage from "../../assets/cat-pizzas.jpg";
import portionsImage from "../../assets/cat-porcoes.jpg";
import drinksImage from "../../assets/cat-bebidas.jpg";
import dessertsImage from "../../assets/cat-sobremesa.jpg";

type Category =
  | "Todos"
  | "Hambúrgueres"
  | "Pizzas"
  | "Porções"
  | "Bebidas"
  | "Sobremesas";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Exclude<Category, "Todos">;
  image: string;
  available: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Le Maître Signature",
    description:
      "Blend 200g, cheddar inglês maturado, cebola caramelizada e maionese de trufa.",
    price: 54.9,
    category: "Hambúrgueres",
    image: burgersImage,
    available: true,
  },
  {
    id: 2,
    name: "Double Brasa",
    description:
      "Dois smash de 120g, queijo prato, picles e molho da casa.",
    price: 48.5,
    category: "Hambúrgueres",
    image: burgersImage,
    available: true,
  },
  {
    id: 3,
    name: "Cogumelo Nobre",
    description:
      "Burger de blend suíno, cogumelo paris salteado e queijo gruyère.",
    price: 51,
    category: "Hambúrgueres",
    image: burgersImage,
    available: false,
  },
  {
    id: 4,
    name: "Margherita di Napoli",
    description:
      "San Marzano, fior di latte, manjericão fresco e azeite extravirgem.",
    price: 62,
    category: "Pizzas",
    image: pizzasImage,
    available: true,
  },
  {
    id: 5,
    name: "Quattro Formaggi",
    description:
      "Mozzarella, gorgonzola, parmesão e provolone.",
    price: 68,
    category: "Pizzas",
    image: pizzasImage,
    available: true,
  },
  {
    id: 6,
    name: "Pepperoni Picante",
    description:
      "Pepperoni artesanal, mozzarella e pimenta calabresa.",
    price: 65,
    category: "Pizzas",
    image: pizzasImage,
    available: true,
  },
  {
    id: 7,
    name: "Batata Rústica Trufada",
    description:
      "Batatas rústicas, azeite de trufa e parmesão ralado na hora.",
    price: 34,
    category: "Porções",
    image: portionsImage,
    available: true,
  },
  {
    id: 8,
    name: "Bolinho de Costela",
    description:
      "Bolinho crocante de costela acompanhado de molho da casa.",
    price: 39,
    category: "Porções",
    image: portionsImage,
    available: true,
  },
  {
    id: 9,
    name: "Negroni da Casa",
    description:
      "Gin infusionado, vermute rosso e bitter, com casca de laranja.",
    price: 32,
    category: "Bebidas",
    image: drinksImage,
    available: true,
  },
  {
    id: 10,
    name: "Gin Tônica",
    description:
      "Gin premium, água tônica e botânicos selecionados.",
    price: 29,
    category: "Bebidas",
    image: drinksImage,
    available: true,
  },
  {
    id: 11,
    name: "Petit Gâteau",
    description:
      "Chocolate 70% com sorvete de baunilha de Madagascar.",
    price: 29,
    category: "Sobremesas",
    image: dessertsImage,
    available: true,
  },
];

const categories: Category[] = [
  "Todos",
  "Hambúrgueres",
  "Pizzas",
  "Porções",
  "Bebidas",
  "Sobremesas",
];

function Menu() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("Todos");

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todos" ||
        product.category === selectedCategory;

      const searchText = search.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  function formatPrice(price: number) {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handleAddProduct(product: Product) {
    console.log("Produto adicionado:", product);
  }

  return (
    <>
      <Header />

      <main className="menu-page">

        <section className="menu-header">

          <span className="eyebrow">
            NOSSO CARDÁPIO
          </span>

          <h1>Tudo que sai da nossa cozinha</h1>

          <p>
            Busque pelo nome do prato ou filtre por categoria.
          </p>

          <div className="search-container">
            <input
              type="text"
              placeholder="⌕  Buscar no cardápio..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="category-filters">

            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}

          </div>

        </section>

        <section className="menu-products">

          {filteredProducts.length === 0 ? (
            <div className="empty-results">

              <h2>Nenhum produto encontrado</h2>

              <p>
                Tente buscar por outro nome ou categoria.
              </p>

            </div>
          ) : (
            <div className="menu-grid">

              {filteredProducts.map((product) => (
                <article
                  className={
                    product.available
                      ? "menu-product-card"
                      : "menu-product-card unavailable"
                  }
                  key={product.id}
                >

                  <div className="product-image-container">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    {!product.available && (
                      <div className="unavailable-overlay">
                        INDISPONÍVEL
                      </div>
                    )}

                  </div>

                  <div className="menu-product-info">

                    <div className="product-title-row">

                      <h2>{product.name}</h2>

                      <span className="product-category">
                        {product.category}
                      </span>

                    </div>

                    <p>
                      {product.description}
                    </p>

                    <div className="menu-product-bottom">

                      <span className="product-price">
                        {formatPrice(product.price)}
                      </span>

                      <button
                        disabled={!product.available}
                        onClick={() => handleAddProduct(product)}
                      >
                        + &nbsp; Adicionar
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </main>
    </>
  );
}

export default Menu;