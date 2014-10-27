"use strict";

var drinks,
    Drink = require('../../models/drink');

function respond(res, result) {
  var code = result.success ? 200 : 500;
  res.status(code).json(result);
}

function add(req, res) {
  Drink.add(req.body, respond.bind(null, res));
}

function findAll(req, res) {
  Drink.findAll({}, respond.bind(null, res));
}

function findByID(req, res) {
  Drink.findByID(req.params, respond.bind(null, res));
}

function update(req, res) {
  var info = req.body;
  info.did = req.param('did');
  Drink.update(info, respond.bind(null, res));
}

function remove(req, res) {
  var info = req.body;
  info.did = req.param('did');
  Drink.remove(info, respond.bind(null, res));
}

drinks = {
  add: add,
  findAll: findAll,
  findByID: findByID,
  update: update,
  remove: remove
};

module.exports = drinks;