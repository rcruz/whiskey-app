"use strict";

var app = require("./app"),
    port = 8080,
    server;

server = app.listen(port);

server.on("listening", function () {
    console.log("Server started on port " + port);
});

server.on("error", function (err) {
    if (err.code === "EADDRINUSE") {
        console.log("Port " + port + " in use. Terminating.");
        process.exit(1);
    } else {
        console.log("Error code: " + err.code);
    }
});

module.exports = app;
