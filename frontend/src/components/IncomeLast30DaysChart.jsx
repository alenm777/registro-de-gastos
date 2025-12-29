import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function IncomeBarChart({ transactions }) {
  // 👉 ingresos últimos 30 días
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const incomes = transactions.filter(
    t =>
      t.type === "income" &&
      new Date(t.date) >= last30Days
  );

  // agrupar por día
  const grouped = {};

  incomes.forEach(t => {
    const day = new Date(t.date).toLocaleDateString();
    grouped[day] = (grouped[day] || 0) + t.amount;
  });

  const labels = Object.keys(grouped);
  const dataValues = Object.values(grouped);

  const data = {
    labels,
    datasets: [
      {
        label: "Ingresos últimos 30 días",
        data: dataValues,
        backgroundColor: "rgba(34,197,94,0.7)" // verde
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };

  if (labels.length === 0) {
    return <p>No hay ingresos en los últimos 30 días</p>;
  }

 return (
  <div style={{ maxWidth: "600px", margin: "40px auto" }}>
    <h3 style={{ textAlign: "center" }}>
      Ingresos últimos 30 días
    </h3>

    {labels.length === 0 ? (
      <p style={{ textAlign: "center" }}>
        No hay ingresos en los últimos 30 días
      </p>
    ) : (
      <Bar data={data} />
    )}
  </div>
);
}