import { ShoppingBag, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">

        <Link to="/" className="logo">
          <span>Le Maître</span>
          <small>CUISINE & GRILL</small>
        </Link>

        <nav className="nav">
          <Link to="/" className="active">
            Início
          </Link>

          <Link to="/cardapio">
            Cardápio
          </Link>

          <Link to="/pedidos">
            Meus pedidos
          </Link>
        </nav>

        <div className="header-actions">

          <Link to="/carrinho" aria-label="Carrinho">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </Link>

          <Link to="/login" aria-label="Minha conta">
            <UserRound size={18} strokeWidth={1.5} />
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Header;