import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { getOrder, money } from "../../services/orderService";
import { errorMessage } from "../../services/api";
import type { Order } from "../../types/Order";
import "./OrderDetails.css";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    if (id) getOrder(id).then(data => { if(active) setOrder(data); })
      .catch(e => { if(active) setError(errorMessage(e)); });
    return () => { active = false; };
  }, [id]);
  return <><Header /><main className="order-details-page"><div className="order-details-container">
    {error && <p role="alert">{error}</p>}
    {!order && !error && <p role="status">Carregando pedido…</p>}
    {order && <>
      <div className="order-details-header"><div><span className="order-eyebrow">ACOMPANHAMENTO</span>
        <h1>Pedido #{order.id}</h1><p>Criado em {new Date(order.created_at).toLocaleString("pt-BR")}</p></div>
        <span className="order-status">{order.status === "CRIADO" ? "Criado" : order.status}</span></div>
      <div className="order-details-content">
        <section className="status-card"><h2>Status do pedido</h2>
          <div className="status-list"><div className="status-step last">
            <div className="status-marker">✓</div><div className="status-info">
              <strong>Pedido recebido</strong><span>Os itens foram registrados com sucesso.</span>
            </div></div></div>
        </section>
        <aside className="items-card"><h2>Itens</h2><div className="order-items">{order.items.map(item =>
          <div className="order-item" key={item.product_id}><span>{item.quantity}x {item.name}</span>
            <strong>{money(item.subtotal)}</strong></div>
        )}</div><div className="items-divider" /><div className="order-total"><span>Total</span><strong>{money(order.total)}</strong></div>
        </aside>
      </div>
    </>}
    <Link to="/pedidos" className="all-orders-button">Ver todos os pedidos</Link>
  </div></main></>;
}
