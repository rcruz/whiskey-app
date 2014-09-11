'use strict';

var should = require('should'),
    app = require('../..//main'),
    db = require('../../lib/datasources').MySQL,
    request = require('supertest'),
    USERNAME = 'rcruz',
    PASSWORD = 'pw';

describe('ROUTE /1/users', function () {

    beforeEach(function (done) {
        db.resetTestData(done);
    });

    describe('GET /1/users/:uid', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .get('/1/users/rcruz')
            .expect(401)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                done();
            });
        });

        it('should respond with successful JSON obj when uid exists', function(done) {
            request(app)
            .get('/1/users/rcruz')
            .auth(USERNAME, PASSWORD)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(true);
                res.body.data.should.be.instanceof(Object);
                (res.body.data.password === undefined).should.be.true;
                done();
            });
        });

        it('should respond with failed JSON obj when uid does not exist', function(done) {
            request(app)
            .get('/1/users/jackdaniels')
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

    describe('POST /1/users', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .post('/1/users')
            .send({
                uid: "jackdaniels",
                email: "email@address.test",
                firstName: "Jack",
                lastName: "Daniels",
                password: "invalid"
            })
            .expect(401)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                done();
            });
        });

        it('should respond with successful JSON obj when user is added', function(done) {
            request(app)
            .post('/1/users')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "jackdaniels",
                email: "email@address.test",
                firstName: "Jack",
                lastName: "Daniels",
                password: "invalid"
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(true);
                done();
            });
        });

        it('should respond with failed JSON obj when duplicate user is added', function(done) {
            request(app)
            .post('/1/users')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "rcruz",
                email: "email@address.test",
                firstName: "Jack",
                lastName: "Daniels",
                password: "invalid"
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

    describe('PUT /1/users/:uid', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .put('/1/users/rcruz')
            .send({
                uid: "rcruz",
                firstName: "First"
            })
            .expect(401)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                done();
            });
        });

        it('should respond with successful JSON obj when user is updated', function(done) {
            request(app)
            .put('/1/users/rcruz')
            .auth(USERNAME, PASSWORD)
            .send({
                firstName: "First"
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

        it('should respond with failed JSON obj when non-existent user is updated', function(done) {
            request(app)
            .put('/1/users/jackdaniels')
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

    describe('DELETE /1/users/:uid', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .delete('/1/users/rcruz')
            .send({})
            .expect(401)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                done();
            });
        });

        it('should respond with successful JSON obj when user is removed', function(done) {
            request(app)
            .delete('/1/users/rcruz')
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

        it('should respond with failed JSON obj when non-existent user is removed', function(done) {
            request(app)
            .delete('/1/users/jackdaniels')
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

    describe('GET /1/users', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .get('/1/users')
            .expect(401)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                done();
            });
        });

        it('should respond with successful JSON obj when users exist', function(done) {
            request(app)
            .get('/1/users')
            .auth(USERNAME, PASSWORD)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(true);
                res.body.data.should.be.instanceof(Array);
                res.body.data.length.should.be.equal(2);
                res.body.data.forEach(function (user) {
                    (user.password === undefined).should.be.true;
                });
                done();
            });
        });

    });

});
