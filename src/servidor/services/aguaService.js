import connectDataBase from '../../config/dbConnect.js';
import erroBanco from '../../erros/erroBanco.js';

class AguaService{
    
    
    static adicionarQuantidadeAguaDiaria = async (req) =>{
        
        try{
            
            const client = await connectDataBase();

            let sql = `SELECT idingestaoagua FROM ingestaoagua WHERE data = CURRENT_DATE`;
            
            const idDiaAtual = await client.query(sql);

            if(idDiaAtual.rows > 0){
                sql = `UPDATE ingestaoagua SET quantidadediaria = quantidadediaria + ${req.quantidade} WHERE idingestaoagua = ${idDiaAtual.rows[0].idingestaoagua}`
            }else{
                sql = `INSERT INTO ingestaoagua (idusuario, data, quantidadediaria) VALUES (${req.usuario.idusuario}, '${req.data}', ${req.quantidade} )`
            }

            return sql;
        }catch(erro){
            throw erro;
        }
    }
}

export default AguaService;