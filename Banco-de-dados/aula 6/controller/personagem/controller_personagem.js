// Import do arquivo de padronização de mensagens (respostas padrão da aplicação)
const message_config = require('../modulo/configMessages.js')

// Import do arquivo DAO para fazer o CRUD do personagem no banco de dados
const personagemDAO = require('../../model/DAO/personagem/personagem.js')


// =========================
// FUNÇÕES DE CRUD
// =========================

// Função para inserir um novo personagem no banco
const inserirNovoPersonagem = async function(personagem, contentType) {
    // função responsável por validar e enviar os dados para o DAO inserir no banco

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
    } catch (error) {
        
    }
}

// Função para atualizar um personagem existente
const atualizarPersonagem = async function() {
    // função responsável por atualizar os dados de um personagem no banco
}

// Função para listar todos os personagens
const listarPersonagens = async function() {
    // função responsável por retornar todos os personagens cadastrados
}

// Função para buscar um personagem específico
const buscarPersonagem = async function() {
    // função responsável por retornar um personagem pelo id ou outro parâmetro
}

// Função para excluir um personagem
const excluirPersonagem = async function() {
    // função responsável por remover um personagem do banco de dados
}


// =========================
// EXPORTAÇÃO DAS FUNÇÕES
// =========================

// Exporta as funções para que possam ser utilizadas em outras partes do projeto
module.exports = {
    inserirNovoPersonagem,
    atualizarPersonagem,
    excluirPersonagem,
    buscarPersonagem,
    listarPersonagens
}