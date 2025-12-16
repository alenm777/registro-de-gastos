const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
require("./models/User");
require("./models/Transaction");

const authRoutes = require("./routes/auth.routes");
const transactionRoutes = require("./routes/transactions.routes");
const protectedRoutes = require("./routes/protected.routes");

const app = express();

/* 🔹 Middlewares primero */
app.use(cors());
app.use(express.json());

/* 🔹 Rutas */
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api", protectedRoutes);

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

const PORT = 5000;

sequelize
  .sync()
  .then(() => {
    console.log("Base de datos conectada y tablas creadas");
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en puerto ${PORT}`)
    );
  })
  .catch(err => {
    console.error("Error al conectar la base:", err);
  });

  // ELIMINAR transacción
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Transaction.destroy({
      where: {
        id,
        userId: req.user.id
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