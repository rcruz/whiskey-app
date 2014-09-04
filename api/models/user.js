"use strict";

var User,
    db = require("../lib/datasources").MySQL,
    encryptor = require("../lib/encryptor");

/*
 *  Table: users
 *
 *  uid : varchar(45) PK
 *  email : varchar(60)
 *  firstName : varchar(45)
 *  lastName : varchar(45)
 *  password : varchar(45)
 */

function findById(info, done) {
    var uid = info.uid;

    db.query("SELECT * FROM users WHERE uid = ?", [uid], function (err, rows, fields) {
        done({
            success: err || (rows.length === 0) ? false : true,
            message: err || "",
            data: rows && rows.length === 1 ? rows[0] : {}
        });
    });
}

function add(info, done) {
    var uid = info.uid,
        email = info.email,
        firstName = info.firstName,
        lastName  = info.lastName,
        password  = info.password,
        data;

    // Encrypt the password
    encryptor.encrypt(password, function (err, passwordHash) {

        data = {
            uid: uid,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: passwordHash
        };

        db.query("INSERT INTO users SET ?", [data], function (err, rows, fields) {
            done({
                success: err ? false : true,
                message: err
            });
        });

    });
}

function remove(info, done) {
    var uid = info.uid,
        data;

    data = {
        uid: uid
    };

    db.query("DELETE FROM users WHERE ?", [data], function (err, response) {
        res.send({
            success: err || (response.affectedRows === 0) ? false : true,
            message: err
        });
    });

}

function update(info, done) {
    var uid = info.uid,
        data = info,
        uidData;

    uidData = {
        uid: uid
    };

    db.query("UPDATE users SET ? WHERE ?", [data, uidData], function (err, response) {
        done({
            success: err || (response.affectedRows === 0) ? false : true,
            message: err || ""
        });
    });

}

function findAll(info, done) {

    db.query("SELECT * FROM users", function (err, rows, fields) {
        done({
            success: err ? false : true,
            message: err || "",
            data: rows ? rows : []
        });
    });

}

User = {
    findById: findById,
    findAll: findAll,
    add: add,
    update: update,
    remove: remove
};

module.exports = User;
