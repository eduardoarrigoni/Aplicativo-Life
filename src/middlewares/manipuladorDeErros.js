import erroBase from "../erros/erroBase.js";
import requisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import erroValidacao from "../erros/erroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipuladorDeErros(erro, req, res, next){

    if(erro instanceof requisicaoIncorreta){
        erro.enviarResposta(res);
    }else{
        new erroBase().enviarResposta(res);
    }
        

}
export default manipuladorDeErros;