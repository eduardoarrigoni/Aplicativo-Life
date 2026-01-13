import NaoEncontrado from "../../erros/NaoEncontrado.js";
import CalculoSuporte from "../CalculoSuporte.js";
import connectDataBase from "../../config/dbConnect.js";

class treinosController{

    static todostreinos = async (req, res, next) => {
        try{
            const client = await connectDataBase();
            const sql = `SELECT e.nome, e.caloriashora, t.tempo, t.data FROM treino t INNER JOIN exercicio e on(t.idexercicio = e.idexercicio) WHERE t.idusuario = ${req.usuario.idusuario}`;
            const treinos = await client.query(sql);
            res.status(200).json(treinos);
        }catch(erro){
            next(erro);
        }
    }
    static novoTreino = async (req, res, next) => {

        try{
            const client = await connectDataBase();

            
            
            res.status(201).json({message: "Treino finalizado com sucesso", treino});

        }catch(erro){
            next(erro);
        }

    }
    
    static treinosSemanais = async (req, res, next) => {

        try{
            
            const objetoTreinosSeparadosSemanas = {};
            const treinosSemana = await treinoUnico.find({});
            objetoTreinosSeparadosSemanas = treinosSemana.map( (treino) => {
                
                objetoTreinosSeparadosSemanas[treino.semanaAno].push(treino);

            })
            
            res.status(200).json(objetoTreinosSeparadosSemanas);
        }catch(erro){

            next(erro);
        }
    }

    static deletarTreinoId = async (req, res, next) => {

        try{
            const idTreino = req.params.id;
            const treinoDesejado = await treinoUnico.findByIdAndDelete(idTreino);

            if(treinoDesejado !== null){
                res.status(200).json({message: "Treino removido."});
            }else{
                next(new NaoEncontrado("Treino não encontrado."));
            }
        }catch(erro){
            next(erro);
        }
    }
        


}
export default treinosController;