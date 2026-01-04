import { sign, decode } from 'jsonwebtoken';
import secret from '../config/chaveSecreta.js';
import connectDataBase from '../config/dbConnect.js';
import { compare } from 'bcryptjs';
import NaoEncontrado from '../erros/NaoEncontrado.js';
import erroValidacao from '../erros/erroValidacao.js';

class UsuarioService{

    static loginUsuario = async(info) => {
        try{
            const client = connectDataBase();

            const sql = `SELECT idUsuario, senha FROM usuario WHERE login = ${info.login}`;

            //receber id do usuario e a senha
            const usuario = await client.query(sql);

            if(!usuario){
                throw new NaoEncontrado("Usuario nao cadastrado");
            }

            const senhasIguais = compare(info.senha, usuario.senha);

            if(!senhasIguais){
               throw new erroValidacao("Usuario ou senha incorreto");
            }
            const tokenAcesso = sign({
                idUsuario: usuario.rows[0].idUsuario,
                login: info.login
            }, secret.chave, {
                expiresIn: 3600
            })

            return { tokenAcesso }

        }catch(erro){
            throw erro;
        }
    }

    static decodificarUsuario = async(token) => {

        const { idUsuario, login } = decode(token);

        return { idUsuario, login }
    }
}

export default UsuarioService;