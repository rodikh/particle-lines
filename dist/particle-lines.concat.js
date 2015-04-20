(function (window) {
'use strict';
// Source: js/Particle.js
(function () {
    

    var Particle = function (point, velocity, bounds) {
        this.x = point.x;
        this.y = point.y;

        this.vx = velocity.x;
        this.vy = velocity.y;

        this.bounds = bounds;
    };

    Particle.prototype.move = function () {
        // add velocity to position
        this.x += this.vx;
        this.y += this.vy;

        // check bounds
        if (this.x > this.bounds.width) {
            this.vx = -this.vx;
            this.x = this.bounds.width;
        } else if (this.x < 0) {
            this.vx = -this.vx;
            this.x = 0;
        }

        if (this.y > this.bounds.height) {
            this.vy = -this.vy;
            this.y = this.bounds.height;
        } else if (this.y < 0) {
            this.vy = -this.vy;
            this.y = 0;
        }
    };

    window.Particle = Particle;

} ());
// Source: js/ParticleLines.js
(function (Particle) {
    


    var ParticleLines = function (canvas, options) {
        if (!options) {
            options = {};
        }

        this.maxDistance = options.maxDistance || 150;
        this.maxVelocity = options.maxVelocity || 1;
        this.particlesAmount = options.particlesAmount || 100;
        this.particles = [];
        this.fps = options.fps || 60;

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');



        window.addEventListener('resize', this.resizeCanvas.bind(this), false);
        this.resizeCanvas();

        this.createParticles(this.particlesAmount);

        setInterval(this.tick.bind(this), 1000 / this.fps);
    };

    /**
     * resize the canvas to fill browser window
     */
    ParticleLines.prototype.resizeCanvas = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.drawLines();
    };

    /**
     * Creates random particles
     * @param amount Amount of particles to create
     */
    ParticleLines.prototype.createParticles = function (amount) {
        var i;
        for (i = 0; i < amount; i++) {
            var point = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height
            };
            var velocity = {
                x: Math.random() * this.maxVelocity * 2 - this.maxVelocity,
                y: Math.random() * this.maxVelocity * 2 - this.maxVelocity
            };
            this.particles.push(new Particle(point, velocity, this.canvas));
        }
    };

    /**
     * Draws a line from p1 to p2, colored by distance and position
     * @param p1
     * @param p2
     * @param dist Distance between the points
     */
    ParticleLines.prototype.drawLine = function (p1, p2, dist){
        var r = 100 + (p1.y / this.canvas.height) * 155;
        var g = 100 + (p2.x / this.canvas.width) * 155;
        var b = 3 * (p1.x + p1.y) / (this.canvas.width + this.canvas.height) * 255;

        r |= r;
        g |= g;
        b = (b < 120) ? 120 : b|b;

        var alpha = 1 - dist / this.maxDistance;

        if (alpha > 0.4) {
            alpha = 0.4;
        }

        this.ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ', ' + alpha + ')';
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x,p1.y);
        this.ctx.lineTo(p2.x,p2.y);
        this.ctx.stroke();
    };

    /**
     * Draws connecting lines between all particles withing MIN_DISTANCE of each other
     */
    ParticleLines.prototype.drawLines = function () {
        var length = this.particles.length,
            i;

        for (i = 0; i < length; i++) {
            var j;
            for (j = i + 1; j < length; j++) {
                var dist = distance(this.particles[i], this.particles[j]);
                if (dist < this.maxDistance) {
                    this.drawLine(this.particles[i], this.particles[j], dist);
                }
            }
        }
    };

    /**
     * Global loop function, draws and moves particles
     */
    ParticleLines.prototype.tick = function () {
        var length = this.particles.length,
            i;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (i = 0; i < length; i++) {
            this.particles[i].move();
        }
        this.drawLines();
    };


    /**
     * Distance between two points
     * @param {{number, number}} p1 Point to measure distance from
     * @param {{number, number}} p2 Point to measure distance to
     * @returns {number} Distance between the points
     */
    function distance(p1, p2) {
        return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    }

    window.ParticleLines = ParticleLines;

} (window.Particle));

})(window);