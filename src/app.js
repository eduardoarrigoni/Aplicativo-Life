import express from "express";
import conectaDataBase from "./config/dbConnect.js";
import rotas from "./rotas/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conectaDataBase();

conexao.on("error", (erro) => {
    console.error("erro de conexao", erro);
});

conexao.once("open", () => {
    console.log("Conexao com banco bem sucedida");
})
const app = express();
rotas(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;
