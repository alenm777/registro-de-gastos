import "../styles/tables.css";

export default function IncomeTable({ transactions }) {
  const incomes = transactions.filter(t => t.type === "income");

  if (incomes.length === 0) {
    return <p className="table-empty">No hay ingresos registrados</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Categoría</th>
            <th>Monto</th>
          </tr>
        </thead>

        <tbody>
          {incomes.map(inc => (
            <tr key={inc.id}>
              <td data-label="Fecha">
                {new Date(inc.date).toLocaleDateString()}
              </td>
              <td data-label="Categoría">
                {inc.category || "-"}
              </td>
              <td
                data-label="Monto"
                className="amount-income"
              >
                ${Number(inc.amount).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}