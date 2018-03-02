let mongoose = require('mongoose');
let Planeta = require('../Model/Planeta');
let JsonData = require('../Model/Data');

let starWarsAPI ={
    host: "swapi.co",
    port: 443,
    path:"/api/planets/",
    method: "GET"
};

module.exports = {

    paramsRequest : {},

    paramsRequestClean : function(paramsRequest){
        let objEmpty = {};
        paramsRequest = objEmpty;
        return paramsRequest;
    },

    getPlanetas : function(req ,res){

        let jsonRes = "";
        let _paramsRequest = this.paramsRequestClean(this.paramsRequest);

        if(req.params.id != undefined){
            _paramsRequest._id = req.params.id;
        }

        if(req.params.nome != undefined){
            _paramsRequest.Nome = req.params.nome;
        }

        Planeta.find(_paramsRequest)
            .then((planets) => {
                if(planets){
                    jsonRes = JsonData.getJsonSucesso(planets);
                }else{
                    jsonRes = JsonData.getJsonSucesso("Não Existem Dados no DB");
                };
                res.json(jsonRes);
            })
            .catch((err) =>{
                jsonRes = JsonData.getJsonError(err);
                res.json(jsonRes);
            });
    },

    getPlanetaByName: function(req ,res){
        
        let jsonRes = "";
        let _paramsRequest = this.paramsRequestClean(this.paramsRequest);

        if(req.params.nome != undefined){
            _paramsRequest.Nome = req.params.nome;
        }
      
        Planeta.findOne(_paramsRequest)
            .then((planets) => {
                if(planets){
                    jsonRes = JsonData.getJsonSucesso(planets);
                }else{
                    jsonRes = JsonData.getJsonSucesso("Não Existem Dados no DB");
                };
                res.json(jsonRes);
            })
            .catch((err) =>{
                jsonRes = JsonData.getJsonError(err);
                res.json(jsonRes);
            });

    },

    salvarPlaneta: function(req ,res){

        let jsonRes = "";
        let novoPlaneta = new Planeta(req.body);
    
        novoPlaneta.save((err) => {
            if(err){
                jsonRes = JsonData.getJsonError(err);
                res.json(jsonRes);
            }else{
                jsonRes = JsonData.getJsonSucessoInsert(novoPlaneta);
                res.json(jsonRes);
            }
        });
    },
    
    deletePlaneta: function(req, res) {

        let jsonRes = "";
        let _paramsRequest = this.paramsRequestClean(this.paramsRequest);

        if(req.body.id != undefined){
            _paramsRequest._id = req.body.id;

            Planeta.remove(_paramsRequest, (err) => {
                if(err){
                    jsonRes = JsonData.getJsonError(err);
                    res.json(jsonRes);
                }else{
                    jsonRes = JsonData.getJsonSucessoDelete();
                    res.json(jsonRes);
                }
            });
        }else{
            jsonRes = JsonData.getJsonError("Id do planeta não informado");
            res.json(jsonRes);
        }


    },

    validaModel:function(model){
        var retorno = true;

        if(model.Nome == "" || model.Nome == null || model.Nome == "null"){
            retorno = false;
        }else if(model.Clima == "" || model.Clima == null || model.Clima == "null"){
            retorno = false;
        }else if(model.Terreno == "" || model.Terreno == null || model.Terreno == "null"){
            retorno = false;
        }

        return retorno;
    },

    retonarMsgJsonErrado : function(message){
        return JsonData.getJsonError(message);
    },

    cargaInicial: function(){

        try {
    
            let query = Planeta.findOne('planeta');
            let jsonRes = "";
            let count = query.count;
            if(query.count.length == 2){
                let http = require('https');
                http.request(starWarsAPI ,function(res){
                    
                    let responseString = '';

                    res.on('data' ,function(result){
                        responseString += result;
                    });

                    res.on('end', function() {
                        
                        var responseObject = JSON.parse(responseString);
                        for(let i = 0; i < responseObject.results.length; i++){
                            let planetJson = responseObject.results[i];
                            let planeta = new Planeta();
                            planeta.Nome = planetJson.name;
                            planeta.Clima = planetJson.climate;
                            planeta.Terreno = planetJson.terrain;
                            planeta.QtdEmFilmes = planetJson.films.length;
                            if(this.validaModel(planeta)){
                                planeta.save();
                            }
                        }
                      });

                      jsonRes = JsonData.getJsonSucesso("Carga inicial concluida com sucesso.");
            
                }).end();   
            }else{
    
            }
        } catch (error) {
            console.log(error);
        }
    }

};




