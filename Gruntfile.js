module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
        },
        files: {
          'tmp/sass.css': 'scss/app.scss'
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/app.css': ['tmp/sass.css', 'bower_components/chosen/chosen.min.css']
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['bower_components/chosen/*.png'], dest: 'css/', filter: 'isFile'},
        ],
      },
    },

    concat: {
      options: {
        banner: "/* Kanboard Javascript File */\n",
        sourceMap: true,
        separator: ";\n"
      },
      dist: {
        src: ['bower_components/modernizr/modernizr.js',
              'bower_components/jquery/dist/jquery.js',
              'bower_components/foundation/js/foundation.js',
              'bower_components/list.js/dist/list.js',
              'bower_components/chosen/chosen.jquery.min.js',
              'jssrc/src/base.js',
              'jssrc/src/board.js',
              'jssrc/src/calendar.js',
              'jssrc/src/analytic.js',
              'jssrc/src/swimlane.js',
              'jssrc/src/dashboard.js',
              'jssrc/src/budget.js',
              'jssrc/src/screenshot.js',
              'bower_components/jquery-ui/jquery-ui.js',
              'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.js',
              'bower_components/list.js/dist/list.js',
              'bower_components/moment/moment.js',
              'bower_components/fullcalendar/dist/fullcalendar.js',
              'jssrc/vendor/mousetrap.min.js',
              'jssrc/vendor/mousetrap-global-bind.min.js',
              'jssrc/vendor/lang/da.js',
              'jssrc/vendor/lang/de.js',
              'jssrc/vendor/lang/es.js',
              'jssrc/vendor/lang/fi.js',
              'jssrc/vendor/lang/fr.js',
              'jssrc/vendor/lang/hu.js',
              'jssrc/vendor/lang/it.js',
              'jssrc/vendor/lang/ja.js',
              'jssrc/vendor/lang/nl.js',
              'jssrc/vendor/lang/pl.js',
              'jssrc/vendor/lang/pt-br.js',
              'jssrc/vendor/lang/ru.js',
              'jssrc/vendor/lang/sv.js',
              'jssrc/vendor/lang/th.js',
              'jssrc/vendor/lang/tr.js',
              'jssrc/vendor/lang/zh-cn.js'],
        dest: 'js/app.js'
      }
    },

    uglify: {
      kanboard: {
        files: {
          'js/app.min.js': ['js/app.js']
        }
      }
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass', 'cssmin']
      },

      javascript: {
        files: 'jssrc/**/*.js',
        tasks: ['concat', 'uglify']
      },
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['sass', 'cssmin', 'concat', 'uglify', 'copy']);
  grunt.registerTask('default', ['build','watch']);
}