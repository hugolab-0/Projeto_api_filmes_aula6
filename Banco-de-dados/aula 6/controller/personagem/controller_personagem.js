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
    let message = JSON.parse(JSON.stringify(message_config))

    if(personagem.nome == '' || personagem.nome == null || personagem.nome.length > 80 || personagem.nome == undefined) {
        message.ERROR_BAD_REQUEST.field =  '[NOME] INVALIDO'
        return message.ERROR_BAD_REQUEST
    }else {
        // Se passou por todas as validações, retorna false (sem erro)
        return false
    }
}

// Função para atualizar um personagem existente
const atualizarPersonagem = async function(personagem, id, contentType) {
    // função responsável por atualizar os dados de um personagem no banco
    let message = JSON.parse(JSON.stringify(message_config))
    
        try {
            
            // Verifica o content-type
            if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
    
                // Busca o filme pelo ID antes de atualizar
                let resultBuscarId = await buscarPersonagem(id)
    
                // Se encontrou o filme (status true)
                if(resultBuscarId.status) {
    
                    // Valida os novos dados enviados
                    let validar = await validarDados(personagem)
    
                    // Se não houver erro de validação
                    if(!validar) {
    
                        // Adiciona o ID ao objeto filme para enviar ao DAO
                        filme.id = id
    
                        // Chama o DAO para atualizar os dados no banco
                        let result = await personagemDAO.updateCharacter(personagem)
    
                        // Se atualizou com sucesso
                        if(result) {
                            message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATE_ITEM.status
                            message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATE_ITEM.status_code
                            message.DEFAULT_MESSAGE.message = message.SUCESS_UPDATE_ITEM.message
    
                            return message.DEFAULT_MESSAGE
                        }else {
                            // Erro no banco
                            return message.ERROR_INTERNAL_SERVER_MODEL
                        }
    
                    }else {
                        // Retorna erro de validação
                        return validar
                    }
    
                }else {
                    // Retorna erro da busca (filme não encontrado ou erro)
                    return resultBuscarId
                }
            }else {
                // Content-type inválido
                return message.ERROR_CONTENT_TYPE //415
            }
    
        } catch (error) {
            // Erro inesperado no controller
            return message.ERROR_INTERNAL_SERVER_CONTROLLER
            
        }

}

// Função para listar todos os personagens
const listarPersonagens = async function() {
    // função responsável por retornar todos os personagens cadastrados
    
        // Clona as mensagens
        let message = JSON.parse(JSON.stringify(message_config))
    
        try {
            let result = await personagemDAO.selectAllCharacter()
    
            // Verifica se houve retorno
            if(result) {
                if(result.length > 0) {
    
                    // Define status de sucesso
                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
    
                    // Define quantidade de registros encontrados
                    // OBS: este valor é sobrescrito na linha abaixo
                    message.DEFAULT_MESSAGE.response.result = result.length
    
                    // Define os dados retornados 
                    message.DEFAULT_MESSAGE.response.result = result
    
                    return message.DEFAULT_MESSAGE
    
                }else {
                    // Nenhum personagem encontrado
                    return message.ERROR_NOT_FOUND
                }
    
            }else {
                // Erro ao acessar o banco
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        } catch (error) {
            // Erro no controller
            return message.ERROR_INTERNAL_SERVER_CONTROLLER
        }
}

// Função para buscar um personagem específico
const buscarPersonagem = async function(id) {
    // função responsável por retornar um personagem pelo id ou outro parâmetro
    let message = JSON.parse(JSON.stringify(message_config))
    
        try {
            // Valida o ID recebido
            if(id == '' || id == null || id == undefined || isNaN(id)) {
    
                // Define qual campo está inválido
                message.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
    
                return message.ERROR_BAD_REQUEST //400
    
            }else{
                // Busca o filme no banco pelo ID
                let result = await personagemDAO.selectByIdCharacter(id)
    
                // Exibe no console para debug (visualizar retorno do banco)
                console.log(result)
    
                // Verifica se o DAO retornou algo
                if(result) {
                    if(result.length > 0) {
    
                        // Preenche resposta de sucesso
                        message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                        message.DEFAULT_MESSAGE.response.filme = result
    
                        return message.DEFAULT_MESSAGE
                    }else {
                        // Filme não encontrado
                        return message.ERROR_NOT_FOUND
                    }
                }else {
                    // Erro no banco
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
            
        } catch (error) {
            // Erro inesperado no controller
            return message.ERROR_INTERNAL_SERVER_CONTROLLER
        }
        
}

// Função para excluir um personagem
const excluirPersonagem = async function(id) {
    // função responsável por remover um personagem do banco de dados
     let message = JSON.parse(JSON.stringify(message_config))
    
          try {
    
            let resultValidarID= await buscarPersonagem(id)
    
            if(resultValidarID.status) {
    
                let result = await personagemDAO.deleteCharacter(id)
    
                if(result) {
                    message.DEFAULT_MESSAGE.status = message.SUCESS_DELETE_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_DELETE_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCESS_DELETE_ITEM.message
    
                    return message.DEFAULT_MESSAGE
                }else {
                    return message.ERROR_BAD_REQUEST
                }
    
            }else {
                return resultValidarID
            }
          } catch (error) {
            return false
          }
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