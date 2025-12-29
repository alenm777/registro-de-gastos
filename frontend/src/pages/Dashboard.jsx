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

import "./dashboard.css";

export default function Dashboard() {
  const { logout } = useAuth();
  const [transactions, setTransactions] = useState([]);

  // 📅 Mes seleccionado
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
    if (!window.confirm("¿Eliminar esta transacción?")) return;

    try {
      await deleteTransaction(id);
      loadTransactions();
    } catch (err) {
      console.error("Error al eliminar transacción", err);
    }
  };

  // 🔎 Filtrar por mes
  const filteredTransactions = transactions.filter(t => {
    if (!t.date) return false;
    const d = new Date(t.date);
    const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return month === selectedMonth;
  });

  // 📊 Totales
  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="dashboard">

      {/* HEADER */}
      <header className="dashboard-header">
        <h1>Panel de control</h1>
        <button onClick={logout}>Cerrar sesión</button>
      </header>

      {/* RESUMEN */}
      <section className="summary">
        <div className="card">
          <h3>Ingresos</h3>
          <p className="amount income">${totalIncome.toFixed(2)}</p>
        </div>

        <div className="card">
          <h3>Gastos</h3>
          <p className="amount expense">${totalExpense.toFixed(2)}</p>
        </div>

        <div className="card">
          <h3>Balance</h3>
          <p className={`amount ${balance >= 0 ? "income" : "expense"}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </section>

      {/* ACCIONES */}
      <section className="actions">
        <div className="card">
          <h2>Nueva transacción</h2>
          <TransactionForm onCreated={loadTransactions} />
        </div>

        <div className="card">
          <h3>Filtrar por mes</h3>
          <input
            type="month"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          />

          {/* 🔽 BOTONES EXPORTAR */}
          <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
            <button onClick={() => exportToPDF(filteredTransactions)}>
              📄 Exportar PDF
            </button>

            <button onClick={() => exportToExcel(filteredTransactions)}>
              📊 Exportar Excel
            </button>
          </div>
        </div>
      </section>

      {/* GRÁFICOS */}
      <section className="charts">
        <div className="card">
          <IncomeExpenseChart income={totalIncome} expense={totalExpense} />
        </div>

        <div className="card">
          <ExpenseByCategoryChart transactions={filteredTransactions} />
        </div>

        <div className="card">
          <ExpenseLast30DaysChart transactions={transactions} />
        </div>

        <div className="card">
          <IncomeLast30DaysChart transactions={transactions} />
        </div>
      </section>

      {/* TABLAS */}
      <section className="tables">
        <div className="card">
          <h2>Ingresos</h2>
          <IncomeTable transactions={filteredTransactions} />
        </div>

        <div className="card">
          <h2>Gastos</h2>
          <ExpenseTable
            transactions={filteredTransactions}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </section>

    </div>
  );
}
