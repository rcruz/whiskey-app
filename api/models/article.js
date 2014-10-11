"use strict";

var Article,
    db = require("../lib/datasources").MySQL;

/*
 *  Table: articles
 *
 *  aid : int(11) PK
 *  uid: varchar(45) FK users
 *  dateCreated: timestamp
 *  articleUrl: varchar(100)
 */

function findById(info, done) {
    var aid = info.aid;

    db.query("SELECT * FROM articles WHERE aid = ?", [aid], function (err, rows, fields) {
        done({
            success: err || (rows.length === 0) ? false : true,
            message: err || "",
            data: rows && rows.length === 1 ? rows[0] : {}
        });
    });
}

function add(info, done) {
    var aid = info.aid,
        uid = info.uid,
        articleUrl = info.articleUrl || null,
        data;

    data = {
        aid: aid,
        uid: uid,
        articleUrl: articleUrl
    };

    db.query("INSERT INTO articles SET ?", [data], function (err, rows, fields) {
        done({
            success: err ? false : true,
            message: err
        });
    });

}

function remove(info, done) {
    var aid = info.aid,
        data;

    data = {
        aid: aid
    };

    db.query("DELETE FROM articles WHERE ?", [data], function (err, response) {
        done({
            success: err || (response.affectedRows === 0) ? false : true,
            message: err
        });
    });

}

function update(info, done) {
    var aid = info.aid,
        data = info,
        aidData;

    aidData = {
        aid: aid
    };

    db.query("UPDATE articles SET ? WHERE ?", [data, aidData], function (err, response) {
        done({
            success: err || (response.affectedRows === 0) ? false : true,
            message: err || ""
        });
    });

}

function findAll(info, done) {

    db.query("SELECT * FROM articles", function (err, rows, fields) {
        done({
            success: err ? false : true,
            message: err || "",
            data: rows ? rows : []
        });
    });

}

Article = {
    findById: findById,
    findAll: findAll,
    add: add,
    update: update,
    remove: remove
};

module.exports = Article;
