
const mensagemSucesso = "Operação Realizadda Com Sucesso";
const mensagemErro = "Erro durante a Operação, Contate o Administrador do Sistema";

let defaultJson = {
    status:"",
    mensagem:"",
    data:""
};

module.exports = {
    
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