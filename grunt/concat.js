'use strict';

module.exports = function (grunt) {

    grunt.config('concat', {
        options: {
            separator: ''
        },
        dist: {
            options: {
                // Replace all 'use strict' statements in the code with a single one at the top
                // And wrap everything in a self executing anonymous function which scopes window and angular.
                banner: '(function (window) {\n\'use strict\';\n',
                footer: '\n})(window);',
                process: function (src, filepath) {
                    return '// Source: ' + filepath + '\n' +
                        src.replace(/('use strict'|"use strict");/g, '');
                }
            },
            src: [
                'js/Particle.js',
                'js/ParticleLines.js'
            ],
            dest: 'dist/particle-lines.concat.js',
            nonull: true
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
};
