//============================================
// Config Server
//============================================
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let config = require('config');

mongoose.connect(config.DBHost);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

var router = require('./config/Routes');

app.use('/Planeta', router);

app.listen(port);
console.log("Listening on port " + port);
