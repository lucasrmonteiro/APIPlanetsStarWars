let mongoose = require('mongoose');
let Planeta = require('../Model/planeta');
let JsonData = require('../Model/Data');

module.exports = {

    getPlanetas : function(req ,res){

        let query = Planeta.find({});
    
        query.execute((err ,planetas) => {
            if(err){
                res.send(err);
            }else{
                res.json(planetas);
            }
        })
    },

    getPlaneta : function(req ,res){
        query.findById(req.params.id ,(err ,planetas) => {
            if(err){
                JsonData.getJsonError(res.send(err));
            }else{
                JsonData.getJsonSucesso(res.json(planetas));
            }
        })
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
    
            let doc = planeta.find({} ,'first');
    
            if(doc == ""){
                http.request(options ,function(res){
                    let result = res.result;
            
                    for(let planetJson in result){
                        let planeta = new Planeta();
                        planeta.Nome = planetJson.name;
                        planeta.Clima = planetJson.climate;
                        planeta.Terreno = planetJson.terrain;
                        planeta.QtdEmFilmes = planetJson.films.length;
                        if(planeta.validaModel(planeta)){
                            planeta.save();
                        }
                    }
                });   
            }else{
    
            }
        } catch (error) {
            console.log(error);
        }
    }

};




