import connectDataBase from '../../config/dbConnect.js';
import erroBanco from '../../erros/erroBanco.js';
import requisicaoIncorreta from '../erros/requisicaoIncorreta.js';

class RefeicaoService{
    
    //{
    //  data: '1111.1.1',
    //  caloriasTotais: ,
    //  listaAlimentosId: {
    //      id: quantidade,
    //      id2: quantidade2    
    //  }
    //}
    static adicionarListaAlimentoRefeicao = async (req, idRefeicao) =>{
        
        try{
            
            const client = await connectDataBase();

            let idAlimento, quantidade;
            let sql = 'INSERT INTO listaalimentorefeicao (idalimento, idrefeicao, quantidadealimento) VALUES';
            const insercaoNecessaria = Object.entries(req.listaAlimentosId);
            for( [idAlimento, quantidade] of insercaoNecessaria ){
                
                sql += ` ( ${idAlimento}, ${idRefeicao}, ${quantidade} )`
                if(!insercaoNecessaria[insercaoNecessaria.length - 1].includes(idAlimento)){
                    sql += ',';
                }
            }

            const resultado = await client.query(sql);

            if(resultado.rowCount > 0){
                return true;
            }

            return false;
            
        }catch(erro){
            throw erro;
        }
    }

    static deletarListaAlimentoRefeicao = async (req, idRefeicao) => {

        try{
            const client = await connectDataBase();

            const sql = `DELETE FROM listaalimentorefeicao WHERE idrefeicao = ${idRefeicao}`;

            const deletado = await client.query(sql);

            if(deletado.rowCount > 0){
                return true;
            }else{
                throw new requisicaoIncorreta
            }

        }catch(erro){
            throw erro;
        }
    }


    
};

export default RefeicaoService;