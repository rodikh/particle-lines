(function (Particle) {
    'use strict';

    var MIN_DISTANCE = 150,
        MAX_VELOCITY = 1,
        PARTICLES_AMOUNT = 100,
        particles = [],
        FPS = 60;

    var canvas = document.getElementById('main'),
        ctx = canvas.getContext('2d');

    window.addEventListener('resize', resizeCanvas, false);

    /**
     * resize the canvas to fill browser window
     */
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        drawLines();
    }
    resizeCanvas();

    /**
     * Creates random particles
     * @param amount Amount of particles to create
     * @param canvas An object specifying the positioning bounds for the particles
     */
    function createParticles (amount, canvas) {
        var i;
        for (i = 0; i < amount; i++) {
            var point = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            };
            var velocity = {
                x: Math.random() * MAX_VELOCITY * 2 - MAX_VELOCITY,
                y: Math.random() * MAX_VELOCITY * 2 - MAX_VELOCITY
            };
            particles.push(new Particle(point, velocity, canvas));
        }
    }

    /**
     * Distance between two points
     * @param {{number, number}} p1 Point to measure distance from
     * @param {{number, number}} p2 Point to measure distance to
     * @returns {number} Distance between the points
     */
    function distance(p1, p2) {
        return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    }

    /**
     * Draws a line from p1 to p2, colored by distance and position
     * @param p1
     * @param p2
     * @param dist Distance between the points
     */
    function drawLine(p1, p2, dist){
        var r = (p1.y / canvas.height) * 255;
        var g = (p2.x / canvas.width) * 255;
        var b = 3 * (p1.x + p1.y) / (canvas.width + canvas.height) * 255;

        if (r < 60) {
            r = 60;
        }

        if (g < 60) {
            g = 60;
        }

        if (b < 120) {
            b = 120;
        }

        var alpha = 1 - dist / MIN_DISTANCE;

        if (alpha > 0.4) {
            alpha = 0.4;
        }

        ctx.strokeStyle = 'rgba('+(r|r)+','+(g|g)+','+(b|b)+', ' + alpha +')';
        ctx.beginPath();
        ctx.moveTo(p1.x,p1.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
    }

    /**
     * Draws connecting lines between all particles withing MIN_DISTANCE of each other
     */
    function drawLines () {
        var i,
            particlesLength = particles.length;

        for (i = 0; i < particlesLength; i++) {
            var j;
            for (j = i + 1; j < particlesLength; j++) {
                var dist = distance(particles[i], particles[j]);
                if (dist < MIN_DISTANCE) {
                    drawLine(particles[i], particles[j], dist);
                }
            }
        }
    }

    /**
     * Global loop function, draws and moves particles
     */
    function tick () {
        var i,
            particlesLength = particles.length;

        ctx.clearRect (0, 0, canvas.width, canvas.height);
        for (i = 0; i < particlesLength; i++) {
            particles[i].move();
        }
        drawLines();
    }

    createParticles(PARTICLES_AMOUNT, canvas);
    setInterval(tick, 1000 / FPS);

} (window.Particle));
