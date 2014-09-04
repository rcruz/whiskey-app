'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server.js',
          'node_env': 'production'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
          '*.js',
          'routes',
          'lib',
          'client'
          ]
    },

    // Test settings
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['test/**/*.js']
    },

    env: {
      test: {
        NODE_ENV: 'test',
        DBNAME: 'whiskeyAppTest'
      }
    },

  });

  grunt.registerTask('test', function() {
      return grunt.task.run([
        'env:test',
        'mochaTest'
      ]);

  });

  grunt.registerTask('default', [
    'jshint',
    'test'
  ]);

};
