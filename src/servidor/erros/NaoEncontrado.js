import erroBase from "./erroBase.js";

class NaoEncontrado extends erroBase{
    constructor(mensagem = "Página não encontrada"){
        super(mensagem, 404);        
    }
}

export default NaoEncontrado;