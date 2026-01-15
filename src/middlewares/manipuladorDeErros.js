import erroBase from "../erros/erroBase.js";
import requisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import erroValidacao from "../erros/erroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import erroBanco from "../erros/erroBanco.js"

function manipuladorDeErros(erro, req, res, next){

    if(erro instanceof requisicaoIncorreta){
        erro.enviarResposta(res);
    }else if(erro instanceof erroBanco){
        console.error(erro);
        erro.enviarResposta(res)
    }else if(erro instanceof erroValidacao){
        erro.enviarResposta(res)
    }else{
        
    }
        

}
export default manipuladorDeErros;