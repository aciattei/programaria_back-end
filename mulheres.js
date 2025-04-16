const express = require("express"); //inicia o express
const router = express.Router(); //configura a primeira parte da rota

const app = express(); //inicia o app
app.use(express.json()); //
const porta = 3333; // cria a porta

const conectaBancoDeDados = require('./bancoDeDados'); //liga o banco de dados ao arquivo db.js
conectaBancoDeDados(); // chama a função que conecta o banco de dados

const cors = require('cors') //traz o pacote cors, que peremite cconsumir essa API no front-end
app.use(cors())

const Mulher = require('./mulherModel'); //

// PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
};

// GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find();

        response.json(mulheresVindasDoBancoDeDados);
    }

    catch (erro) {
        console.log(erro);
    }
};

// POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher ({
        imagem: request.body.imagem,
        nome: request.body.nome,
        descricao: request.body.descricao,
        citacao: request.body.citacao,
    });
    
    try {
        const mulherCriada = await novaMulher.save();
        response.status(201).json(mulherCriada);
    }
    catch(erro) {
        console.log(erro)
    }
};

// PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id); // encontra a mulher a partir do ID que vai ser passado na url

        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem; // altera informação da imagem com a informação iserida no copor da requisição
        }
    
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome; // altera informação do nome com a informação iserida no copor da requisição
        }
    
        if (request.body.descricao) {
            mulherEncontrada.descricao = request.body.descricao; // altera informação da descrição com a informação iserida no copor da requisição
        }
        
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao;
        }
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();
        response.json(mulherAtualizadaNoBancoDeDados);
    }

    catch (erro) {
        console.log(erro)
    }

};

// DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id);
        response.json({ mensagem: 'Mulher deletada com sucesso!'})
    }
    catch(erro) {
        console.log(erro);
    }
};

app.listen(porta, mostraPorta); //servidor ouvindo a porta
app.use(router.get('/mulheres', mostraMulheres)); //configuração da rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)); //configura rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)); //configura a rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)); //configura a rota DELETE /mulheres/:id