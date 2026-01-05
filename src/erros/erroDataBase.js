import erroBase from "./erroBase.js";

class ErroDataBase extends erroBase{

    constructor(){
        super("erro na interação com o banco de dados", 502);
    }
}

export default ErroDataBase;