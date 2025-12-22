const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const Transaction = require("../models/Transaction");

// 🔹 OBTENER transacciones del usuario
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.userId },
      order: [["date", "DESC"]]
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener transacciones" });
  }
});


// CREAR transacción
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { type, amount, category, date } = req.body;

    const transaction = await Transaction.create({
      type,
      amount,
      category,
      date,
      userId: req.userId
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error al crear transacción" });
  }
});

// ELIMINAR transacción
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Transaction.destroy({
      where: {
        id,
        userId: req.userId // ✅ coherente con el middleware
      }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }

    res.json({ message: "Transacción eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar transacción" });
  }
});

module.exports = router;