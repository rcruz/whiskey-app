"use strict";

var articles,
    Article = require("../../models/article");

// Reused by all routes
function respond(res, result) {
    var code = result.success ? 200 : 500;
    res.status(code).json(result);
}

function findById(req, res) {
    Article.findById(req.params, respond.bind(null, res));
}

function add(req, res) {
    Article.add(req.body, respond.bind(null, res));
}

function remove(req, res) {
    var info = req.body;
    info.aid = req.param("aid");
    Article.remove(info, respond.bind(null, res));
}

function update(req, res) {
    var info = req.body;
    info.aid = req.param("aid");
    Article.update(info, respond.bind(null, res));
}

function findAll(req, res) {
    Article.findAll({}, respond.bind(null, res));
}

articles = {
    findById: findById,
    findAll: findAll,
    add: add,
    update: update,
    remove: remove
};

module.exports = articles;
