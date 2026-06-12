const express = require("express");
const router = express.Router();

const quartoController = require("../controllers/quarto.controller");

router.get("/", quartoController.listar);
router.post("/", quartoController.cadastrar);
router.delete("/:id", quartoController.excluir);

module.exports = router;