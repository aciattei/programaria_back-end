const express = require("express"); //inicia o express
const router = express.Router(); //configura a primeira parte da rota

const app = express(); //inicia o app
app.use(express.json()); //
const porta = 3333; // cria a porta

const { v4: uuidv4 } = require('uuid'); // cria id automaticamente

// cria lista inicial de mulheres
const mulheres = [
    {
        id: '1',
        imagem: "https://i.postimg.cc/8fS8KSGX/marielle-franco.png",
        nome: "Marielle Franco",
        descricao: "Marielle Francisco da Silva, conhecida como Marielle Franco, foi uma socióloga, feminista, militante dos direitos humanos e política brasileira. Filiada ao Partido Socialismo e Liberdade (PSOL), elegeu-se vereadora do Rio de Janeiro para a Legislatura 2017-2020, durante a eleição municipal de 2016, com a quinta maior votação. Crítica da intervenção federal no Rio de Janeiro e da Polícia Militar, denunciava constantemente abusos de autoridade por parte de policiais contra moradores de comunidades carentes. Em 14 de março de 2018, foi assassinada a tiros.",
        citacao: "Quantos mais vão precisar morrer para que essa guerra aos pobres acabe?"
    },
    {
        id: '2',
        imagem: "https://i.postimg.cc/2q1f3GTG/lelia-gonzalez.png",
        nome: "Lélia Gonzalez",
        descricao: "Lélia Gonzalez foi uma intelectual, política, professora e antropóloga brasileira. Ajudou a fundar instituições como o Movimento Negro Unificado (MNU), o Instituto de Pesquisas das Culturas Negras (IPCN), o Coletivo de Mulheres Negras N'Zinga e o Olodum. Sua militância em defesa da mulher negra levou-a ao Conselho Nacional dos Direitos da Mulher (CNDM), no qual atuou de 1985 a 1989. Foi candidata a deputada federal pelo PT, elegendo-se primeira suplente. Nas eleições seguintes, em 1986, candidatou-se a deputada estadual pelo PDT, novamente elegendo-se suplente.",
        citacao: "A gente não nasce negro, a gente se torna negro. É uma conquista dura, cruel e que se desenvolve pela vida da gente afora."
    },
    {
        id: '3',
        imagem: "https://i.postimg.cc/LJ6SF21r/angela-davis.png",
        nome: "Angela Davis",
        descricao: "Angela Yvonne Davis é uma professora e filósofa socialista estado-unidense que alcançou notoriedade mundial na década de 1970 como integrante do Partido Comunista dos Estados Unidos, dos Panteras Negras, por sua militância pelos direitos das mulheres e contra a discriminação social e racial nos Estados Unidos e por ser personagem de um dos mais polêmicos e famosos julgamentos criminais da recente história dos Estados Unidos.",
        citacao: "Não aceito mais as coisas que não posso mudar, estou mudando as coisas que não posso aceitar."
    },
    {
        id: '4',
        imagem: "https://i.postimg.cc/Z9XzNNMS/conceicao-evaristo.png",
        nome: "Conceição Evaristo",
        descricao: "Maria da Conceição Evaristo de Brito nasceu em Belo Horizonte, em 1946. De origem humilde, migrou para o Rio de Janeiro na década de 1970. Graduada em Letras pela UFRJ, trabalhou como professora da rede pública de ensino da capital fluminense. É Mestre em Literatura Brasileira pela PUC do Rio de Janeiro, com a dissertação Literatura Negra: uma poética de nossa afro-brasilidade (1996), e Doutora em Literatura Comparada na Universidade Federal Fluminense, com a tese Poemas malungos, cânticos irmãos (2011), na qual estuda as obras poéticas dos afro-brasileiros Nei Lopes e Edimilson de Almeida Pereira em confronto com a do angolano Agostinho Neto.",
        citacao: "O importante não é ser o primeiro ou primeira, o importante é abrir caminhos."
    },
    {
        id: '5',
        imagem: "https://i.postimg.cc/Fdc5VKMJ/carolina-de-jesus.png",
        nome: "Carolina de Jesus",
        descricao: "Carolina Maria de Jesus foi uma escritora brasileira, conhecida por seu livro Quarto de Despejo: Diário de uma Favelada publicado em 1960. Considerada uma das primeiras e mais importantes escritoras negras do Brasil. A autora viveu boa parte de sua vida na favela do Canindé, na zona norte de São Paulo, sustentando a si mesma e seus três filhos como catadora de papéis. Em 1958 tem seu diário publicado sob o nome Quarto de Despejo, com auxílio do jornalista Audálio Dantas. O livro fez um enorme sucesso e chegou a ser traduzido para quatorze línguas.",
        citacao: "Ah, comigo o mundo vai modificar-se. Não gosto do mundo como ele é."
    },
    {
        id: '6',
        imagem: "https://i.postimg.cc/K1q2Zw74/rosa-parks.png",
        nome: "Rosa Parks",
        descricao: "Rosa Louise McCauley, mais conhecida por Rosa Parks, foi uma costureira negra norte-americana, símbolo do movimento dos direitos civis dos negros nos Estados Unidos. Ficou famosa, em 1º de dezembro de 1955, por ter-se recusado frontalmente a ceder o seu lugar no ônibus a um branco, tornando-se o estopim do movimento que foi denominado boicote aos ônibus de Montgomery e posteriormente viria a marcar o início da luta antissegregacionista.",
        citacao: "Você nunca deve ter medo do que está fazendo quando está certo."
    }
]

// PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
}

// GET
function mostraMulheres(request, response) {
    response.json(mulheres);
}

// POST
function criaMulher(request, response) {
    const novaMulher = {
        id:uuidv4(),
        imagem: request.body.imagem,
        nome: request.body.nome,
        descricao: request.body.descricao,
        citacao: request.body.citacao,
    }
    mulheres.push(novaMulher);

    response.json(mulheres);
}

// PATCH
function corrigeMulher(request, response) {
    function encontraMulher(mulher) {
        if (mulher.id === request.params.id) {
            return mulher
        }
    }
    const mulherEncontrada = mulheres.find(encontraMulher);

    if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem;
    }

    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome;
    }

    if (request.body.descricao) {
        mulherEncontrada.descricao = request.body.descricao;
    }
    
    if (request.body.citacao) {
        mulherEncontrada.citacao = request.body.citacao;
    }

    response.json(mulheres);
}

// DELETE
function deletaMulher(request, response) {
    function todasMenosEla(mulher) {
        if (mulher.id !== request.params.id) {
            return mulher;
        }
    }
    const mulheresQueFicam = mulheres.filter(todasMenosEla);

    response.json(mulheresQueFicam);
}

app.listen(porta, mostraPorta); //servidor ouvindo a porta
app.use(router.get('/mulheres', mostraMulheres)); //configuração da rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)); //configura rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configura a rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //configura a rota DELETE /mulheres/:id