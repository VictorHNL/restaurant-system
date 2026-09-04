import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Preencha seu e-mail e sua senha.");
      return;
    }

    if (!email.includes("@")) {
      setError("Digite um e-mail válido.");
      return;
    }

    navigate("/");
  }

  return (
    <main className="login-page">

      <div className="login-background" />

      <div className="login-container">

        <Link to="/" className="login-logo">
          <span>Le Maître</span>
          <small>CUISINE & GRILL</small>
        </Link>

        <div className="login-card">

          <div className="login-heading">

            <span className="login-eyebrow">
              BEM-VINDO DE VOLTA
            </span>

            <h1>Entrar</h1>

            <p>
              Acesse sua conta para continuar seu pedido.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="login-form">

            <div className="form-group">

              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

            </div>

            <div className="form-group">

              <div className="password-label">

                <label htmlFor="password">
                  Senha
                </label>

                <a href="#" className="forgot-password">
                  Esqueci minha senha
                </a>

              </div>

              <div className="password-input-wrapper">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>

            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
            >
              Entrar
            </button>

          </form>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <div className="register-link">

            <span>
              Ainda não possui uma conta?
            </span>

            <Link to="/register">
              Criar conta
            </Link>

          </div>

        </div>

        <Link to="/" className="back-home">
          ← Voltar para o início
        </Link>

      </div>

    </main>
  );
}

export default Login;