const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Ruta protegida OK",
    userId: req.userId,
  });
});

module.exports = router;