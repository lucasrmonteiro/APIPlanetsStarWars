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
        

    return router;
})();