import {
  Clock3,
  CheckCircle2,
  ChefHat,
  PackageCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import "./Orders.css";

const orders = [
  {
    id: "#1024",
    date: "30 de agosto de 2026",
    status: "Em preparo",
    statusType: "preparing",
    total: "R$ 96,90",
    items: [
      {
        name: "Le Maître Signature",
        quantity: 1,
        price: "R$ 54,90",
      },
      {
        name: "Batata Rústica Trufada",
        quantity: 1,
        price: "R$ 34,00",
      },
      {
        name: "Refrigerante",
        quantity: 1,
        price: "R$ 8,00",
      },
    ],
  },
  {
    id: "#1018",
    date: "27 de agosto de 2026",
    status: "Entregue",
    statusType: "delivered",
    total: "R$ 62,00",
    items: [
      {
        name: "Margherita di Napoli",
        quantity: 1,
        price: "R$ 62,00",
      },
    ],
  },
];

function Orders() {
  return (
    <>
      <Header />

      <main className="orders-page">
        <div className="orders-container">

          {/* CABEÇALHO */}
          <div className="orders-heading">

            <span className="orders-eyebrow">
              HISTÓRICO
            </span>

            <h1>Meus pedidos</h1>

            <p>
              Acompanhe seus pedidos atuais e consulte
              seus pedidos anteriores.
            </p>

          </div>

          {/* PEDIDOS */}
          <section className="orders-list">

            {orders.map((order) => (

              <article
                className="order-card"
                key={order.id}
              >

                {/* HEADER DO PEDIDO */}
                <div className="order-header">

                  <div>

                    <span className="order-number">
                      Pedido {order.id}
                    </span>

                    <span className="order-date">
                      {order.date}
                    </span>

                  </div>

                  <span
                    className={`order-status ${order.statusType}`}
                  >

                    {order.statusType === "preparing" ? (
                      <Clock3 size={13} />
                    ) : (
                      <CheckCircle2 size={13} />
                    )}

                    {order.status}

                  </span>

                </div>

                {/* CONTEÚDO */}
                <div className="order-content">

                  <div className="order-items">

                    {order.items.map((item) => (

                      <div
                        className="order-item"
                        key={item.name}
                      >

                        <div className="item-quantity">
                          {item.quantity}x
                        </div>

                        <div className="item-info">
                          <span>
                            {item.name}
                          </span>
                        </div>

                        <span className="item-price">
                          {item.price}
                        </span>

                      </div>

                    ))}

                  </div>

                  {/* TOTAL */}
                  <div className="order-total">

                    <span>Total</span>

                    <strong>
                      {order.total}
                    </strong>

                  </div>

                </div>

                {/* PROGRESSO */}
                {order.statusType === "preparing" && (

                  <div className="order-progress">

                    <div className="progress-step completed">

                      <div className="progress-icon">
                        <CheckCircle2 size={14} />
                      </div>

                      <span>
                        Recebido
                      </span>

                    </div>

                    <div className="progress-line active" />

                    <div className="progress-step active">

                      <div className="progress-icon">
                        <ChefHat size={14} />
                      </div>

                      <span>
                        Em preparo
                      </span>

                    </div>

                    <div className="progress-line" />

                    <div className="progress-step">

                      <div className="progress-icon">
                        <PackageCheck size={14} />
                      </div>

                      <span>
                        Pronto
                      </span>

                    </div>

                  </div>

                )}

                {/* BOTÕES */}
                <div className="order-footer">

                  <Link
                    to={`/pedidos/${order.id.replace("#", "")}`}
                    className="order-button"
                  >
                    Ver detalhes
                  </Link>

                  {order.statusType === "delivered" && (

                    <button
                      className="order-button secondary"
                    >
                      Pedir novamente
                    </button>

                  )}

                </div>

              </article>

            ))}

          </section>

          {/* LINK PARA CARDÁPIO */}
          <div className="orders-empty-link">

            <span>
              Quer fazer um novo pedido?
            </span>

            <Link to="/cardapio">
              Ver cardápio →
            </Link>

          </div>

        </div>
      </main>
    </>
  );
}

export default Orders;