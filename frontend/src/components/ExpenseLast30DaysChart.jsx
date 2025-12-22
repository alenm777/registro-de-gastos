import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function ExpenseLast30DaysChart({ transactions }) {
  // fecha límite (hoy - 30 días)
  const today = new Date();
  const last30Days = new Date();
  last30Days.setDate(today.getDate() - 30);

  // filtrar solo gastos últimos 30 días
  const expenses = transactions.filter(t =>
    t.type === "expense" &&
    new Date(t.date) >= last30Days
  );

  // agrupar por fecha
  const grouped = {};
  expenses.forEach(t => {
    const date = new Date(t.date).toLocaleDateString();
    grouped[date] = (grouped[date] || 0) + t.amount;
  });

  const labels = Object.keys(grouped);
  const dataValues = Object.values(grouped);

  const data = {
    labels,
    datasets: [
      {
        label: "Gastos últimos 30 días",
        data: dataValues,
        backgroundColor: "#dc2626"
      }
    ]
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h3 style={{ textAlign: "center" }}>
        Gastos últimos 30 días
      </h3>

      {labels.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No hay gastos en los últimos 30 días
        </p>
      ) : (
        <Bar data={data} />
      )}
    </div>
  );
}