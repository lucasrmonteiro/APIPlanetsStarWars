let mongoose = require('mongoose');
mongoose.set('debug', true);

let Schema = mongoose.Schema;

let PlanetaSchema = new Schema({
    Nome: { type: String, required: true },
    Clima: { type: String, required: true },
    Terreno: { type: String, required: true },
    QtdEmFilmes: { type: Number, required: false }
});

module.exports = mongoose.model('planeta', PlanetaSchema);