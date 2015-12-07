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
                hostname: '0.0.0.0',
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
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    dest: '<%= mineSweeper.dist %>',
                    src: [
                        '**/*.html',
                        'image/**/*',
                        '!bower_components/**',
                        '!shared/**'
                    ]
                }]
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= mineSweeper.dist %>/{,*/}*',
                        '!<%= mineSweeper.dist %>/.git{,*/}*'
                    ]
                }]
            }
        },

        useminPrepare: {
            html: '<%= mineSweeper.app %>/index.html',
            options: {
                dest: '<%= mineSweeper.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglify'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        usemin: {
            html: ['<%= mineSweeper.dist %>/{,*/}*.html'],
            css: ['<%= mineSweeper.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: [
                    '<%= mineSweeper.dist %>',
                    '<%= mineSweeper.dist %>/images',
                    '<%= mineSweeper.dist %>/styles'
                ]
            }
        },

        concat: {
            js: {
                files: [
                    {
                        dest: '.tmp/scripts/main.js',
                        src: [
                            '<%= mineSweeper.app %>/components/**/*.js',
                            '<%= mineSweeper.app %>/shared/**/*.js'
                        ]
                    }
                ]
            },
            css :{
                src: [
                    'styles/*.css',
                    'bower_components/components-font-awesome/css/font-awesome.min.css'
                ],
                dest: '.tmp/styles/main.css'
            }
        },

        cssmin: {
            css: {
                src: '.tmp/styles/main.css',
                dest: '<%= mineSweeper.dist %>/styles/main.min.css'
            }
        },

        uglify: {
            options: {
                mangle: false
            },

            js: {
                files: {
                    '<%= mineSweeper.dist %>/scripts/main.min.js': '.tmp/scripts/main.js'
                }
            },

            bower: {
                options: {
                    compress: true
                },
                files: {
                    '<%= mineSweeper.dist %>/scripts/vendor.min.js': '.tmp/scripts/vendor.js'
                }
            }
        },

        bower_concat: {
            options: {
                separator: '\r\n'
            },
            all: {
                dest: '.tmp/scripts/vendor.js',
                bowerOptions: {
                    relative: false
                }
            }
        },

        bower: {
            install: {
                options: {
                    copy: false
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= mineSweeper.dist %>',
                    src: [
                        '**/*.html'
                    ],
                    dest: '<%= mineSweeper.dist %>'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');


    grunt.registerTask('serve', 'Compile then start a connect web server', function () {
        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'bower:install',
        'useminPrepare',
        'bower_concat',
        'concat',
        'uglify:js',
        'uglify:bower',
        'cssmin',
        'copy',
        'usemin',
        'htmlmin'
    ]);
};