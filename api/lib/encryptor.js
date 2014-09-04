"use strict";

var encryptor,
    bcrypt = require("bcrypt"),
    SALT = 10;

function encrypt(dataString, done) {
    bcrypt.hash(dataString, SALT, done);
}

function checkHash(dataString, storedHash, done) {
    bcrypt.compare(dataString, storedHash, done);
}

encryptor = {
    encrypt: encrypt,
    checkHash: checkHash
};

module.exports = encryptor;

