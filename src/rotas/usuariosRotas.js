import express from "express";
import usuarioController from "../controllers/usuarioController.js";
import VerificacaoToken from "../middlewares/verificacaoToken.js";

const rotas = express.Router();


rotas.get("/cliente/login", usuarioController.loginUsuario);
rotas.get("/clientes/atualizar/dados", VerificacaoToken.validarToken, usuarioController.atualizarDadosUsuario);
rotas.post("/clientes", ClienteController.cadastrarCliente);
rotas.put("/clientes/:id", ClienteController.atualizarClienteId);
rotas.delete("/clientes/:id", ClienteController.deletarClienteId);

export default rotas;