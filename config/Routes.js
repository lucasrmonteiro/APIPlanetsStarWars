var express = require('express');
var Planeta = require('../Controller/PlanetaController');

module.exports =  (function(){

    var router = express.Router();

    // //Middleware 
    // router.use(function(req, res, next) {
    //     if(req.body.status == "200"){
    //         next(); 
    //     }else{
    //         Console.log("Error :" + req.body.toString())
    //         next();
    //     }
    // });
    router.route('/planetas').get(function(req ,res){
        Planeta.getPlanetas(req ,res);
    });
    
});