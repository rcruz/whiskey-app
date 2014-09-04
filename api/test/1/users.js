'use strict';

var should = require('should'),
    app = require('../..//main'),
    db = require('../../lib/datasources').MySQL,
    request = require('supertest'),
    USERNAME = 'rcruz',
    PASSWORD = 'pw';

xdescribe('ROUTE /1/users', function () {

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
                done();
            });
        });

        it('should respond with failed JSON obj when uid does not exist', function(done) {
            request(app)
            .get('/1/users/samosachaat')
            .auth(USERNAME, PASSWORD)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                res.body.data.should.eql({});
                done();
            });
        });
    });

    describe('POST /1/users/add', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .post('/1/users/add')
            .send({
                uid: "samosachaat",
                email: "email@address.test",
                firstName: "Samosa",
                lastName: "Chaat",
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
            .post('/1/users/add')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "samosachaat",
                email: "email@address.test",
                firstName: "Samosa",
                lastName: "Chaat",
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
            .post('/1/users/add')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "rcruz",
                email: "email@address.test",
                firstName: "Samosa",
                lastName: "Chaat",
                password: "invalid"
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.success.should.equal(false);
                done();
            });
        });
    });

    describe('POST /1/users/update', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .post('/1/users/update')
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
            .post('/1/users/update')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "rcruz",
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
            .post('/1/users/update')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "samosachaat"
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.success.should.equal(false);
                done();
            });
        });

    });

    describe('POST /1/users/remove', function() {

        it('should respond with failure JSON obj when request is unauthorized', function(done) {
            request(app)
            .post('/1/users/remove')
            .send({
                uid: "rcruz"
            })
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
            .post('/1/users/remove')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "rcruz"
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

        it('should respond with failed JSON obj when non-existent user is removed', function(done) {
            request(app)
            .post('/1/users/remove')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "samosachaat"
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.success.should.equal(false);
                done();
            });
        });

        it('should respond with successful JSON obj when user is removed and ensure user data is also removed', function(done) {
            request(app)
            .post('/1/users/remove')
            .auth(USERNAME, PASSWORD)
            .send({
                uid: "rcruz"
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                res.body.success.should.equal(true);

                // Check for user data
                request(app)
                .get('/1/data/rcruz')
                .auth("admin", "securepw") // Required since the user is deleted, and has no access
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.success.should.equal(false);
                    res.body.data.should.eql({});
                    done();
                });
            });
        });

    });

});
