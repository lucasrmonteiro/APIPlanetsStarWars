let mongoose = require('mongoose');
let Planeta = require('../Model/planeta');
let JsonData = require('../Model/Data');

let starWarsAPI ={
    host: "swapi.co",
    port: 443,
    path:"/api/planets/",
    method: "GET"
};

module.exports = {

    getPlanetas : function(req ,res){

        let jsonRes = JsonData.getJsonSucesso("Não Existem Dados no DB");

        let query = Planeta.find({});

        query.exec(function(err,planetas){
          
            if(err){
                jsonRes = JsonData.getJsonError(err);
            }else{
                jsonRes = JsonData.getJsonSucesso(planetas);
            }

            return jsonRes;
        });

        // Planeta.find((err,planeta) => {
            
        //     if(err){
        //         jsonRes = JsonData.getJsonError(res.send(err));
        //     }else{
        //         jsonRes = JsonData.getJsonSucesso(res.json(planeta));
        //     }
        // });
    },

    getPlaneta : function(req ,res){
        
        let jsonRes = "";

        query.findById(req.params.id ,(err ,planetas) => {
            if(err){
                jsonRes =  JsonData.getJsonError(res.send(err));
            }else{
                jsonRes = JsonData.getJsonSucesso(res.json(planetas));
            }
        });

        return jsonRes;
    },
    salvarPlaneta: function(req ,res){

        var novoPlaneta = new Planeta(req.body);
    
        novoPlaneta.save((err,planeta) => {
            if(err) {
                res.send(err);
            }
            else { 
                res.json({message: "Planeta successfully added!", planeta });
            }
        });
    },
    deletePlaneta: function(req, res) {
        Planeta.remove({_id : req.params.id}, (err, result) => {
            res.json({ Planeta: "Book successfully deleted!", result });
        });
    },
    getPlanetaByName: function(req ,res){
        Planetas.find({"Nome": req.body.Nome})((err ,planeta) => {
            if(err){
                res.send(err);
            }else{
                res.json(planeta);
            }
        })
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




