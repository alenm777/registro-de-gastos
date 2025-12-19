import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

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

    try {
      const res = await loginRequest(form);

      // guardamos usuario + token
      login(res.data.user, res.data.token);

      // 👉 REDIRECCIÓN AL DASHBOARD
      navigate("/");
    } catch (error) {
      alert("Email o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit">Ingresar</button>
    </form>
  );
}