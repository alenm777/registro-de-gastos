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

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Rutas */
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