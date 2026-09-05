import { Link } from "react-router-dom";

import "./Home.css";
import { useProducts } from "../../hooks/useProducts";
import Header from "../../components/Header/Header";

import { useCart } from "../../contexts/cart";

import heroImage from "../../assets/hero.jpg";
import burgersImage from "../../assets/cat-burgers.jpg";
import pizzasImage from "../../assets/cat-pizzas.jpg";
import portionsImage from "../../assets/cat-porcoes.jpg";
import drinksImage from "../../assets/cat-bebidas.jpg";
import dessertsImage from "../../assets/cat-sobremesa.jpg";

const categories = [
  {
    name: "Hambúrgueres",
    description: "Blends artesanais grelhados na brasa",
    image: burgersImage,
  },
  {
    name: "Pizzas",
    description: "Massa de fermentação natural, forno a lenha",
    image: pizzasImage,
  },
  {
    name: "Porções",
    description: "Para dividir (ou não) à mesa",
    image: portionsImage,
  },
  {
    name: "Bebidas",
    description: "Drinks autorais, vinhos e clássicos",
    image: drinksImage,
  },
  {
    name: "Sobremesas",
    description: "O final feliz da sua noite",
    image: dessertsImage,
  },
];

function Home() {
  const { products, loading, error } = useProducts();
  const featuredProducts = products.filter(p => p.available).slice(0, 3);
  const { addToCart } = useCart();

  return (
    <>
      <Header />

      <main>
        {/* HERO */}

        <section
          className="hero"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="hero-overlay" />

          <div className="hero-content">
            <span className="eyebrow">
              DESDE 1998 · CUISINE & GRILL
            </span>

            <h1>Le Maître</h1>

            <p>
              Hambúrgueres na brasa, pizzas de fermentação natural
              e drinks autorais.
              <br />
              Peça pelo site e acompanhe seu pedido do pagamento à mesa.
            </p>

            <div className="hero-buttons">
              <Link to="/cardapio" className="button primary">
                Ver cardápio
              </Link>

              <Link to="/login" className="button secondary">
                Entrar
              </Link>
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS */}

        <section className="features section-container">

          <div className="feature-card">
            <span className="feature-icon">♨</span>

            <h3>Cozinha autoral</h3>

            <p>
              Receitas assinadas pelo chef, com ingredientes
              selecionados diariamente.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">◷</span>

            <h3>Pronto em 30 min</h3>

            <p>
              Fluxo de cozinha otimizado para entregar seu
              pedido quente e no ponto.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">✣</span>

            <h3>Acompanhe em tempo real</h3>

            <p>
              Do pagamento à retirada, veja cada etapa do seu
              pedido pelo site.
            </p>
          </div>

        </section>

        {/* CATEGORIAS */}

        <section className="section-container categories-section">

          <div className="section-heading">
            <span className="eyebrow">
              CATEGORIAS POPULARES
            </span>

            <h2>Escolha por onde começar</h2>

            <p>
              Cinco categorias, uma cozinha só. Toque em qualquer
              uma para ir direto ao cardápio.
            </p>
          </div>

          <div className="categories-grid">

            {categories.map((category) => (
              <Link
                to="/cardapio"
                className="category-card"
                key={category.name}
              >
                <img
                  src={category.image}
                  alt={category.name}
                />

                <div className="category-overlay" />

                <div className="category-content">
                  <h3>{category.name}</h3>

                  <p>{category.description}</p>
                </div>
              </Link>
            ))}

          </div>

        </section>

        {/* PRODUTOS */}

        <section className="section-container products-section">

          <div className="section-heading">
            <span className="eyebrow">
              PRODUTOS EM DESTAQUE
            </span>

            <h2>Os favoritos da casa</h2>

            <p>
              Selecionados pela cozinha e pelos nossos clientes.
            </p>
          </div>

          {loading && <p role="status">Carregando destaques…</p>}
          {error && <p role="alert">{error}</p>}
          <div className="products-grid">

            {featuredProducts.map((product) => (
              <article
                className="product-card"
                key={product.id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="product-info">

                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

                  <div className="product-bottom">

                    <span>
                      {product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>

                    <button
                      onClick={() => addToCart(product)}
                    >
                      + &nbsp; Adicionar
                    </button>

                  </div>

                </div>

              </article>
            ))}

          </div>

        </section>

      </main>
    </>
  );
}

export default Home;
