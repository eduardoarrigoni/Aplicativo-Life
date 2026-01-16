import express from "express";
import refeicaoController from "../controllers/saudeFisica/refeicaoController.js";

const rotas = express.Router();

rotas.get("/refeicoes", refeicaoController.todasRefeicoes);
rotas.post("/adicionar/refeicao", refeicaoController.adicionarRefeicao);
rotas.delete("/refeicao/:id", refeicaoController.deletarRefeicaoId);


export default rotas;