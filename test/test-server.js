global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function(){
	before(function(done){
		server.runServer(function(){

			Item.create(
				// How do I access these and change them if I don't
				// know their id??
				{name: 'Beans'},
				{name: 'Peppers'},
				{name: 'Carrots'},
				function(){
					done();
				});
		});
	});

	it('should list items on get', function(done){
    	chai.request(app)
    	.get('/items')
    	.end(function(err, res){
    		res.should.have.status(200);
            res.should.be.json;
            res.body.length.should.equal(3);
            res.body.should.be.a('array');
            done();
    	});
    });
    it('should add an item on post', function(done){
        chai.request(app)
        .post('/items')
        .send({name: 'Kale'})
        .end(function(err, res){
            should.equal(err, null);
            res.should.have.status(201);
            res.should.be.json;
            done();
        });
    });
    it('should edit an item on put',function(done){
        chai.request(app)
        .put('/items/:id')
        .send({name: 'Cucumber'})
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            done();
        });
    });
    it('should delete an item on DELETE', function(done) {
      var id;
      chai.request(app)
          .get('/items')
          .end(function(err, res) {
            id = res.body[0]._id;
            chai.request(app)
                .delete('/items/' + id)
                .send({'_id': id})
                .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(200);
                  chai.request(app)
                      .get('/items')
                      .end(function(err,res) {
                        res.body.should.have.length(3);
                        done();
                      });
                });

          });
    });

	after(function(done){
		Item.remove(function(){
				done();
		});		
	});
});