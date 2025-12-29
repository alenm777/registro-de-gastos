import "../styles/tables.css";

export default function ExpenseTable({ transactions, onDelete }) {
  const expenses = transactions.filter(t => t.type === "expense");

  if (expenses.length === 0) {
    return <p className="table-empty">No hay gastos registrados</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Categoría</th>
            <th>Monto</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td data-label="Fecha">
                {new Date(exp.date).toLocaleDateString()}
              </td>

              <td data-label="Categoría">
                {exp.category}
              </td>

              <td
                data-label="Monto"
                className="amount-expense"
              >
                ${Number(exp.amount).toFixed(2)}
              </td>

              <td data-label="Acciones">
                <button
                  className="delete-btn"
                  title="Eliminar"
                  onClick={() => onDelete(exp.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}