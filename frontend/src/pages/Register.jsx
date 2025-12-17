import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });
      alert("Usuario creado");
    } catch {
      alert("Error al registrar");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <input placeholder="Nombre" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button>Registrarse</button>
    </form>
  );
}
