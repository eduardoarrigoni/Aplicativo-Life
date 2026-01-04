import mongoose, { mongo } from "mongoose";

const treinoUnicoSchema = new mongoose.Schema({
    
    id: { type: mongoose.Schema.Types.ObjectId },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'cliente', required: true},
    duracaoMinutos: { type: mongoose.Schema.Types.Int32, required: true},
    data: { type: Date, default: Date.now},
    diaSemana: { type: mongoose.Schema.Types.Int32, required: true },
    semanaAno: { type: mongoose.Schema.Types.Int32, required: true },
    tipoTreino: {
        type: String,
        enum: ['corrida', 'musculacao', 'bicicleta'],
        required: true
    }
}, {versionKey: false});

const treinoUnico = mongoose.model("treinoUnico", treinoUnicoSchema);

export {treinoUnico, treinoUnicoSchema};
