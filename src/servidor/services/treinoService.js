import connectDataBase from "../config/dbConnect.js"

class treinoService{

    static novoTreino = async (req) => {
        try{
            const client = await connectDataBase();

            const exercicio = await client.query(`SELECT idexercicio, caloriashora FROM exercicio WHERE nome = '${req.nomeExercicio}'`);

            const caloriasGastas = exercicio.rows[0].caloriashora * (req.duracao/60);
            const resultado = {
                idexercicio: exercicio.rows[0].idexercicio,
                idusuario: req.usuario.idusuario,
                duracao: req.duracao,
                data: req.data,
                caloriasgastas: caloriasGastas
            }

            return resultado;

        }catch(erro){
            throw erro;
        }
        
    }
}

export default treinoService;