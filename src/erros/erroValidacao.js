import erroBase from "./erroBase.js";

class erroValidacao extends erroBase{
    constructor(message = "Erro de validação de dados"){
        super(message, 400);
    }
}

export default erroValidacao;