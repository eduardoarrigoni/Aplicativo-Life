import express from "express";
import aguaController from "../controllers/saudeFisica/aguaController.js";

const rotas = express.Router();

rotas.get("/agua", aguaController.todosRegistros);
rotas.post("/adicionar/quantidade/agua", aguaController.adicionarQuantidadeAguaDiaria);
rotas.delete("/agua/:id", aguaController.deletarIngestaoId);


export default rotas;