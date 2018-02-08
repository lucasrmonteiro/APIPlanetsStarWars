
const mensagemSucesso = "Operação Realizadda Com Sucesso";
const mensagemErro = "Erro durante a Operação, Contate o Administrador do Sistema";

var defaultJson = {
    status:"",
    mensagem:"",
    data:""
}

var classe = function() {

    this.getJsonSucesso = function(data){
        defaultJson.data = data;
        defaultJson.mensagem = mensagemSucesso;
        defaultJson.status = "200";
    
        return defaultJson;
    },
    this.getJsonError = function(data){
        defaultJson.data = data;
        defaultJson.mensagem = mensagemErro;
        defaultJson.status = "400";
    
        return defaultJson;
    }

}

module.exports = classe;