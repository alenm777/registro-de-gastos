export default function IncomeTable({ transactions }) {
  const incomes = transactions.filter(t => t.type === "income");

  if (incomes.length === 0) {
    return <p>No hay ingresos registrados</p>;
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "16px"
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>Fecha</th>
          <th style={thStyle}>Categoría</th>
          <th style={thStyle}>Monto</th>
        </tr>
      </thead>

      <tbody>
        {incomes.map(inc => (
          <tr key={inc.id}>
            <td style={tdStyle}>
              {new Date(inc.date).toLocaleDateString()}
            </td>
            <td style={tdStyle}>{inc.category}</td>
            <td style={{ ...tdStyle, color: "green", fontWeight: "bold" }}>
              ${inc.amount.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle = {
  borderBottom: "2px solid #ccc",
  textAlign: "left",
  padding: "8px"
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "8px"
};