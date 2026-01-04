import connectDataBase from '../config/dbConnect.js';
import erroValidacao from '../erros/erroValidacao.js';
import UsuarioService from '../services/usuarioService.js';
import usuarioService from '../services/usuarioService.js'

class UsuarioController{
    
    //usar api do google
    static loginUsuario = async (req, res, next) =>{
        //metodo de login local
        try{
            const { login, senha } = req.body;

            const retornoService = usuarioService.loginUsuario({ login, senha });

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

            const client = connectDataBase();
            const { nome, cpf, email, senha, dataNascimento} = req.body;

            const sql = `INSERT INTO usuario VALUES (${nome}, ${cpf}, ${email}, ${senha}, ${dataNascimento})`
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
            const client = connectDataBase();
            const alteracaoNecessaria = Object.entries(req.body);
            const { idUsuario } = UsuarioService.decodificarUsuario(req.body.token);
            const sql = `UPDATE usuario SET ${alteracaoNecessaria[0][0]} = ${alteracaoNecessaria[0][1]} WHERE idusuario = ${idUsuario}`;

            const resultado = client.query(sql);

            if(resultado.rowCount > 0 ){
                res.status(200).json({
                    message: "Dado atualizado com sucesso"
                })
            }

        }catch(erro){
            next(erro);
        }
    }

    
};

export default UsuarioController;