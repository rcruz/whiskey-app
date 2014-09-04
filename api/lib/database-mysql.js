"use strict";

var mysql = require("mysql"),
    util = require("util"),
    path = require("path"),
    exec = require("child_process").exec;

var info = {
        host: "localhost",
        user: "root",
        password: "strongpw",
        database: process.env.DBNAME || "whiskeyApp"
    },
    testInfo = {
        host: info.host,
        user: info.user, // same server
        dataFile: path.resolve(__dirname + "/../test/testData.sql"),
        database: "whiskeyAppTest"
    },
    pool = mysql.createPool(info);

function resetTestData(done) {
    var dropCmd,
        loadCmd;

    if (process.env.DBNAME === testInfo.database && pool) {
        dropCmd = util.format(
                "mysql -u%s -p%s -e \"DROP DATABASE IF EXISTS %s;\"",
                info.user,
                info.password,
                testInfo.database
        );
        loadCmd = util.format(
                "mysql -u%s -p%s < %s",
                info.user,
                info.password,
                testInfo.dataFile
        );

        // Drop test db then load mysql dump file
        exec(dropCmd + " && " + loadCmd, done);
    } else {
        done();
    }
}

// Add function to pool object
pool.resetTestData = resetTestData;

module.exports = pool;
