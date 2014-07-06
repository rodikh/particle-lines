'use strict';

module.exports = function (grunt) {

    grunt.config('uglify', {
        dist: {
            options: {
                mangle: true,
                beautify: false,
                sourceMap: false,
                compress: {
                    drop_console: true, // Dont drop console.logs in test environment
                    dead_code: true
                }
            },
            files: [{
                src: ['dist/particle-lines.concat.js'],
                dest: 'dist/particle-lines.min.js'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};
