import express from "express";
import treinosController from "../controllers/saudeFisica/treinosController.js";

const rotas = express.Router();

rotas.get("/treino", treinosController.todostreinos);
rotas.post("/treino", treinosController.novoTreino);
rotas.delete("/treino/:id", treinosController.deletarTreinoId);


export default rotas;