import jwt from 'jsonwebtoken';
import secret from '../config/chaveSecreta.js';
import connectDataBase from '../config/dbConnect.js';
import { compare } from 'bcryptjs';
import NaoEncontrado from '../erros/NaoEncontrado.js';
import erroValidacao from '../erros/erroValidacao.js';


class UsuarioService{

    static loginUsuario = async(info) => {
        try{
            const client = connectDataBase();
            let sql;
            if (info.login.includes('@')){

                sql = `SELECT idUsuario, senha FROM usuario WHERE email = ${info.login}`;
            }else{
                sql = `SELECT idUsuario, senha FROM usuario WHERE cpf = ${info.login}`;
            }

            //receber id do usuario e a senha
            const usuario = await client.query(sql);

            if(!usuario){
                throw new NaoEncontrado("Usuario nao cadastrado");
            }

            const senhasIguais = await compare(info.senha, usuario.rows[0].senha);

            if(!senhasIguais){
               throw new erroValidacao("Usuario ou senha incorreto");
            }
            
            const tokenAcesso = this.atualizarToken(usuario.rows[0].idUsuario, info.login)

            return { tokenAcesso }

        }catch(erro){
            throw erro;
        }
    }

    static atualizarToken = async(idUsuario, login) => {
        
        const novoToken = jwt.sign({
            idUsuario: idUsuario,
            login: login
        }, secret.chave, {
            expiresIn: 3600
        });

        return novoToken;

    }
    
}

export default UsuarioService;