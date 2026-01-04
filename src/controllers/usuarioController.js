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

    
};

export default UsuarioController;