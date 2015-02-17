var glob = require('glob').sync;

module.exports = function(grunt) {

  // Just because I can.
  Object.defineProperty(String.prototype, 'appPath', {
    get: function() {
      return "atom-shell/Atom.app/Contents/Resources/app/" + this;
    }
  });

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "babel": {
      options: {
        sourceMap: true,
        playground: true
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/*.js'],
            dest: 'lib'
          }
        ]
      }
    },

    copy: {
      all: {
        files: [
          {
            expand: true,
            cwd: 'client/',
            src: ['**/*.html', '**/*.css'],
            dest: 'lib/client'
          },
          {
            expand: true,
            cwd: "lib",
            src: ["**/*"],
            dest: "".appPath
          },
          {src: "main.js", dest: "main.js".appPath},
          {src: "package.json", dest: "package.json".appPath}
        ]
      }
    },

    watch: {
      all: {
        files: ["src/**/*.js"],
        tasks: ["default"]
      }
    }
  });

  grunt.registerTask("default", ["babel", "copy"]);
};
