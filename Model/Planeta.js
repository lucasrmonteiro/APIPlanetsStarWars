let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PlanetaSchema = new Schema({
    Nome: { type: String, required: true },
    Clima: { type: String, required: true },
    Terreno: { type: String, required: true },
    QtdEmFilmes: { type: Int, required: true }
});

module.exports = mongoose.model('planeta', PlanetaSchema);