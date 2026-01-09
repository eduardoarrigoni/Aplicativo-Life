import express from "express";
import usuarios from "./usuariosRotas.js"
import VerificacaoToken from "../middlewares/verificacaoToken.js";
const rotas = (app) => {

    app.route("/").get((req, res) => res.status(200).send("App Life"));
    app.use(express.json(), VerificacaoToken.validarToken, usuarios);
};

export default rotas;