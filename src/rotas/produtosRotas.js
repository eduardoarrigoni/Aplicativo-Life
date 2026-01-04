import express from "express";
import ProdutoController from "../controllers/produtoController.js";

const rotas = express.Router();

rotas.get("/produtos", ProdutoController.listarProdutos);
rotas.get("/produtos/:id", ProdutoController.encontrarProdutoId);
rotas.post("/produtos", ProdutoController.cadastrarProduto);
rotas.put("/produtos/:id", ProdutoController.atualizarProdutoId);
rotas.delete("/produtos/:id", ProdutoController.deletarProdutoId);

export default rotas;