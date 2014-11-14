"use strict";

var express = require("express"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    fs = require("fs"),
    router = require("./router"),
    passport = require("passport"),
    auth = require("./lib/auth");

var app = express();

// Logging to access.log in append mode, Apache combined format
var accessLogStream = fs.createWriteStream(__dirname + "/access.log", {flags: "a"})
app.use(morgan("combined", {stream: accessLogStream}));

// Parse application/json
app.use(bodyParser.json());

// Use passport
app.use(passport.initialize());

// Add headers to all responses
app.use(function (req, res, next) {

    // Disable caching
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    next();
});

// Require auth on all /1/* routes
app.all("/1/*", auth.authenticate);

// Attach routes defined by router
app.use(router);

// Setup auth
auth.configure();

module.exports = app;
