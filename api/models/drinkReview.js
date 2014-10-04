"use strict";

var DrinkReview,
    db = require("../lib/datasources").MySQL;

/*
 *  Table: drinkReviews
 *
 *  drid : int(11) PK
 *  did: int(11) FK drinks
 *  uid: varchar(45) FK users
 *  dateCreated: timestamp
 *  rating: int(3)
 *  articleUrl: varchar(100)
 */

function findById(info, done) {
    var drid = info.drid;

    db.query("SELECT * FROM drinkReviews WHERE drid = ?", [drid], function (err, rows, fields) {
        done({
            success: err || (rows.length === 0) ? false : true,
            message: err || "",
            data: rows && rows.length === 1 ? rows[0] : {}
        });
    });
}

function add(info, done) {
    var did = info.did,
        uid = info.uid,
        rating = info.rating,
        articleUrl = info.articleUrl || null,
        data;

    data = {
        did: did,
        uid: uid,
        rating: rating,
        articleUrl: articleUrl
    };

    db.query("INSERT INTO drinkReviews SET ?", [data], function (err, rows, fields) {
        done({
            success: err ? false : true,
            message: err
        });
    });

}

function remove(info, done) {
    var drid = info.drid,
        data;

    data = {
        drid: drid
    };

    db.query("DELETE FROM drinkReviews WHERE ?", [data], function (err, response) {
        done({
            success: err || (response.affectedRows === 0) ? false : true,
            message: err
        });
    });

}

function update(info, done) {
    var drid = info.drid,
        data = info,
        dridData;

    dridData = {
        drid: drid
    };

    db.query("UPDATE drinkReviews SET ? WHERE ?", [data, dridData], function (err, response) {
        done({
            success: err || (response.affectedRows === 0) ? false : true,
            message: err || ""
        });
    });

}

function findAll(info, done) {

    db.query("SELECT * FROM drinkReviews", function (err, rows, fields) {
        done({
            success: err ? false : true,
            message: err || "",
            data: rows ? rows : []
        });
    });

}

DrinkReview = {
    findById: findById,
    findAll: findAll,
    add: add,
    update: update,
    remove: remove
};

module.exports = DrinkReview;
