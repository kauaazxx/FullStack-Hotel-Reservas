const express = require("express");
const router = express.Router();

const reservaController = require("../controllers/reserva.controller");

router.get("/:quartoId", reservaController.listarPorQuarto);
router.post("/", reservaController.cadastrar);
router.delete("/:id", reservaController.excluir);

module.exports = router;