import connectDataBase from '../config/dbConnect.js';
import erroBanco from '../erros/erroBanco.js';
import erroValidacao from '../erros/erroValidacao.js';
import usuarioService from '../services/usuarioService.js'

class UsuarioController{
    
    //usar api do google
    static loginUsuario = async (req, res, next) =>{
        //metodo de login local
        try{
            const { login, senha } = req.body;

            const retornoService = await usuarioService.loginUsuario(login, senha);

            res.status(200).json({
                message: "Login bem sucedido",
                tokenAcesso: retornoService
            });
        }catch(erro){
            next(erro);
        }
    }

    static cadastroUsuario = async (req, res, next) => {

        try{

            const client = await connectDataBase();
            const { cpf, email, nome, senha, datanascimento} = req.body;

            const sql = `INSERT INTO usuario (cpf, email, nome, senha, datanascimento, datacadastro) VALUES ('${cpf}', '${email}', '${nome}', '${senha}', '${datanascimento}', NOW())`;
            
            const resultado = await client.query(sql);
            
            if(resultado.rowCount > 0){
                res.status(200).json({
                    message: "Cadastro realizado com sucesso"
                })
            }else{
                throw new erroValidacao("Cadastro mal sucedido")
            }
        }catch(erro){
            next(erro);
        }
    }

    static atualizarDadosUsuario = async (req, res, next) => {

        try{
            const client = await connectDataBase();
            
            const sql = await usuarioService.atualizarDadosUsuario(req);

            const resultado = await client.query(sql);

            if(resultado.rowCount > 0 ){
                res.status(200).json({
                    message: "Dado atualizado com sucesso"
                })
            }else{
                throw new erroBanco;
            }

        }catch(erro){
            next(erro);
        }
    }

    
};

export default UsuarioController;