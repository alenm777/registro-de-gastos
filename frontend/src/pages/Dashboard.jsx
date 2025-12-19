import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTransactions }  from "../services/transactions";

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);

 useEffect(() => {
  if (token) {
    getTransactions(token)
    .then(res => setTransactions(res.data))
    .catch(err => console.error(err));
  }
 }, [token]);

  return (
    <div>
      <h1>Panel de control</h1>

      {user && (
        <p>
          Bienvenido, <strong>{user.name}</strong> ({user.email})
        </p>
      )}

      <h2>Mis Gastos</h2>

      {transactions.length === 0 && <p>No hay transacciones</p>}

      <ul>
        {transactions.map(t => (
          <li key={t.id}>
            {t.description} - ${t.amount}
          </li>
        ))}
      </ul>

      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}