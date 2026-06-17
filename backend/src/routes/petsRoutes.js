const express = require("express");
const router = express.Router();

const petsController = require("../controllers/petsController.js");

router.get("/listarPets", petsController.ListarPets);
router.put("/editarPet", petsController.EditarPets);
router.delete("/deletarPet", petsController.DeletarPet);
router.post("/adicionarPet", petsController.AdicionarPet);

module.exports = router;