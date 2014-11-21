'use strict'

var should = require('should'),
    app = require('../../main'),
    db = require('../../lib/datasources').MySQL,
    request = require('supertest'),
    USERNAME = 'rcruz',
    PASSWORD = 'pw',
    drinkData = {
      type: 'Whiskey',
      originCountry: 'Scotland',
      manufacturer: 'Oban',
      alcoholContent: 40
    };

describe('ROUTE /1/drinks', function () {

  beforeEach(function (done){
    db.resetTestData(done);
  });

  describe('POST /1/drinks', function() {
    it('should respond with failure JSON obj when request is unauthorized', function(done) {
      request(app)
        .post('/1/drinks')
        .send(drinkData)
        .expect(401)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return done(err);
          res.body.success.should.equal(false);
          done();
        });
    });

    it('should respond with successful JSON obj when a drink is added', function(done) {
      request(app)
        .post('/1/drinks')
        .auth(USERNAME, PASSWORD)
        .send(drinkData)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);
          res.body.success.should.equal(true);
          done();
        });
    });
  });

  describe('GET /1/drinks', function() {
    it('should respond with failure JSON object when request is unauthorized', function(done){
      request(app)
        .get('/1/drinks')
        .expect(401)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) return done(err);
          res.body.success.should.equal(false);
          done();
        });
    });

    it('should respond with success JSON object when request is authorized', function(done){
      request(app)
        .get('/1/drinks')
        .auth(USERNAME, PASSWORD)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);
          res.body.success.should.equal(true);
          res.body.data.should.be.instanceof(Array);
          res.body.data.length.should.be.equal(2);
          done();
        });
    });
  });

  describe('GET /1/drinks/:did', function() {
    it('should respond with failure JSON obj for unauthorized user', function(done) {
      request(app)
        .get('/1/drinks/1')
        .expect(401)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);
          res.body.success.should.equal(false);
          done();
        });
    });
    it('should respond with successful JSON obj when did exists', function(done) {
      request(app)
        .get('/1/drinks/1')
        .auth(USERNAME, PASSWORD)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);
          res.body.success.should.equal(true);
          res.body.data.should.be.type('object');
          done();
        });
    });
  })

  describe('PUT /1/drinks/:did', function() {
    it('should respond with failure JSON for unauthorized user', function(done) {
      request(app)
        .put('/1/drinks/1')
        .send({
          did: 1,
          name: 'Jim Beam'
        })
        .expect(401)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return done(err);
          res.body.success.should.equal(false);
          done();
        });
    });
    it('should respond with successful JSON obj when did exists', function(done) {
      request(app)
        .put('/1/drinks/1')
        .auth(USERNAME, PASSWORD)
        .send({
          did: 1,
          name: 'Jim Beam'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.success.should.equal(true);
          done();
        });
    });
    it('should respond with failed JSON obj when non-existent drink is updated', function(done) {
      request(app)
      .put('/1/drinks/3')
      .auth(USERNAME, PASSWORD)
      .send({})
      .expect(500)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.success.should.equal(false);
        done();
      });
    });
  });

  describe('DELETE /1/drinks:did', function() {

    it('should respond with failure JSON obj when request is unauthorized', function(done) {
      request(app)
      .delete('/1/drinks/1')
      .send({})
      .expect(401)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err) return done(err);
        res.body.success.should.equal(false);
        done();
      });
    });

    it('should respond with sucess JSON obj when drink is removed', function(done) {
      request(app)
      .delete('/1/drinks/1')
      .auth(USERNAME, PASSWORD)
      .send({})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.success.should.equal(true);
        done();
      });
    });

    it('should respond with failure JSON obj when nonexistent drink is removed', function(done) {
      request(app)
      .delete('/1/drinks/5')
      .auth(USERNAME, PASSWORD)
      .send({})
      .expect(500)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.success.should.equal(false);
        done();
      });
    });

  });
});
