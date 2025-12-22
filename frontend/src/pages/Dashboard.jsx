import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTransactions, deleteTransaction } from "../services/transactions";
import TransactionForm from "../components/TransactionForm";

export default function Dashboard() {
  const { logout } = useAuth();
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error("Error al obtener transacciones", err);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // 🔴 ELIMINAR TRANSACCIÓN
  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Eliminar esta transacción?");
    if (!confirm) return;

    try {
      await deleteTransaction(id);
      loadTransactions(); // recarga lista
    } catch (err) {
      console.error("Error al eliminar transacción", err);
    }
  };

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel de control</h1>

      <button onClick={logout}>Cerrar sesión</button>

      <hr />

      <h2>Nueva transacción</h2>
      <TransactionForm onCreated={loadTransactions} />

      <hr />

      {/* TARJETAS */}
      <div style={{ display: "flex", gap: "16px", margin: "20px 0" }}>
        <div style={{ padding: "16px", border: "1px solid #ccc", width: "200px" }}>
          <h3>Ingresos</h3>
          <p style={{ color: "green", fontWeight: "bold" }}>
            ${totalIncome.toFixed(2)}
          </p>
        </div>

        <div style={{ padding: "16px", border: "1px solid #ccc", width: "200px" }}>
          <h3>Gastos</h3>
          <p style={{ color: "red", fontWeight: "bold" }}>
            ${totalExpense.toFixed(2)}
          </p>
        </div>

        <div style={{ padding: "16px", border: "1px solid #ccc", width: "200px" }}>
          <h3>Balance</h3>
          <p
            style={{
              color: balance >= 0 ? "green" : "red",
              fontWeight: "bold"
            }}
          >
            {balance < 0
              ? `-$${Math.abs(balance).toFixed(2)}`
              : `$${balance.toFixed(2)}`}
          </p>
        </div>
      </div>

      {/* LISTA */}
      <h2>Transacciones recientes</h2>

      {transactions.length === 0 ? (
        <p>No hay transacciones registradas</p>
      ) : (
        <ul>
          {transactions.slice(0, 5).map(tx => (
            <li
              key={tx.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px"
              }}
            >
              <span>
                {tx.type === "expense" ? "Gasto" : "Ingreso"} — ${tx.amount} — {tx.category}
              </span>

              <button
                onClick={() => handleDelete(tx.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}