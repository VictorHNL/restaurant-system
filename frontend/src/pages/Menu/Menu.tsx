import { useMemo, useState } from "react";

import Header from "../../components/Header/Header";
import { useCart } from "../../contexts/cart";

import "./Menu.css";
import { useProducts } from '../../hooks/useProducts';

const categories: string[] = [
  "Todos",
  "Hambúrgueres",
  "Pizzas",
  "Porções",
  "Bebidas",
  "Sobremesas",
];

function Menu() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] =
    useState<string>("Todos");

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
  }, [products, selectedCategory, search]);

  function formatPrice(price: number) {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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
              onChange={(event) =>
                setSearch(event.target.value)
              }
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
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                {category}
              </button>
            ))}

          </div>

        </section>

        <section className="menu-products">
          {loading && <p role="status">Carregando cardápio…</p>}
          {error && <p role="alert">{error}</p>}

          {!loading && !error && filteredProducts.length === 0 ? (
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
                        onClick={() =>
                          addToCart(product)
                        }
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
