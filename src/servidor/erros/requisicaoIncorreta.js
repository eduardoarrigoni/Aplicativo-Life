import erroBase from "./erroBase.js";

class requisicaoIncorreta extends erroBase{

    constructor(){
        super("Um ou mais dados estão incorretos.", 400);
    }
}

export default requisicaoIncorreta;