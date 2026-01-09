import jwt from 'jsonwebtoken';
import secret from '../config/chaveSecreta.js';
import connectDataBase from '../config/dbConnect.js';
import { compare } from 'bcryptjs';
import NaoEncontrado from '../erros/NaoEncontrado.js';
import erroValidacao from '../erros/erroValidacao.js';


class UsuarioService{

    static loginUsuario = async(login, senha) => {
        try{
            const client = await connectDataBase();
            let sql;
            if (login.includes('@')){

                sql = `SELECT idusuario, senha FROM usuario WHERE email = '${login}'`;
            }else{
                sql = `SELECT idusuario, senha FROM usuario WHERE cpf = '${login}'`;
            }

            
            //receber id do usuario e a senha
            const usuario = await client.query(sql);
            
            console.log(usuario)
            if(!usuario){
                throw new NaoEncontrado("Usuario nao cadastrado");
            }
            const senhasIguais = this.verificarSenha(senha, usuario.rows[0].senha);
            
            if(!senhasIguais){
                throw new erroValidacao("Usuario ou senha incorreto");
            }
            
            const tokenAcesso = this.atualizarToken(usuario.rows[0].idusuario, login)

            return tokenAcesso 

        }catch(erro){
            throw erro;
        }
    }

    static atualizarToken = (idUsuario, login) => {
        
        const novoToken = jwt.sign({
            idusuario: idUsuario,
            login: login
        }, secret.chave, {
            expiresIn: 3600
        });

        return novoToken;

    }

    static verificarSenha = (senhaReq, senhaBanco) => {
        return senhaReq === senhaBanco;
    }
    
}

export default UsuarioService;