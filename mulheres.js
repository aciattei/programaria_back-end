//Importação de módulos e configurações iniciais
const express = require("express"); //Importa o framework Express para criar o servidor
const router = express.Router(); //Cria um objeto router para definir as rotas da aplicação

const app = express(); //Inicializa a aplicação Express
app.use(express.json()); //Habilita o middleware para parsear requisições no formato JSON
const porta = 3333; //Define a porta onde o servidor irá escutar

// Conexão com o banco de dados
const conectaBancoDeDados = require('./bancoDeDados'); //Importa o módulo de econxão com o banco de dados
conectaBancoDeDados(); //Estabelece a conexão com o banco de dados

//Configuração do CORS (Cross-Origin Resource Sharing)
const cors = require('cors') //Importa o pacote CORS para permitir requisições de diferentes origens
app.use(cors()) //Habilita o CORS para todas as rotas

//Modelo de dados
const Mulher = require('./mulherModel'); //Importa modelo Mongoose para a entidade Mulher

// PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
};

// GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find(); //Busca todas as mulheres no banco de dados

        response.json(mulheresVindasDoBancoDeDados); //Retorna a lista de mulheres em formato JSON
    }

    catch (erro) {
        console.log(erro); //Loga erros no console
        response.status(500).json({erro: 'Erro ao buscar mulheres' }); //Retorna erro 500 em caso de falha
    }
};

// POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher ({
        imagem: request.body.imagem,            //URL do caminho da imagem
        nome: request.body.nome,                //Nome da mulher
        descricao: request.body.descricao,      //Descrição/biogradia
        citacao: request.body.citacao,          //Citação famosa
    });
    
    try {
        const mulherCriada = await novaMulher.save(); //Peersiste a nova mulher no banco de dados
        response.status(201).json(mulherCriada); //Retorna a mulher criada com status 201 (Created)
    }
    catch(erro) {
        console.log(erro) //Loga os erros no console
        response.status(400).json({erro: 'Falha ao criar mulher'}); //Retorna erro 400 em caso de falha
    }
};

// PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id); //Busca mulher pelo ID

        //Atualiza apenas os campos que foram enviados no body da requisição
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem; //Atualiza a imagem com a informação iserida no corpo da requisição
        }
    
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome; //Atualiza o nome com a informação iserida no corpo da requisição
        }
    
        if (request.body.descricao) {
            mulherEncontrada.descricao = request.body.descricao; //Atualiza a descrição com a informação iserida no corpo da requisição
        }
        
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao;
        }
        
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save(); //Salva as alterações
        
        response.json(mulherAtualizadaNoBancoDeDados); //Retorna a mulher atualizada
    }

    catch (erro) {
        console.log(erro); //Loga erros no console
        response.status(400).json({erro: 'Falha ao atualizar mulher'}); //Retorna erro 400 em caso de falha
    }

};

// DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id); //Remove a mulher pelo ID
        response.json({ mensagem: 'Mulher deletada com sucesso!'}) //Retorna mensagem de sucesso
    }
    catch(erro) {
        console.log(erro); //Loga erros no console
        response.status(500).json({erro: 'Erro ao deletar mulher'}); //Retorna erro 500 em caso de falha
    }
};

//Configurações das rotas
app.use(router.get('/mulheres', mostraMulheres)); //Rota GET para listar todas as mulheres em /mulheres
app.use(router.post('/mulheres', criaMulher)); //Rota POST para criar uma nova mulher em /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)); //Rota PATCH para atualizar uma mulher existente em /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)); //Rota DELETE para remover uma mulher em /mulheres/:id

//Inicia o servidor
app.listen(porta, mostraPorta); //Coloca o servidor para escutar na porta especificada