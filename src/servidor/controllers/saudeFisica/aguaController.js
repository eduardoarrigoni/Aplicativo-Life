import connectDataBase from '../../config/dbConnect.js';
import erroBanco from '../../erros/erroBanco.js';
import AguaService from '../../services/aguaService.js';

class AguaController{
    
    
    static adicionarQuantidadeAguaDiaria = async (req, res, next) =>{
        
        try{
            
            const client = await connectDataBase();

            const sql = await AguaService.adicionarQuantidadeAguaDiaria(req);

            const registro = await client.query(sql);

            res.status(200).json({
                message: "Registro de ingestão de água adicionado com sucesso"
            })
        }catch(erro){
            next(erro);
        }
    }

    static todosRegistros = async (req, res, next) => {
        try{
            const client = await connectDataBase();
            const sql = `SELECT data, quantidadediaria FROM ingestaoagua WHERE idusuario = ${req.usuario.idusuario}`;

            const registros = await client.query(sql);

            res.status(200).json(registros.rows);
        }catch(erro){
            if(erro.code){
                throw new erroBanco(erro.code);       
            }
            next(erro);
        }
    }

    static deletarIngestaoId = async (req, res, next) => {

        try{
            
            const client = await connectDataBase();

            const sql = `DELETE FROM ingestaoagua WHERE idingestaoagua = '${req.params.id}'`;
            
            const deletado = await client.query(sql);

            res.status(200).json({
                message: "Registro excluido com sucesso",
                registro: deletado.rows[0]
            });


        }catch(erro){
            next(erro);
        }
    }
    

    
};

export default AguaController;