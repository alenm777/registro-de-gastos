export default function ExpenseTable({ transactions, onDelete }) {
  const expenses = transactions.filter(t => t.type === "expense");

  if (expenses.length === 0) {
    return <p>No hay gastos registrados</p>;
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
          <th style={thStyle}>Acción</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map(exp => (
          <tr key={exp.id}>
            <td style={tdStyle}>
              {new Date(exp.date).toLocaleDateString()}
            </td>
            <td style={tdStyle}>{exp.category}</td>
            <td style={{ ...tdStyle, color: "red", fontWeight: "bold" }}>
              ${exp.amount.toFixed(2)}
            </td>
            <td style={tdStyle}>
              <button
                onClick={() => onDelete(exp.id)}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  fontSize: "18px"
                }}
                title="Eliminar gasto"
              >
                🗑️
              </button>
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