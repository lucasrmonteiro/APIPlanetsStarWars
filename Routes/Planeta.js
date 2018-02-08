let mongoose = require('mongoose');
let Planeta = require('../model/planeta');


function getPlanetas(req ,res){

    let query = Planeta.find({});

    query.execute((err ,planetas) => {
        if(err){
            res.send(err);
        }else{
            res.json(planetas);
        }
    })
}

function getPlaneta(req ,res){
    query.findById(req.params.id ,(err ,planetas) => {
        if(err){
            res.send(err);
        }else{
            res.json(planetas);
        }
    })
}

function salvarPlaneta(req ,res){

    var novoPlaneta = new Planeta(req.body);

    novoPlaneta.save((err,planeta) => {
        if(err) {
            res.send(err);
        }
        else { 
            res.json({message: "Planeta successfully added!", planeta });
        }
    });

}

function deletePlaneta(req, res) {
    Planeta.remove({_id : req.params.id}, (err, result) => {
        res.json({ Planeta: "Book successfully deleted!", result });
    });
}


function getPlanetaByName(req ,res){
    Planetas.find({"Nome": req.body.Nome})((err ,planeta) => {
        if(err){
            res.send(err);
        }else{
            res.json(planeta);
        }
    })
}