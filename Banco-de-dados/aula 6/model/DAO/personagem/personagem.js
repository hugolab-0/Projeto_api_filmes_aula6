// Import da biblioteca knex, utilizada para facilitar a comunicação com o banco de dados MySQL
const knex = require('knex')

// Import do arquivo de configuração que contém as credenciais e parâmetros de conexão com o banco
const knexConfig = require('../../database_config_knex/knexFile.js')

// Cria a conexão com o banco de dados utilizando as configurações do ambiente "development"
const knexConex = knex(knexConfig.development)


// ======================== INSERT ========================
// Função responsável por inserir um novo registro (Character
//) na tabela tbl_Character
const insertCharacter = async function(Character){
    try {
        
        // Monta manualmente a instrução SQL de INSERT utilizando template string
        // Os dados do objeto "Character
        //" são inseridos diretamente na query
        let sql = `insert into tbl_personagem(nome)value(
										'${Character.nome}'
                                        );`


        // Executa o SQL diretamente no banco de dados
        // O "await" faz com que o código espere o banco responder antes de continuar
        let result = await knexConex.raw(sql)

        // Se houve retorno do banco, considera sucesso
        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        // Exibe o erro no console para debug
        console.log(error)
        // Retorna false indicando falha
        return false
    }
}


// ======================== UPDATE ========================
// Função responsável por atualizar os dados de um Character
// existente
const updateCharacter = async function(Character){

    try {
        // Monta o SQL de UPDATE com os novos dados do Character
    
        let sql = `update tbl_personagem set nome = '${Character.nome}' where id = '${Character.id}';` // atualiza sempre o ID 

        // Executa o SQL no banco
        let result = await knexConex.raw(sql)

        // Verifica retorno
        if(result) {
            return true
        }else{
            return false
        }
        
    } catch (error) {
        // Em caso de erro, retorna false
        return false
    }
   
}


// ======================== SELECT ALL ========================
// Função para buscar todos os Character
//s cadastrados no banco
const selectAllCharacter = async function(){
    try {
        // Query SQL para selecionar todos os registros da tabela
        // "order by id desc" ordena do maior ID para o menor (mais recente primeiro)
        let sql = `select * from tbl_personagem order by id desc;`

        // Executa a query no banco
        let result = await knexConex.raw(sql)
        
        // Verifica se o retorno é um array (formato esperado do knex)
        if(Array.isArray(result)){
            // O resultado real vem na posição [0]
            return result[0]
        }else{
            // Caso não seja array, considera erro
            return false
        }
    } catch (error) {
        // Em caso de erro, retorna false
        return false
    }
}


// ======================== SELECT BY ID ========================
// Função para buscar um Character
// específico pelo ID
const selectByIdCharacter = async function(id){
    try {
        // Query SQL para buscar um registro filtrando pelo ID
        let sql =  `select * from tbl_personagem where id=${id};`

        // Executa no banco
        let result = await knexConex.raw(sql)

        // Verifica se retornou array
        if(Array.isArray(result)) {
            return result[0]
        }else {
            return false
        }

    } catch (error) {
        // Em caso de erro, retorna false
        return false
    }
}


// ======================== DELETE ========================
// Função para deletar um Character
// pelo ID (ainda não implementada)
const deleteCharacter = async function(id){

    try {
    let sql =  `delete from tbl_personagem where id= ${id};`

    let result = await knexConex.raw(sql)
        if(result) {
            return true 
        }else {
            return false
        }
    } catch (error) {
        return false
    }


   
}


// Exporta todas as funções para serem utilizadas em outros arquivos (ex: controller)
module.exports = {
    insertCharacter
,
    updateCharacter
,
    selectAllCharacter
,
    selectByIdCharacter
,
    deleteCharacter

}