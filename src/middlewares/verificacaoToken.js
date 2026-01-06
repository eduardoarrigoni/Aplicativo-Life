import jwt from 'jsonwebtoken';
import secret from '../config/chaveSecreta.js'
class VerificacaoToken {

    static validarToken = async (req, res, next) => {
        //headers: {
        //'Authorization': `Bearer ${token}`
        //}
        const token = req.headers['Autorization'].split(' ')[1];

        if(!token){
            if(req.path === '/usuario/login' || req.path === '/usuario/cadastro'){
                next();
            }
            res.status(401).json({
                message: "token não fornecido"
            });
        }

        const usuario = await jwt.verify(token, secret.chave, (erro) => {

            if(erro){
                const mensagem = erro.name === 'TokenExpiredError' ? "Token expirado" : "Token inválido";
                res.status(403).json({
                    erro: mensagem
                });
            }
        });

        req.usuario = usuario;
        next();

    }

}

export default VerificacaoToken;