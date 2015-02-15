module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "6to5": {
      options: {
        sourceMap: true,
        playground: true
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'browser/',
            src: ['**/*.js'],
            dest: 'lib/browser',
          },
          {
            expand: true,
            cwd: 'client/',
            src: ['**/*.js'],
            dest: 'lib/client'
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
            dest: "atom-shell/Atom.app/Contents/Resources/app/"
          },
          {src: "main.js", dest: "atom-shell/Atom.app/Contents/Resources/app/main.js"},
          {src: "package.json", dest: "atom-shell/Atom.app/Contents/Resources/app/package.json"}
        ]
      }
    }
  });

  grunt.registerTask("default", ["6to5", "copy"]);
};
