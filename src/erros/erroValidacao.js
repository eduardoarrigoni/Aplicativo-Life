import erroBase from "./erroBase.js";

class erroValidacao extends erroBase{
    constructor(){
        super("Erro de validação de dados", 400);
    }
}

export default erroValidacao;