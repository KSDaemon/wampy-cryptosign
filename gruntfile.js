module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist/*']
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                preserveComments: false,
                sourceMap: true
            },
            default: {
                files: {
                    'dist/wampy-cryptosign.min.js': ['dist/wampy-cryptosign.js']
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'dist/wampy-cryptosign.js': 'src/wampy-cryptosign.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['clean', 'babel', 'uglify']);
};
