import { useState } from "react";
import { createTransaction } from "../services/transactions";

// Categorías de gastos
const EXPENSE_CATEGORIES = [
  "Alquiler",
  "Comida",
  "Luz",
  "Agua",
  "Internet",
  "Transporte",
  "Salud",
  "Otros"
];

export default function TransactionForm({ onCreated }) {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validaciones básicas
    if (!form.amount || !form.date) {
      alert("Completá monto y fecha");
      return;
    }

    if (form.type === "expense" && !form.category) {
      alert("Seleccioná una categoría para el gasto");
      return;
    }

    await createTransaction({
      ...form,
      amount: Number(form.amount),
      category: form.type === "income" ? "Ingreso" : form.category
    });

    onCreated();

    // Reset
    setForm({
      type: "expense",
      amount: "",
      category: "",
      date: ""
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        flexWrap: "wrap"
      }}
    >
      {/* Tipo */}
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="expense">Gasto</option>
        <option value="income">Ingreso</option>
      </select>

      {/* Categoría SOLO si es gasto */}
      {form.type === "expense" && (
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Categoría</option>
          {EXPENSE_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}

      {/* Monto */}
      <input
        name="amount"
        type="number"
        placeholder="Monto"
        value={form.amount}
        onChange={handleChange}
      />

      {/* Fecha */}
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />

      <button type="submit">Agregar</button>
    </form>
  );
}