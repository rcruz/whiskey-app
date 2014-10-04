"use strict";

var drinkreviews,
    DrinkReview = require("../../models/drinkReview");

// Reused by all routes
function respond(res, result) {
    var code = result.success ? 200 : 500;
    res.status(code).json(result);
}

function findById(req, res) {
    DrinkReview.findById(req.params, respond.bind(null, res));
}

function add(req, res) {
    DrinkReview.add(req.body, respond.bind(null, res));
}

function remove(req, res) {
    var info = req.body;
    info.drid = req.param("drid");
    DrinkReview.remove(info, respond.bind(null, res));
}

function update(req, res) {
    var info = req.body;
    info.drid = req.param("drid");
    DrinkReview.update(info, respond.bind(null, res));
}

function findAll(req, res) {
    DrinkReview.findAll({}, respond.bind(null, res));
}

drinkreviews = {
    findById: findById,
    findAll: findAll,
    add: add,
    update: update,
    remove: remove
};

module.exports = drinkreviews;
