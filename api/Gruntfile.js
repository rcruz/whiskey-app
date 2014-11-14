"use strict";

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require("load-grunt-tasks")(grunt);

  // Time how long tasks take
  require("time-grunt")(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Test settings
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        reporter: require("jshint-stylish")
      },
      all: [
          "*.js",
          "routes",
          "lib",
          "client"
          ]
    },

    mochaTest: {
      options: {
        reporter: "spec"
      },
      src: ["test/**/*.js"]
    },

    env: {
      test: {
        NODE_ENV: "test",
        DBNAME: "whiskeyAppTest"
      }
    }

  });

  grunt.registerTask("test", [
      "env:test",
      "mochaTest"
  ]);

  grunt.registerTask("default", [
    "jshint",
    "test"
  ]);

};
