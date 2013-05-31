module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-tagrelease');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> | Copyright (C) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> | <%= pkg.homepage %> | Released under the MIT License */\n',
                report: "gzip"
            },
            dist: {
                files: {
                    'dist/zerobox.min.js': ['zerobox.js']
                }
            }
        },

        copy: {
            main: {
                files: [
                    {
                        src  : ['dist/zerobox.min.js'],
                        dest : 'dist/zerobox.v<%= pkg.version %>.min.js'
                    }
                ]
            }
        },

        jshint: {
            files : ['Gruntfile.js', 'zerobox.js'],
            options : {
                globals : {
                    jQuery : true
                }
            }
        },

        bumpup: {
            files: ['package.json', 'bower.json']
        },

        jsdoc: {
            dist: {
                src: ['zerobox.js'],
                options: {
                    destination: 'docs'
                }
            }
        },

        tagrelease: {
            file: 'package.json',
            commit:  false,
            message: 'Marks v%version%.',
            prefix:  '',
            annotate: true
        }
    });

    grunt.registerTask('updatePackage', function () {
        grunt.config.set('pkg', grunt.file.readJSON('package.json'));
    });

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['uglify', 'copy']);
    grunt.registerTask('default', ['test', 'build']);

    grunt.registerTask('release', function (type) {
        if (!type) {
            type = 'patch';
        }

        grunt.task.run('test');
        grunt.task.run('bumpup:' + type);
        grunt.task.run('updatePackage');
        grunt.task.run('build');
        grunt.task.run('tagrelease');
    });
};