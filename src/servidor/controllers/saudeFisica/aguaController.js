import connectDataBase from '../../config/dbConnect.js';
import erroBanco from '../../erros/erroBanco.js';

class AguaController{
    
    
    static adicionarSono = async (req, res, next) =>{
        
        try{
            
            const client = await connectDataBase();

            const sql = `INSERT INTO sono (idusuario, iniciosono, fimsono) VALUES (${req.usuario.idusuario}, '${req.iniciosono}', '${req.fimsono}')`;

            const sonoArmazenado = await client.query(sql);

            res.status(200).json({
                message: "Registro de sono armazenado com sucesso"
            })
        }catch(erro){
            next(erro);
        }
    }

    static todosSonos = async (req, res, next) => {
        try{
            const client = await connectDataBase();
            const sql = `SELECT iniciosono, fimsono FROM sono WHERE idusuario = ${req.usuario.idusuario}`;

            const sonos = await client.query(sql);

            res.status(200).json(sonos.rows);
        }catch(erro){
            if(erro.code){
                throw new erroBanco(erro.code);       
            }
            next(erro);
        }
    }

    static deletarSonoId = async (req, res, next) => {

        try{
            
            const client = await connectDataBase();

            const sql = `DELETE FROM sono WHERE idsono = '${req.params.id}'`;
            
            const deletado = await client.query(sql);

            res.status(200).json({
                message: "Sono excluido com sucesso",
                sono: deletado.rows[0]
            });


        }catch(erro){
            next(erro);
        }
    }
    

    
};

export default SonoController;