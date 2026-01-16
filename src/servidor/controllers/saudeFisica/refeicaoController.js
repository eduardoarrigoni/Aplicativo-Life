import connectDataBase from '../../config/dbConnect.js';
import erroBanco from '../../erros/erroBanco.js';
import requisicaoIncorreta from '../../erros/requisicaoIncorreta.js';
import RefeicaoService from '../../services/refeicaoService.js';

class RefeicaoController{
    
    //{
    //  data: '1111.1.1',
    //  caloriasTotais: ,
    //  listaAlimentosId: {
    //      id: quantidade,
    //      id2: quantidade2    
    //  }
    //}
    static adicionarRefeicao = async (req, res, next) =>{
        
        try{
            
            const client = await connectDataBase();

            const sql = `INSERT INTO refeicao (idusuario, data, caloriasTotais) VALUES (${req.usuario.idusuario}, '${req.data}', '${req.caloriasTotais}') RETURNING idrefeicao`;

            const idRefeicao = await client.query(sql);
            const organizaBanco = await RefeicaoService.adicionarListaAlimentoRefeicao(req, idRefeicao.rows[0].idrefeicao);

            if(organizaBanco){
                
                res.status(200).json({
                    message: "Registro de refeição armazenado com sucesso"
                })
            }else{
                throw new erroBanco;
            }
        }catch(erro){
            next(erro);
        }
    }

    static todasRefeicoes = async (req, res, next) => {
        try{
            const client = await connectDataBase();
            const sql = `SELECT 
                            r.idrefeicao, 
                            r.data, 
                            l.idalimento AS id_alimento, 
                            l.quantidadealimento,
                            r.caloriastotais
                        FROM refeicao r
                        INNER JOIN listaalimentorefeicao l ON r.idrefeicao = l.idrefeicao
                        ORDER BY r.idrefeicao`;


            const refeicoes = await client.query(sql);

            res.status(200).json(refeicoes.rows);
        }catch(erro){
            if(erro.code){
                throw new erroBanco(erro.code);       
            }
            next(erro);
        }
    }

    static deletarRefeicaoId = async (req, res, next) => {

        try{
            
            const client = await connectDataBase();

            const deletarListaAlimentos = await RefeicaoService.deletarListaAlimentoRefeicao(req, req.params.id);

            if(deletarListaAlimentos){

                const sql = `DELETE FROM refeicao WHERE idrefeicao = '${req.params.id}'`;
                
                const deletado = await client.query(sql);
                
                if(deletado.rowCount > 0){
                    res.status(200).json({
                        message: "Refeicao excluida com sucesso",
                        refeicao: deletado.rows[0]
                    });
                }else{
                    throw new requisicaoIncorreta
                }
            }

        }catch(erro){
            next(erro);
        }
    }
    

    
};

export default RefeicaoController;