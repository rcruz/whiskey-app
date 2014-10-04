'use strict';

var should = require('should'),
    app = require('../..//main'),
    db = require('../../lib/datasources').MySQL,
    request = require('supertest'),
    USERNAME = 'rcruz',
    PASSWORD = 'pw';

describe('ROUTE /1/drinkreviews', function () {

    beforeEach(function (done) {
        db.resetTestData(done);
    });

    describe('POST /1/drinkreviews', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .post('/1/drinkreviews')
            .send({
                uid: "rcruz",
                did: 2,
                rating: 70
            })
            .expect(401)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                done();
            });
        });

        it('should respond with successful JSON obj when model is added', function(done) {
            request(app)
            .post('/1/drinkreviews')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "rcruz",
                did: 2,
                rating: 70
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(true);
                done();
            });
        });

        it('should respond with failed JSON obj when duplicate model is added', function(done) {
            request(app)
            .post('/1/drinkreviews')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "rcruz",
                did: 1,
                rating: 70
            })
            .expect(500)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                done();
            });
        });
    });

    describe('GET /1/drinkreviews', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .get('/1/drinkreviews')
            .expect(401)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                done();
            });
        });

        it('should respond with successful JSON obj when model exists', function(done) {
            request(app)
            .get('/1/drinkreviews')
            .auth(USERNAME, PASSWORD)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(true);
                res.body.data.should.be.instanceof(Array);
                res.body.data.length.should.be.equal(1);
                done();
            });
        });

    });

    describe('GET /1/drinkreviews/:drid', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .get('/1/drinkreviews/1')
            .expect(401)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                done();
            });
        });

        it('should respond with successful JSON obj when model exists', function(done) {
            request(app)
            .get('/1/drinkreviews/1')
            .auth(USERNAME, PASSWORD)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(true);
                res.body.data.should.be.instanceof(Object);
                done();
            });
        });

        it('should respond with failed JSON obj when model does not exist', function(done) {
            request(app)
            .get('/1/drinkreviews/99')
            .auth(USERNAME, PASSWORD)
            .expect(500)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                res.body.data.should.eql({});
                done();
            });
        });
    });

    describe('PUT /1/drinkreviews/:drid', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .put('/1/drinkreviews/1')
            .send({
                rating: 70
            })
            .expect(401)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                done();
            });
        });

        it('should respond with successful JSON obj when model is updated', function(done) {
            request(app)
            .put('/1/drinkreviews/1')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "rcruz",
                did: 1,
                rating: 80
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.success.should.equal(true);
                done();
            });
        });

        it('should respond with failed JSON obj when non-existent model is updated', function(done) {
            request(app)
            .put('/1/drinkreviews/99')
            .auth(USERNAME, PASSWORD)
            .send({})
            .expect(500)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.success.should.equal(false);
                done();
            });
        });

    });

    describe('DELETE /1/drinkreviews/:drid', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .delete('/1/drinkreviews/1')
            .send({})
            .expect(401)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                done();
            });
        });

        it('should respond with successful JSON obj when model is removed', function(done) {
            request(app)
            .delete('/1/drinkreviews/1')
            .auth(USERNAME, PASSWORD)
            .send({})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.success.should.equal(true);
                done();
            });
        });

        it('should respond with failed JSON obj when non-existent model is removed', function(done) {
            request(app)
            .delete('/1/drinkreviews/99')
            .auth(USERNAME, PASSWORD)
            .send({})
            .expect(500)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.success.should.equal(false);
                done();
            });
        });

    });

});
