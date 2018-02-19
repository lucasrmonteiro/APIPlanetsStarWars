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

        Planeta.find(_paramsRequest ,(err,res) => {
            if(err){
                jsonRes = JsonData.getJsonError(err);
                res.json(jsonRes);
            }
        })
        .then((planets) => {
            if(planets){
                jsonRes = JsonData.getJsonSucesso(planets);
            }else{
                jsonRes = JsonData.getJsonSucesso("Não Existem Dados no DB");
            };
            res.json(jsonRes);
        });
    },

    getPlanetaByName: function(req ,res){
        
        let jsonRes = "";
        let _paramsRequest = this.paramsRequestClean(this.paramsRequest);

        if(req.params.nome != undefined){
            _paramsRequest.Nome = req.params.nome;
        }
      
        Planeta.findOne(_paramsRequest ,(err,res) => {
            if(err){
                jsonRes = JsonData.getJsonError(err);
                res.json(jsonRes);
            }
        })
        .then((planets) => {
            if(planets){
                jsonRes = JsonData.getJsonSucesso(planets);
            }else{
                jsonRes = JsonData.getJsonSucesso("Não Existem Dados no DB");
            };
            res.json(jsonRes);
        });

    },

    salvarPlaneta: function(req ,res){

        let jsonRes = "";
        let novoPlaneta = new Planeta(req.body);
    
        novoPlaneta.save((err,planeta) => {
            if(err) {
                jsonRes = JsonData.getJsonError(err);
                res.json(jsonRes);
            }
            else { 
                jsonRes = JsonData.getJsonSucesso(planets);
                res.json(jsonRes);
            }
        });
    },
    deletePlaneta: function(req, res) {
        Planeta.remove({_id : req.params.id}, (err, result) => {
            res.json({ Planeta: "Book successfully deleted!", result });
        });
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
                            //if(Planeta.validaModel(planeta)){
                                planeta.save();
                            //}
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




