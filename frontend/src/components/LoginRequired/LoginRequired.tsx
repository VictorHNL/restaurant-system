import { Link } from "react-router-dom";

import "./LoginRequired.css";

type LoginRequiredProps = {
  action: string;
};

export default function LoginRequired({ action }: LoginRequiredProps) {
  return (
    <section className="login-required" aria-labelledby="login-required-title">
      <span className="login-required-eyebrow">SUA CONTA</span>
      <h1 id="login-required-title">Entre para {action}</h1>
      <p>Faça login ou crie uma conta gratuita para continuar.</p>
      <div className="login-required-actions">
        <Link to="/login" className="login-required-primary">Entrar</Link>
        <Link to="/register" className="login-required-secondary">Criar conta</Link>
      </div>
      <Link to="/cardapio" className="login-required-menu">← Voltar ao cardápio</Link>
    </section>
  );
}
