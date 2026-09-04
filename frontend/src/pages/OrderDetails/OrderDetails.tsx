import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./OrderDetails.css";

const orderItems = [
  {
    name: "Le Maître Signature",
    quantity: 1,
    price: 54.9,
  },
  {
    name: "Double Brasa",
    quantity: 1,
    price: 48.5,
  },
  {
    name: "Margherita di Napoli",
    quantity: 1,
    price: 62.0,
  },
  {
    name: "Pepperoni Picante",
    quantity: 1,
    price: 68.0,
  },
  {
    name: "Negroni da Casa",
    quantity: 1,
    price: 32.0,
  },
  {
    name: "Petit Gâteau",
    quantity: 1,
    price: 29.0,
  },
];

const statusSteps = [
  {
    title: "Criado",
    description: "Recebemos seu pedido.",
    completed: true,
  },
  {
    title: "Pagamento pendente",
    description: "Aguardando a confirmação do pagamento.",
    completed: true,
  },
  {
    title: "Pago",
    description: "Pagamento aprovado.",
    completed: true,
  },
  {
    title: "Em preparação",
    description: "A cozinha está preparando tudo.",
    completed: true,
  },
  {
    title: "Pronto",
    description: "Seu pedido está pronto para retirada/entrega.",
    completed: true,
  },
  {
    title: "Finalizado",
    description: "Pedido concluído. Bom apetite!",
    completed: true,
  },
];

function OrderDetails() {
  const { id } = useParams();

  const orderNumber = id || "1003";

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />

      <main className="order-details-page">
        <div className="order-details-container">

          {/* CABEÇALHO */}
          <div className="order-details-header">

            <div>
              <span className="order-eyebrow">
                ACOMPANHAMENTO
              </span>

              <h1>Pedido #{orderNumber}</h1>

              <p>
                Criado em 28/08/2026, 00:31
              </p>
            </div>

            <span className="order-status">
              Finalizado
            </span>

          </div>

          {/* CONTEÚDO */}
          <div className="order-details-content">

            {/* STATUS */}
            <section className="status-card">

              <h2>Status do pedido</h2>

              <div className="status-list">

                {statusSteps.map((step, index) => (
                  <div
                    className={`status-step ${
                      index === statusSteps.length - 1
                        ? "last"
                        : ""
                    }`}
                    key={step.title}
                  >

                    <div className="status-marker">
                      {index === statusSteps.length - 1
                        ? "◔"
                        : "✓"}
                    </div>

                    <div className="status-line" />

                    <div className="status-info">

                      <strong>
                        {step.title}
                      </strong>

                      <span>
                        {step.description}
                      </span>

                    </div>

                  </div>
                ))}

              </div>

            </section>

            {/* ITENS */}
            <aside className="items-card">

              <h2>Itens</h2>

              <div className="order-items">

                {orderItems.map((item) => (
                  <div
                    className="order-item"
                    key={item.name}
                  >

                    <span>
                      {item.quantity}x {item.name}
                    </span>

                    <strong>
                      R${" "}
                      {(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </strong>

                  </div>
                ))}

              </div>

              <div className="items-divider" />

              <div className="order-total">

                <span>Total</span>

                <strong>
                  R$ {total.toFixed(2).replace(".", ",")}
                </strong>

              </div>

              <Link
                to="/pedidos"
                className="all-orders-button"
              >
                Ver todos os pedidos
              </Link>

            </aside>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="order-footer">

        <div className="order-footer-container">

          <div>
            <div className="footer-logo">
              Le Maître
            </div>

            <p>
              Cozinha autoral servida todos os dias,
              das 18h às 00h. Rua das Oliveiras, 240.
            </p>
          </div>

          <span>
            Projeto acadêmico — Sistemas Distribuídos e
            Qualidade de Software.
          </span>

        </div>

      </footer>
    </>
  );
}

export default OrderDetails;