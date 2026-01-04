import express from "express";
import treinoUnicoController from "../controllers/treinoUnicoController.js";

const rotas = express.Router();

rotas.get("/treino", treinoUnicoController.todostreinos);
rotas.post("/treino", treinoUnicoController.novoTreino);
rotas.get("/treinosSemanais", treinoUnicoController.treinosSemanais);
rotas.delete("/treino/:id", treinoUnicoController.deletarTreinoId);
export default rotas;