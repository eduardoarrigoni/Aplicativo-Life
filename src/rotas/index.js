import express from "express";
import usuarios from "./usuariosRotas.js"
import produtos from "./produtosRotas.js";
import vendas from "./vendasRotas.js";
import treinoUnico from "./treinoUnicoRotas.js";

const rotas = (app) => {

    app.route("/").get((req, res) => res.status(200).send("Loja virtual"));
    app.use(express.json(), usuarios, produtos, vendas, treinoUnico);
};

export default rotas;