import { useState, useContext } from "react";
import { loginRequest } from "../services/auth";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await loginRequest(form);
    login(res.data.user, res.data.token);
  } catch (err) {
    alert("Email o contraseña incorrectos");
  }

    const res = await loginRequest(form);
    login(res.data.token); // 👈 SOLO el token
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button>Ingresar</button>
    </form>
  );
}