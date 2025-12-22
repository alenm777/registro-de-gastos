import { useState } from "react";
import { createTransaction } from "../services/transactions";

export default function TransactionForm ({ onCreated }) {
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
    await createTransaction({
        ...form,
        amount: Number(form.amount)
    });
     onCreated(); // refresca dashboard
    setForm({ type: "expense", amount: "", category: "", date: "" });
};

return (
    <form onSubmit={handleSubmit}>
        <select name="type" value={form.type} onChange={handleChange}>
        <option value="expense">Gasto</option>
        <option value="income">Ingreso</option>
       </select>

        <input
        name="amount"
        type="number"
        placeholder="Monto"
        value={form.amount}
        onChange={handleChange}
        />

<input 
name="date"
type="date"
value={form.date}
onChange={handleChange}
/>

<button>Agregar</button>
    </form>
 );
}