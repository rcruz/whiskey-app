"use strict";

var users,
    User = require("../../models/user");

/*
 *  Table: users
 *
 *  uid : varchar(45) PK
 *  email : varchar(60)
 *  firstName : varchar(45)
 *  lastName : varchar(45)
 *  password : varchar(45)
 */

// Reused by all routes
function respond(res, result) {
    var code = result.success ? 200 : 500;
    res.status(code).send(result);
}

function findById(req, res) {
    User.findById(req.params, respond.bind(null, res));
}

function add(req, res) {
    User.add(req.body, respond.bind(null, res));
}

function remove(req, res) {
    User.remove(req.body, respond.bind(null, res));
}

function update(req, res) {
    User.update(req.body, respond.bind(null, res));
}

function findAll(req, res) {
    User.findAll({}, respond.bind(null, res));
}

users = {
    findById: findById,
    findAll: findAll,
    add: add,
    update: update,
    remove: remove
};

module.exports = users;
