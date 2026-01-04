import express from "express";
import vendasController from "../controllers/vendaController.js";

const rotas = express.Router();

rotas.get("/vendas", vendasController.listarVendas);
rotas.get("/vendas/search", vendasController.listarVendasIdCliente);
rotas.get("/vendas/:id", vendasController.encontrarVendaId);
rotas.post("/vendas", vendasController.cadastrarVenda);
rotas.delete("/vendas/:id", vendasController.deletarVendaId);

export default rotas;