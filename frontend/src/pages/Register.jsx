import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

    try {
      const res = await registerRequest(form);

      // 👉 auto login
      login(res.data.user, res.data.token);

      // 👉 al dashboard
      navigate("/");
    } catch (err) {
      alert("Error al registrarse");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear cuenta</h2>

      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit">Registrarse</button>

      <p>
        ¿Ya tenés cuenta? <Link to="/login">Ingresar</Link>
      </p>
    </form>
  );
}