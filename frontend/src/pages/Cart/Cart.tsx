import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useCart } from "../../contexts/CartContext";

import "./Cart.css";

function Cart() {
  const {
    items,
    totalItems,
    totalPrice,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  function formatPrice(price: number) {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <>
      <Header />

      <main className="cart-page">
        <section className="cart-container">

          <div className="cart-header">
            <span className="eyebrow">
              SEU PEDIDO
            </span>

            <h1>Seu carrinho</h1>

            <p>
              {totalItems === 0
                ? "Seu carrinho está vazio."
                : `${totalItems} ${
                    totalItems === 1 ? "item" : "itens"
                  } no seu pedido.`}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="empty-cart">

              <div className="empty-cart-icon">
                🛒
              </div>

              <h2>
                Seu carrinho está vazio
              </h2>

              <p>
                Escolha alguns pratos deliciosos
                para começar seu pedido.
              </p>

              <Link
                to="/cardapio"
                className="cart-button"
              >
                Ver cardápio
              </Link>

            </div>
          ) : (

            <div className="cart-content">

              <div className="cart-items">

                {items.map((item) => (
                  <article
                    className="cart-item"
                    key={item.product.id}
                  >

                    <img
                      src={item.product.image}
                      alt={item.product.name}
                    />

                    <div className="cart-item-info">

                      <h2>
                        {item.product.name}
                      </h2>

                      <p>
                        {item.product.description}
                      </p>

                      <span>
                        {formatPrice(
                          item.product.price
                        )}
                      </span>

                    </div>

                    <div className="cart-item-actions">

                      <div className="quantity">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.product.id
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            addToCart(item.product)
                          }
                        >
                          +
                        </button>

                      </div>

                      <button
                        className="remove-button"
                        onClick={() =>
                          removeFromCart(
                            item.product.id
                          )
                        }
                      >
                        Remover
                      </button>

                    </div>

                  </article>
                ))}

              </div>

              <aside className="cart-summary">

                <h2>
                  Resumo do pedido
                </h2>

                <div className="summary-row">
                  <span>Subtotal</span>

                  <span>
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="summary-row">
                  <span>Taxa de entrega</span>

                  <span>
                    R$ 0,00
                  </span>
                </div>

                <div className="summary-divider" />

                <div className="summary-total">
                  <span>Total</span>

                  <strong>
                    {formatPrice(totalPrice)}
                  </strong>
                </div>

                <button className="checkout-button">
                  Finalizar pedido
                </button>

                <Link
                  to="/cardapio"
                  className="continue-button"
                >
                  Continuar comprando
                </Link>

                <button
                  className="clear-button"
                  onClick={clearCart}
                >
                  Limpar carrinho
                </button>

              </aside>

            </div>

          )}

        </section>
      </main>
    </>
  );
}

export default Cart;