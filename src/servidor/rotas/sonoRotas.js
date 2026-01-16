import express from "express";
import sonoController from "../controllers/saudeFisica/sonoController.js";

const rotas = express.Router();

rotas.get("/sono", sonoController.todosSonos);
rotas.post("/adicionar/sono", sonoController.adicionarSono);
rotas.delete("/sono/:id", sonoController.deletarSonoId);


export default rotas;