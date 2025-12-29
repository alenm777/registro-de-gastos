import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTransactions, deleteTransaction } from "../services/transactions";

import TransactionForm from "../components/TransactionForm";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import ExpenseLast30DaysChart from "../components/ExpenseLast30DaysChart";
import IncomeLast30DaysChart from "../components/IncomeLast30DaysChart";
import IncomeTable from "../components/IncomeTable";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseByCategoryChart from "../components/ExpenseByCategoryChart";
import { exportToPDF } from "../utils/exportPDF";
import { exportToExcel } from "../utils/exportExcel";

export default function Dashboard() {
  const { logout } = useAuth();
  const [transactions, setTransactions] = useState([]);

  // 📅 Mes seleccionado (YYYY-MM)
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  // 🔄 Cargar transacciones
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

  // 🗑️ Eliminar transacción
  const handleDeleteTransaction = async (id) => {
    const confirmed = window.confirm("¿Eliminar esta transacción?");
    if (!confirmed) return;

    try {
      await deleteTransaction(id);
      loadTransactions();
    } catch (err) {
      console.error("Error al eliminar transacción", err);
    }
  };

  // 🔎 Filtrar transacciones por mes
  const filteredTransactions = transactions.filter(t => {
    if (!t.date) return false;
    const d = new Date(t.date);
    const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return month === selectedMonth;
  });

  // 📊 Totales del mes
  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel de control</h1>

      <button onClick={logout}>Cerrar sesión</button>

      <hr />

      {/* 📅 FILTRO POR MES */}
      <h3>Filtrar por mes</h3>
      <input
        type="month"
        value={selectedMonth}
        onChange={e => setSelectedMonth(e.target.value)}
      />

   <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
  <button onClick={() => exportToPDF(filteredTransactions, selectedMonth)}>
    📄 Exportar PDF
  </button>

  <button onClick={() => exportToExcel(filteredTransactions, selectedMonth)}>
    📊 Exportar Excel
  </button>
</div>

      <hr />

      {/* ➕ NUEVA TRANSACCIÓN */}
      <h2>Nueva transacción</h2>
      <TransactionForm onCreated={loadTransactions} />

      <hr />

      {/* 📊 TARJETAS */}
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

      <hr />

      {/* 📋 TABLAS */}
      <h2>Listado completo de ingresos</h2>
      <IncomeTable transactions={filteredTransactions} />

      <h2>Listado completo de gastos</h2>
      <ExpenseTable
        transactions={filteredTransactions}
        onDelete={handleDeleteTransaction}
      />
      <hr />
      {/* 📈 GRÁFICOS */}
      <IncomeExpenseChart
        income={totalIncome}
        expense={totalExpense}
      />
      <ExpenseByCategoryChart
        transactions={filteredTransactions}
      />
      <ExpenseLast30DaysChart
        transactions={filteredTransactions}
      />
      <IncomeLast30DaysChart
        transactions={filteredTransactions}
      />
    </div>
  );
}