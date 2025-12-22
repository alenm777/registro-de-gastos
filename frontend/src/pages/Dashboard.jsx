import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTransactions } from "../services/transactions";
import TransactionForm from "../components/TransactionForm";

export default function Dashboard() {
  const { logout } = useAuth();
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    try {
      const res = await getTransactions();
      console.log("Transacciones:", res.data);
      setTransactions(res.data);
    } catch (err) {
      console.error("Error al obtener transacciones", err);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel de control</h1>

      <button onClick={logout}>Cerrar sesión</button>

      <hr />

      <h2>Nueva transacción</h2>
      <TransactionForm onCreated={loadTransactions} />

      <hr />

      <h2>Transacciones recientes</h2>

      {transactions.length === 0 ? (
        <p>No hay transacciones registradas</p>
      ) : (
        <ul>
          {transactions.slice(0, 5).map(tx => (
            <li key={tx.id}>
              {tx.type === "expense" ? "Gasto" : "Ingreso"} — ${tx.amount} — {tx.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}