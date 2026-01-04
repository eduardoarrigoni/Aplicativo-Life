class erroBase extends Error{

    constructor(mensagem = "Erro interno", status = 500){
        super();
        this.message = mensagem;
        this.status = status;
    }

    enviarResposta(res){
        res.status(this.status).send({
            mensagem: this.message,
            status: this.status
        });
    }
}

export default erroBase;