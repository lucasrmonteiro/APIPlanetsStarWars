let mongoose = require('mongoose');
mongoose.set('debug', true);

let Schema = mongoose.Schema;

let PlanetaSchema = new Schema({
    Nome: { type: String, required: true },
    Clima: { type: String, required: true },
    Terreno: { type: String, required: true },
    QtdEmFilmes: { type: Number, required: true }
});

// PlanetaSchema.methods.validaModel = function validaModel(model){

//     var retorno = true;

//     if(model.Nome == "" || model.Nome == null || model.Nome == "null"){
//         retorno = false;
//     }else if(model.Clima == "" || model.Clima == null || model.Clima == "null"){
//         retorno = false;
//     }else if(model.Terreno == "" || model.Terreno == null || model.Terreno == "null"){
//         retorno = false;
//     }else if(!(parseInt(model.QtdEmFilmes) > 0)){
//         retorno = false;
//     }

//     return retorno;
// };



module.exports = mongoose.model('planeta', PlanetaSchema);