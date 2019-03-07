module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['scripts/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      },
    },
    concat: {
      game: {
        src: ['scripts/ui.js',
          'scripts/constants.js',
          'scripts/input.js',
          'scripts/main.js'],
        dest: 'script.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['grunt-contrib-watch']);
  grunt.registerTask('build', ['concat']);
};
