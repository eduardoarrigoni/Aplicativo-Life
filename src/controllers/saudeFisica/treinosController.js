import NaoEncontrado from "../../erros/NaoEncontrado.js";
import { treinoUnico } from "../../models/TreinoUnico.js";
import CalculoSuporte from "../CalculoSuporte.js";
import connectDataBase from "../../config/dbConnect.js";

class treinosController{

    static todostreinos = async (req, res, next) => {
        try{
            const client = await connectDataBase();
            const sql = "SELECT "
            const treinos = client.query()
            res.status(200).json(treinos);
        }catch(erro){
            next(erro);
        }
    }
    static novoTreino = async (req, res, next) => {

        try{

            const tratandoTreino = req.body;
            const { data } = tratandoTreino;
            const dataReq = new Date;
            if(data) dataReq = data;
            
            const diaDaSemana = CalculoSuporte.diaSemana(dataReq);
            const semanaDoAno = CalculoSuporte.semanaAno(dataReq);
            
            tratandoTreino.diaSemana = diaDaSemana;
            tratandoTreino.semanaAno = semanaDoAno;
            const treino = await treinoUnico.create(tratandoTreino);
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
export default treinoUnicoController;