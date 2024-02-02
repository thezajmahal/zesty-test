module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      // Includes Bootstrap via @import
      dist: {
        options: {},
        files: [{
          expand: true,
          cwd: 'assets/sass',
          src: ['*.scss', '*.sass'],
          dest: 'public/stylesheets',
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result in production
        ]
      },
      dist: {
        src: 'public/stylesheets/*.css'
      }
    },
    copy: {
      tethercss: {
        src: 'node_modules/tether/dist/css/tether.min.css',
        dest: 'public/stylesheets/tether.min.css'
      },
    },
    bgShell: {
      _defaults: {
        bg: true
      },
      server: {
        cmd: 'nf run npm run-script watch'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      server: {
        files:  [ '**/*.js', '**/*.hbs' ]
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'postcss']
      }
    }
  });

  grunt.registerTask('default', ['sass', 'postcss', 'copy']);
  grunt.registerTask('serve', ['default', 'bgShell', 'watch']);
}
