import mongoose, {mongo} from "mongoose";

const produtoSchema = new mongoose.Schema({

    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: String, require: true},
    valor: {type: mongoose.Schema.Types.Double, require: true},
    fornecedor: {type: String, require: true}

}, {versionKey: false});

const produto = mongoose.model("produto", produtoSchema);

export {produto, produtoSchema};