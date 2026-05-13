// ======================== IMPORTS ========================

// Importa o framework Express, utilizado para criar a API (rotas, servidor, etc.)
const express       = require('express')

// Importa o CORS, que permite controlar quais origens podem acessar a API
const cors          = require('cors')

// Importa o body-parser, utilizado para interpretar dados enviados no corpo da requisição (body)
const bodyParser    = require('body-parser')


// ======================== CONTROLLER ========================

// Importa a controller de filmes, responsável pelas regras de negócio dos filmes
const controllerFilme = require('./controller/filme/controller_filmes.js')

// Importa a controller de personagens, responsável pelas regras de negócio dos personagens
const controllerPersonagem = require('./controller/personagem/controller_personagem.js')


// ======================== CONFIG BODY ========================

// Middleware que permite que a API entenda requisições com JSON no body
const bodyParserJSON = bodyParser.json()


// ======================== APP ========================

// Cria a aplicação principal do Express
const app =  express()


// ======================== CONFIG CORS ========================

// Configura quais origens, métodos e headers podem acessar a API
const corsOptions = {
    origin: ['*'], // Permite qualquer origem acessar a API
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Métodos HTTP permitidos
    allowedHeaders: ['content-type', 'autorization'] // Headers permitidos (obs: "authorization" está escrito errado)
}

// Aplica o middleware de CORS na aplicação
app.use(cors(corsOptions))


// ======================== ENDPOINT: INSERT ========================

// Rota para inserir um novo filme
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(req, res){

    // Dados enviados pelo cliente no corpo da requisição
    let dados = req.body
 
    // Tipo de conteúdo da requisição (ex: application/json)
    let contentType = req.headers['content-type']

    // Envia os dados para a controller processar (validar + inserir)
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    // Define o status da resposta HTTP
    res.status(result.status_code)

    // Retorna o resultado em JSON
    res.json(result)
})


// ======================== ENDPOINT: SELECT ALL ========================

// Rota para listar todos os filmes
app.get('/v1/senai/locadora/lista/filme', async function(req, res) {

    // Busca todos os filmes na controller
    let result = await controllerFilme.listaFilme()

    // Define o status HTTP
    res.status(result.status_code)

    // Retorna os dados
    res.json(result)
    
})


// ======================== ENDPOINT: SELECT BY ID ========================

// Rota para buscar um filme pelo ID
app.get('/v1/senai/locadora/filme/:id', async function(req, res) {

    // Pega o ID da URL
    let id = req.params.id
    
    // Busca o filme na controller
    let result = await controllerFilme.buscarFilme(id)

    // Define o status HTTP
    res.status(result.status_code)

    // Retorna o resultado
    res.json(result)
    
})


// ======================== ENDPOINT: UPDATE ========================

// Rota para atualizar um filme existente
app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(req, res) {

    // Tipo de conteúdo enviado na requisição
    let contentType = req.headers['content-type']

    // ID do filme que será atualizado
    let id = req.params.id

    // Novos dados enviados no body
    let dados = req.body

    // Chama a controller para atualizar o filme
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    // Define o status HTTP
    res.status(result.status_code)

    // Retorna a resposta
    res.json(result)
})


// ======================== ENDPOINT: DELETE ========================

// Rota para deletar um filme pelo ID
app.delete('/v1/senai/locadora/lista/filme/:id', async function(req, res) {

    // Captura o ID da URL
    let id = req.params.id

    // Chama a controller para excluir o filme
    let result = await controllerFilme.deletarFilme(id)

    // Define o status HTTP
    res.status(result.status_code)

    // Retorna o resultado
    res.json(result)
})


// ======================== ENDPOINT: INSERT PERSONAGEM ========================

// Rota para inserir um novo personagem
app.post('/v1/senai/locadora/filme/personagem', bodyParserJSON, async function(req, res){

    // Dados enviados no body
    let dados = req.body
 
    // Content-Type da requisição
    let contentType = req.headers['content-type']

    // Envia para a controller inserir o personagem
    let result = await controllerPersonagem.inserirNovoPersonagem(dados, contentType)

    // Status HTTP
    res.status(result.status_code)

    // Retorno JSON
    res.json(result)
})


// ======================== ENDPOINT: SELECT PERSONAGEM BY ID ========================

// Rota para buscar um personagem pelo ID
app.get('/v1/senai/locadora/filme/personagem/:id', async function(req, res) {

    // ID da URL
    let id = req.params.id
    
    // Busca personagem
    let result = await controllerPersonagem.buscarPersonagem(id)

    // Status HTTP
    res.status(result.status_code)

    // Retorno
    res.json(result)
    
})


// ======================== ENDPOINT: DELETE PERSONAGEM ========================

// Rota para deletar um personagem
app.delete('/v1/senai/locadora/lista/filme/personagem/deletar/:id', async function(req, res) {

    // ID do personagem
    let id = req.params.id

    // Chama a controller para excluir
    let result = await controllerPersonagem.excluirPersonagem(id)

    // Status HTTP
    res.status(result.status_code)

    // Retorno
    res.json(result)
})


// ======================== ENDPOINT: LIST PERSONAGENS ========================

// Rota para listar todos os personagens
app.get('/v1/senai/locadora/lista/filme/personagem', async function(req, res) {

    // Busca todos os personagens
    let result = await controllerPersonagem.listarPersonagens()

    // Status HTTP
    res.status(result.status_code)

    // Retorna os dados
    res.json(result)
    
})

app.put('/v1/senai/locadora/filme/personagem/atualizar/:id', bodyParserJSON, async function(req, res) {

    // Tipo de conteúdo enviado na requisição
    let contentType = req.headers['content-type']

    // ID do filme que será atualizado
    let id = req.params.id

    // Novos dados enviados no body
    let dados = req.body

    // Chama a controller para atualizar o filme
    let result = await controllerPersonagem.atualizarPersonagem(dados, id, contentType)

    // Define o status HTTP
    res.status(result.status_code)

    // Retorna a resposta
    res.json(result)
})


// ======================== SERVER ========================

// Inicia o servidor na porta 8080
app.listen(8080, function(){

    // Mensagem exibida no console quando a API inicia
    console.log('arquivo pronto')
})