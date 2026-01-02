const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");

const authRoutes = require("./routes/auth.routes");
const transactionRoutes = require("./routes/transactions.routes");
const protectedRoutes = require("./routes/protected.routes");

const app = express();

/* 🔥 MIDDLEWARES (ESTO ES CLAVE) */
app.use(cors());
app.use(express.json()); // 👈 OBLIGATORIO
app.use(express.urlencoded({ extended: true })); // 👈 OBLIGATORIO

/* RUTAS */
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api", protectedRoutes);

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log("DB conectada");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
  });
});