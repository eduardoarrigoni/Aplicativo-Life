import mongoose, { mongo } from "mongoose";

const clienteSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    cpf: { type: String, required: true},
    dataCadastro: { type: Date, default: Date.now},
    nome: { type: String, required: true },
    dataNascimento: { type: Date, required: true},
    //alterar o tipo da senha para um tipo mais específico
    senha: { type: String, required: true}
}, { versionKey: false});

const cliente = mongoose.model("clientes", clienteSchema);

export {cliente, clienteSchema};