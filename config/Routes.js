let express = require('express');
let Planeta = require('../Controller/PlanetaController');

module.exports =  (function(){

    var router = express.Router();

    // //Middleware 
    // router.use(function(req, res, next) {
    //     if(res.body.status == "200"){
    //         next(); 
    //     }else{
    //         Console.log("Error :" + res.body.toString())
    //         next();
    //     }
    // });

    router.route('/planetas')
        .get(function(req,res){
            let json = Planeta.getPlanetas(req ,res);
            res.json(json);
        });


    router.route('/planeta:id')
        .get(function(req,res){
            let json = Planeta.getPlaneta(req ,res);

            res.json(json);
        });        
        
    router.route('/cargainicial')
        .get(function(req,res){
            let json = Planeta.cargaInicial();
            res.json(json);
        });          

    return router;
})();