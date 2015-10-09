module.exports = function(grunt) {

    grunt.initConfig({

        mineSweeper: {
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },

        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729,
                base: 'app'
            },
            livereload: {
                options: {
                    open: true
                }
            }
        },

        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= mineSweeper.app %>/{,*/}*.html'
                ]
            }
        },

        jshint: {
            options: {
                node: true,
                jshintrc: '.jshintrc'
            },
            all: {
                src: [
                    '<%= mineSweeper.app %>/components/**/*.js'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('serve', 'Compile then start a connect web server', function () {
        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });
};