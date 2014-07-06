'use strict';

module.exports = function (grunt) {

    grunt.config('jshint', {
        options: {
            jshintrc: '.jshintrc'
        },
        all: {
            src: ['js/*.js']
        }
    });

    grunt.config('jscs', {
        options: {
            config: '.jscs.json'
        },
        src: ['demos/**/*.js']
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs-checker');
};
