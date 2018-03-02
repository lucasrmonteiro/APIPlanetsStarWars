
const mensagemSucesso = "Operação Realizadda Com Sucesso";
const mensagemSucessoInsert = "Novo Planeta Criado Com Sucesso";
const mensagemSucessoDelete = "Planeta Excluido Criado Com Sucesso";
const mensagemErro = "Erro durante a Operação, Contate o Administrador do Sistema";

let defaultJson = {
    status:"",
    mensagem:"",
    data:""
};

module.exports = {
   
    getJsonSucessoDelete : function(data){
        defaultJson.data = data;
        defaultJson.mensagem = mensagemSucessoDelete;
        defaultJson.status = "200";
        
        return defaultJson;
    },
    getJsonSucessoInsert : function(data){
        defaultJson.data = data;
        defaultJson.mensagem = mensagemSucessoInsert;
        defaultJson.status = "200";
        
        return defaultJson;
    },
    getJsonSucesso : function(data){
        defaultJson.data = data;
        defaultJson.mensagem = mensagemSucesso;
        defaultJson.status = "200";
        
        return defaultJson;
    },
    getJsonError : function(data){
        defaultJson.data = data;
        defaultJson.mensagem = mensagemErro;
        defaultJson.status = "400";
    
        return defaultJson;
    }
};