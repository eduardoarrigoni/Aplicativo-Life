import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

const rotas = express.Router();


rotas.get("/usuario/login", UsuarioController.loginUsuario);
rotas.post("/usuario/cadastro", UsuarioController.cadastroUsuario);
rotas.put("/usuario/atualizar/dados", UsuarioController.atualizarDadosUsuario);


export default rotas;