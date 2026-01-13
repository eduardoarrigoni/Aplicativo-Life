import erroBase from "./erroBase.js";3

class erroBanco extends erroBase{

    constructor(codigoErro){
        super(`erro gerado pela requisicao ao banco. Codigo: ${codigoErro}`);
        this.codigo = codigoErro;
    }
}

export default erroBanco;