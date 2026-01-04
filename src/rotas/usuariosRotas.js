import express from "express";
import usuarioController from "../controllers/usuarioController.js";

const rotas = express.Router();

rotas.get("/cliente/login", usuarioController.loginUsuario);
rotas.get("/clientes/:id", ClienteController.encontrarClienteId);
rotas.post("/clientes", ClienteController.cadastrarCliente);
rotas.put("/clientes/:id", ClienteController.atualizarClienteId);
rotas.delete("/clientes/:id", ClienteController.deletarClienteId);

export default rotas;