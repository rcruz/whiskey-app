'use strict';

var should = require('should'),
    app = require('../..//main'),
    db = require('../../lib/datasources').MySQL,
    request = require('supertest'),
    USERNAME = 'rcruz',
    PASSWORD = 'pw';

describe('ROUTE /1/articles', function () {

    beforeEach(function (done) {
        db.resetTestData(done);
    });

    describe('POST /1/articles', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .post('/1/articles')
            .send({
                aid: 2,
                uid: "rcruz",
                articleUrl: "http://zomgarticle.com/1.md"
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
            .post('/1/articles')
            .auth(USERNAME, PASSWORD)
            .send({
                aid: 2,
                uid: "rcruz",
                articleUrl: "http://zomgarticle.com/1.md"
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
            .post('/1/articles')
            .auth(USERNAME, PASSWORD)
            .send({
                aid: 1,
                uid: "rcruz",
                articleUrl: "http://zomgarticle.com/1.md"
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

    describe('GET /1/articles', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .get('/1/articles')
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
            .get('/1/articles')
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

    describe('GET /1/articles/:aid', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .get('/1/articles/1')
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
            .get('/1/articles/1')
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
            .get('/1/articles/99')
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

    describe('PUT /1/articles/:aid', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .put('/1/articles/1')
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
            .put('/1/articles/1')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "rcruz",
                articleUrl: "http://zomgarticle.com/2.md"
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
            .put('/1/articles/99')
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

    describe('DELETE /1/articles/:aid', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .delete('/1/articles/1')
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
            .delete('/1/articles/1')
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
            .delete('/1/articles/99')
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
