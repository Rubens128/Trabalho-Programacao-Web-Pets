const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController.js");
const verificarToken = require("../middlewares/middleware.js");

router.post("/login", authController.login);
router.get("/retornoUsuario", verificarToken, authController.retornoUsuario);
router.post("/registrarUsuario", authController.registrarUsuarioController);

module.exports = router;