import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (transactions, month) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`Reporte de Transacciones - ${month}`, 14, 15);

  const tableData = transactions.map(t => [
    t.type === "income" ? "Ingreso" : "Gasto",
    t.category || "-",
    `$${t.amount}`,
    t.date
  ]);

  autoTable(doc, {
    head: [["Tipo", "Categoría", "Monto", "Fecha"]],
    body: tableData,
    startY: 25
  });

  doc.save(`transacciones-${month}.pdf`);
};
