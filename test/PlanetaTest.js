let mongoose = require("mongoose");
let PlanetaController = require('../Controller/PlanetaController');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);


describe('/GET Planeta', () => {
    it('it should GET all the planets', (done) => {
      chai.request(server)
          .get('/planetas')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
            done();
          });
    });
});
