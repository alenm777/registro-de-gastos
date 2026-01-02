import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest, registerRequest } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = isRegister
        ? await registerRequest(form)
        : await loginRequest(form);

      // 🔐 Guardar token
      login(res.data.token);

      // 👉 Ir al dashboard
      navigate("/");
    } catch (err) {
      setError(
        isRegister
          ? "No se pudo registrar el usuario"
          : "Email o contraseña incorrectos"
      );
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? "Crear cuenta" : "Ingresar"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">
          {isRegister ? "Registrarse" : "Ingresar"}
        </button>
      </form>

      <p
        style={{ marginTop: "12px", cursor: "pointer", color: "#2563eb" }}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "¿Ya tenés cuenta? Ingresar"
          : "¿No tenés cuenta? Registrate"}
      </p>
    </div>
  );
}