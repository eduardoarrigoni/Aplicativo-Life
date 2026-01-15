import jwt from 'jsonwebtoken';
import secret from '../config/chaveSecreta.js'
class VerificacaoToken {

    static validarToken = async (req, res, next) => {
        //headers: {
        //'Authorization': `Bearer ${token}`
        //}
        if(req.path === '/usuario/login' || req.path === '/usuario/cadastro'){
            return next();
        }
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token){
            res.status(401).json({
                message: "token não fornecido"
            });
        }

        const usuario = jwt.verify(token, secret.chave);
        
        req.usuario = usuario;
        next();

    }

}

export default VerificacaoToken;