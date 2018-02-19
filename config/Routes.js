let express = require('express');
let PlanetaController = require('../Controller/PlanetaController');

module.exports =  (function(){

    let router = express.Router();

    // //Middleware 
    router.use(function(req, res, next) {
        console.log('Middleware');
        next();
    });

    router.route('/planetas').get((req,res) =>{
        PlanetaController.getPlanetas(req,res);
    });

    router.route('/planetas/:id').get((req,res) =>{
        PlanetaController.getPlanetas(req,res);
    });
 
    router.route('/planetanome/:nome').get((req,res) =>{
        PlanetaController.getPlanetaByName(req,res);
    });
 
    router.route('/novoplaneta').post((req,res) =>{
        if(PlanetaController.validaModel(req.body)){
            PlanetaController.salvarPlaneta(req,res);
        }else{
            res.json("Dados Enviados Inválidos");
        }
    });
 
        

    return router;
})();