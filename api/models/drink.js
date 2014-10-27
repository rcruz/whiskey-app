"use strict";

var Drink,
    db = require('../lib/datasources').MySQL;

// create
function add(info, done) {
  var name = info.name,
      type = info.type,
      subtype = info.subtype,
      originCountry = info.originCountry,
      originRegion = info.originRegion,
      manufacturer = info.manufacturer,
      alcoholContent = info.alcoholContent,
      data;

  data = {
    type: type,
    subtype: subtype,
    originCountry: originCountry,
    originRegion: originRegion,
    manufacturer: manufacturer,
    alcoholContent: alcoholContent
  }

  db.query("INSERT INTO drinks SET ?", [data], function (err, rows, fields){
    done({
      success: err ? false : true,
      message: err
    });
  });
}

// read
function findAll(info, done) {
  db.query("SELECT * FROM drinks", function (err, rows, fields){
    done({
      success: err ? false : true,
      message: err || "",
      data: rows ? rows : []
    });
  });
}

// read
function findByID(info, done) {
  var did = info.did;

  db.query("SELECT * FROM drinks WHERE did = ?", [did], function (err, rows, fields) {
    done({
      success: err || (rows.length === 0) ? false : true,
      message: err || "",
      data: rows && rows.length === 1 ? rows[0] : {}
    });
  });
}

// update
function update(info, done) {
  var uidData = {
    did: info.did
  };

  db.query("UPDATE drinks SET ? WHERE ?", [info, uidData], function (err, response) {
    done({
      success: err || (response.affectedRows === 0) ? false : true,
      message: err || ""
    });
  });
}

// destroy
function remove(info, done) {
  var did = info.did,
      data;
  data = {
    did: did
  }

  db.query('DELETE FROM drinks WHERE ?', [data], function(err, response){
    done({
      success: err || (response.affectedRows === 0) ? false : true,
      message: err
    });
  });
}

Drink = {
  add : add,
  findAll: findAll,
  findByID: findByID,
  update: update,
  remove: remove
}

module.exports = Drink;