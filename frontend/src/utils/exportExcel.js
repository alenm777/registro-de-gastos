import * as XLSX from "xlsx";

export const exportToExcel = (transactions, month) => {
  const data = transactions.map(t => ({
    Tipo: t.type === "income" ? "Ingreso" : "Gasto",
    Categoría: t.category || "-",
    Monto: t.amount,
    Fecha: t.date
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Transacciones");

  XLSX.writeFile(workbook, `transacciones-${month}.xlsx`);
};