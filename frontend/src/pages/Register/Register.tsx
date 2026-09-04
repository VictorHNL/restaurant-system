import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  function formatPhone(value: string) {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(
        2,
        7
      )}-${numbers.slice(7)}`;
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(
      2,
      7
    )}-${numbers.slice(7, 11)}`;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setError("Preencha todos os campos.");
      return;
    }

    if (!email.includes("@")) {
      setError("Digite um e-mail válido.");
      return;
    }

    if (password.length < 6) {
      setError(
        "A senha deve possuir pelo menos 6 caracteres."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    navigate("/login");
  }

  return (
    <main className="register-page">

      <div className="register-background" />

      <div className="register-container">

        <Link to="/" className="register-logo">
          <span>Le Maître</span>
          <small>CUISINE & GRILL</small>
        </Link>

        <div className="register-card">

          <div className="register-heading">

            <span className="register-eyebrow">
              JUNTE-SE A NÓS
            </span>

            <h1>Criar conta</h1>

            <p>
              Crie sua conta para fazer pedidos e acompanhar
              suas experiências no Le Maître.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="register-form"
          >

            <div className="form-group">

              <label htmlFor="name">
                Nome completo
              </label>

              <input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />

            </div>

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

              <label htmlFor="phone">
                Telefone
              </label>

              <input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(event) =>
                  setPhone(
                    formatPhone(event.target.value)
                  )
                }
                maxLength={15}
              />

            </div>

            <div className="form-group">

              <label htmlFor="password">
                Senha
              </label>

              <div className="password-input-wrapper">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Mínimo de 6 caracteres"
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

            <div className="form-group">

              <label htmlFor="confirmPassword">
                Confirmar senha
              </label>

              <div className="password-input-wrapper">

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Digite a senha novamente"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>

            </div>

            {error && (
              <div className="register-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="register-button"
            >
              Criar conta
            </button>

          </form>

          <div className="register-divider">
            <span>ou</span>
          </div>

          <div className="login-link">

            <span>
              Já possui uma conta?
            </span>

            <Link to="/login">
              Entrar
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

export default Register;