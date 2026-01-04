import mongoose, {mongo} from "mongoose";

const vendaSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'cliente', require: true},
    valorTotal: {type: mongoose.Schema.Types.Double, require: true},
    itens: {type: Array, require: true}
    
}, {versionKey: false});

const venda = mongoose.model("venda", vendaSchema);

export default venda;