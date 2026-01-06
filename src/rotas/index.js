import express from "express";
import usuarios from "./usuariosRotas.js"
import treinoUnico from "./treinoUnicoRotas.js";

const rotas = (app) => {

    app.route("/").get((req, res) => res.status(200).send("App Life"));
    app.use(express.json(), usuarios);
};

export default rotas;