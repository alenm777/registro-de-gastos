import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

const COLORS = [
 "#e6194B", // rojo
  "#3cb44b", // verde
  "#4363d8", // azul
  "#f58231", // naranja
  "#911eb4", // violeta
  "#46f0f0", // cian
  "#f032e6", // rosa
  "#bcf60c", // lima
  "#fabebe", // salmón
  "#008080" 
];

export default function ExpenseByCategoryChart({ transactions }) {
  // 1️⃣ Filtrar solo gastos
  const expenses = transactions.filter(t => t.type === "expense");

  // 2️⃣ Agrupar por categoría
  const grouped = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  // 3️⃣ Formato que espera Recharts
  const data = Object.keys(grouped).map(cat => ({
    name: cat,
    value: grouped[cat]
  }));

  if (data.length === 0) return <p>No hay gastos para mostrar</p>;

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Gastos por categoría</h3>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}