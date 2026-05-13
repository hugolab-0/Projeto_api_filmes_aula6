// Import do arquivo de padronização de mensagens (respostas padrão da aplicação)
const message_config = require('../modulo/configMensagens.js')


// Import do arquivo DAO para fazer o CRUD do personagem no banco de dados
const personagemDAO = require('../../model/DAO/personagem/personagem.js')


// =========================
// FUNÇÕES DE CRUD
// =========================

// Função para inserir um novo personagem no banco
const inserirNovoPersonagem = async function(personagem, contentType) {
    // função responsável por validar e enviar os dados para o DAO inserir no banco

    let message = JSON.parse(JSON.stringify(message_config))

     try {
           
           // Verifica se o tipo de conteúdo da requisição é JSON
           // Isso é importante para garantir que os dados estejam no formato correto
           if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
   
               // Chama a função de validação dos dados do personagem
               let validar = await validarDados(personagem)
   
               // Se a validação retornar algo, significa que houve erro
               if(validar) {
                   return validar
               }else{ 
                   // Se passou na validação, envia os dados para o DAO inserir no banco
                   let result = await personagemDAO.insertCharacter(personagem)
   
                   
   
                   // Se o DAO retornou sucesso
                   if(result) { // 201 - criado com sucesso
                       message.DEFAULT_MESSAGE.status = message.SUCESS_INSERT_ITEM.status
                       message.DEFAULT_MESSAGE.status_code = message.SUCESS_INSERT_ITEM.status_code
                       message.DEFAULT_MESSAGE.message = message.SUCESS_INSERT_ITEM.message
                   }
                   else{ 
                       // Erro ao inserir no banco (camada model)
                       return  message.ERROR_INTERNAL_SERVER_MODEL
                   }
   
                   // Retorna a resposta padrão de sucesso
                   return message.DEFAULT_MESSAGE
               }
           }else {
               // Caso o content-type não seja JSON
               return message.ERROR_CONTENT_TYPE
           }
   
       } catch (error) {
           // Caso ocorra algum erro inesperado no controller
           return message.ERROR_INTERNAL_SERVER_CONTROLLER
       }
}

const validarDados = async function(personagem) {
    if(personagem.nome == '' || personagem.nome == null || personagem.nome.length > 80 || personagem.nome == undefined) {
        message.ERROR_BAD_REQUEST.field =  '[NOME] INVALIDO'
        return message.ERROR_BAD_REQUEST
    }else {
        // Se passou por todas as validações, retorna false (sem erro)
        return false
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