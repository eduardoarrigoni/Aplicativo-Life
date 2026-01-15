import erroBase from "./erroBase.js";3

class erroBanco extends erroBase{

    constructor(codigoErro = 0){
        super(`erro gerado pela requisicao ao banco. Codigo: ${codigoErro}`);
        this.codigo = codigoErro;
    }
}

export default erroBanco;