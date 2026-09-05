import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { getOrders, money } from "../../services/orderService";
import { errorMessage } from "../../services/api";
import type { Order } from "../../types/Order";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    getOrders().then(data => { if(active) setOrders(data); })
      .catch(e => { if(active) setError(errorMessage(e)); })
      .finally(() => { if(active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return <><Header /><main className="orders-page"><div className="orders-container">
    <div className="orders-heading"><span className="orders-eyebrow">HISTÓRICO</span>
      <h1>Pedidos</h1><p>Consulte os pedidos recebidos e seus detalhes.</p></div>
    {loading && <p role="status">Carregando pedidos…</p>}
    {error && <p role="alert">{error}</p>}
    {!loading && !error && orders.length === 0 && <p>Nenhum pedido criado ainda.</p>}
    <section className="orders-list">{orders.map(order => <article className="order-card" key={order.id}>
      <div className="order-header"><div><span className="order-number">Pedido #{order.id}</span>
        <span className="order-date">{new Date(order.created_at).toLocaleString("pt-BR")}</span></div>
        <span className="order-status">{order.status === "CRIADO" ? "Criado" : order.status}</span></div>
      <div className="order-content"><div className="order-items">{order.items.map(item =>
        <div className="order-item" key={item.product_id}><div className="item-quantity">{item.quantity}x</div>
          <div className="item-info">{item.name}</div><span className="item-price">{money(item.subtotal)}</span></div>
      )}</div><div className="order-total"><span>Total</span><strong>{money(order.total)}</strong></div></div>
      <div className="order-footer"><Link className="order-button" to={"/pedidos/" + order.id}>Ver detalhes</Link></div>
    </article>)}</section>
    <div className="orders-empty-link"><Link to="/cardapio">Ver cardápio →</Link></div>
  </div></main></>;
}
