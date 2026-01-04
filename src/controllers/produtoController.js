import {produto} from "../models/Produto.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
class ProdutoController{

    static listarProdutos = async (req, res, next) => {
        try{
            const listaProdutos = await produto.find({});
            res.status(200).json(listaProdutos);
        }catch(erro){

            next(erro);
        }
    };
    
    static encontrarProdutoId = async(req, res, next) => {
        try{
            const id = req.params.id;
            const produtoDesejado = await produto.findById(id);
            if(produtoDesejado !== null){
                res.status(200).json(produtoDesejado);
            }else{
                next(new NaoEncontrado("Produto não localizado."));
            }
        }catch(erro){

            next(erro);
        }
    }; 
    static cadastrarProduto = async (req, res, next) => {
        try{
            const novoProduto = await produto.create(req.body);
            res.status(201).json({ message: "criado com sucesso", cliente: novoProduto });

        }catch(erro){
            next(erro);
        }
    };

    static atualizarProdutoId = async (req, res, next) => {
        try{
            const id = req.params.id;
            const produtoDesejado = await produto.findByIdAndUpdate(id, req.body);

            if(produtoDesejado !== null){
                res.status(200).json({message: "Dados atualizados"});
            }else{
                next(new NaoEncontrado("Produto não localizado."));
            }
        }catch(erro){

            next(erro);
        }
    }; 

    static deletarProdutoId = async (req, res, next) => {
        try{
            const id = req.params.id;
            const produtoDesejado = await produto.findByIdAndDelete(id);
            if(produtoDesejado !== null){
                res.status(200).json({message: "Produto removido!"});
            }else{
                next(new NaoEncontrado("Produto não localizado."));
            }
        }catch(erro){

            next(erro);
        }
    };

};

export default ProdutoController;