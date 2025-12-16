const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const Transaction = require("../models/Transaction");

/* CREAR transacción */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { type, amount, category, date } = req.body;

    const transaction = await Transaction.create({
      type,
      amount,
      category,
      date,
      userId: req.user.id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error al crear transacción" });
  }
});

/* LISTAR transacciones */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id },
      order: [["date", "DESC"]],
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener transacciones" });
  }
});

module.exports = router;