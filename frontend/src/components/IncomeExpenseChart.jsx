import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function IncomeExpenseChart({ income, expense }) {
  const data = {
    labels: ["Ingresos", "Gastos"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#16a34a", "#dc2626"],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ width: "300px", margin: "20px auto" }}>
      <h3 style={{ textAlign: "center" }}>Ingresos vs Gastos</h3>
      <Pie data={data} />
    </div>
  );
}