"use strict";

var passport = require("passport"),
    BasicStrategy = require("passport-http").BasicStrategy,
    db = require("./datasources").MySQL,
    encryptor = require("./encryptor");

function verify(username, password, done) {
    // Check DB for user and matching password
    db.query("SELECT * FROM users WHERE uid = ?",
            [username], function (err, rows) {
        if (rows && rows.length === 1) {
            // User found, now compare password
            encryptor.checkHash(password, rows[0].password, function (err, res) {
                if (res) {
                    done(null, rows[0]);
                } else {
                    done(err, false, {
                        message: "Incorrect password."
                    });
                }
            });
        } else {
            done(err, false, {
                message: "Username does not exist."
            });
        }
    });
}

function configure() {

    // Set up 'basic' auth strategy
    passport.use(new BasicStrategy(verify));

    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

}

function authenticate(req, res, next) {
    passport.authenticate("basic", { session: false }, function (err, user) {
        if (err || !user) {
            return res.status(401).send({
                success: false,
                message: err || "Bad credentials. User not found"
            });
        }

        // Log in always
        req.logIn(user, function (err) {
            if (err) {
                return res.send(401, {
                    success: false,
                    message: err
                });
            }
            return next();
        });
    })(req, res, next);
}

module.exports = {
    configure: configure,
    authenticate: authenticate
};
