const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");
const verificarToken = require("../middlewares/middleware.js");

router.post("/adicionarUsuario", usuarioController.AdicionarUsuario);
router.put("/editarUsuario", usuarioController.EditarUsuario);
router.get("/listarUsuarios", usuarioController.ListarUsuarios);
router.delete("/deletarUsuario", usuarioController.DeletarUsuario);
router.get("/retornoUsuario", verificarToken, usuarioController.RetornoUsuario);

module.exports = router;