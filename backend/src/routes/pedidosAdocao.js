const express = require("express");
const router = express.Router();

const pedidosAdocaoController = require("../controllers/pedidosAdocaoController.js");

router.get("/listarPedidosAdocao", pedidosAdocaoController.ListarPedidosAdocao);
router.post("/adicionarPedidoAdocao", pedidosAdocaoController.AdicionarPedidoAdocao);
router.delete("/deletarPedidoAdocao", pedidosAdocaoController.DeletarPedidoAdocao);
router.put("/editarPedidoAdocao", pedidosAdocaoController.EditarPedidoAdocao);

module.exports = router;