import { ShoppingBag, UserRound } from "lucide-react";
import {
  Link,
  useLocation,
} from "react-router-dom";

import { useCart } from "../../contexts/cart";

import "./Header.css";

function Header() {
  const { totalItems } = useCart();

  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">

        <Link to="/" className="logo">
          <span>Le Maître</span>
          <small>CUISINE & GRILL</small>
        </Link>

        <nav className="nav">

          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "active"
                : ""
            }
          >
            Início
          </Link>

          <Link
            to="/cardapio"
            className={
              location.pathname === "/cardapio"
                ? "active"
                : ""
            }
          >
            Cardápio
          </Link>

          <Link
            to="/pedidos"
            className={
              location.pathname === "/pedidos"
                ? "active"
                : ""
            }
          >
            Meus pedidos
          </Link>

        </nav>

        <div className="header-actions">

          <Link
            to="/carrinho"
            className="cart-link"
            aria-label="Carrinho"
          >
            <ShoppingBag
              size={18}
              strokeWidth={1.5}
            />

            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="account-link"
            aria-label="Minha conta"
          >
            <UserRound
              size={18}
              strokeWidth={1.5}
            />
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Header;
