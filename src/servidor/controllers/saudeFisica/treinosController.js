import connectDataBase from "../../config/dbConnect.js";
import erroBanco from "../../erros/erroBanco.js";
import treinoService from "../../services/treinoService.js";
import ControllerBase from "../controllerBase.ts"

class treinosController{

    static todostreinos = async (req, res, next) => {
        try{
            const client = await connectDataBase();
            const sql = `SELECT e.nome, e.caloriashora, t.tempo, t.data FROM treino t INNER JOIN exercicio e on(t.idexercicio = e.idexercicio) WHERE t.idusuario = ${req.usuario.idusuario}`;
            const treinos = await client.query(sql);
            res.status(200).json(treinos);
        }catch(erro){
            if(erro.code){
                throw new erroBanco(erro.code);       
            }
            next(erro);
        }
    }
    static novoTreino = async (req, res, next) => {

        //{
        //  authorization: bearer token
        //  nomeExercicio: 
        //  duracao: 44.4
        //  data: 1000.10.10
        //}
        try{
            const client = await connectDataBase();

            const service = await treinoService.novoTreino(req);

            const sql = `INSERT INTO treino (idexercicio, idusuario, duracao, data, caloriasgastas) 
                        VALUES ('${service.idexercicio}', '${service.idusuario}', '${service.duracao}', '${service.data}', '${service.caloriasgastas}')`;
            
            const treino = await client.query(sql);
            
            if(treino.rowCount > 0){
                res.status(201).json({
                    message: "Treino finalizado com sucesso"});
                
            }else{
                throw new erroBanco();
            }

        }catch(erro){
            next(erro);
        }

    }

    static deletarTreinoId = async (req, res, next) => {

        try{
            
            const client = await connectDataBase();

            const sql = `DELETE FROM treino WHERE idtreino = '${req.params.id}'`;
            
            const deletado = await client.query(sql);

            res.status(200).json({
                message: "Treino excluido com sucesso",
                treino: deletado.rows[0]
            })


        }catch(erro){
            next(erro);
        }
    }
    
        


}
export default treinosController;