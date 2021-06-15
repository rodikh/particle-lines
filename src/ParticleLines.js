const Particle = require('./Particle.js');

class ParticleLines {
    constructor(canvas, options) {
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

        this.createParticles(this.particlesAmount);

        setInterval(this.tick.bind(this), 1000 / this.fps);
    }

    /**
     * Creates random particles
     * @param amount Amount of particles to create
     */
    createParticles(amount) {
        let i;
        for (i = 0; i < amount; i++) {
            let point = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height
            };
            let velocity = {
                x: Math.random() * this.maxVelocity * 2 - this.maxVelocity,
                y: Math.random() * this.maxVelocity * 2 - this.maxVelocity
            };
            this.particles.push(new Particle(point, velocity, this.canvas));
        }
    }

    /**
     * Draws a line from p1 to p2, colored by distance and position
     * @param p1
     * @param p2
     * @param dist Distance between the points
     */
    drawLine(p1, p2, dist) {
        let r = 100 + (p1.y / this.canvas.height) * 155;
        let g = 100 + (p2.x / this.canvas.width) * 155;
        let b = 3 * (p1.x + p1.y) / (this.canvas.width + this.canvas.height) * 255;

        r |= r;
        g |= g;
        b = (b < 120) ? 120 : b | b;

        let alpha = 1 - dist / this.maxDistance;

        if (alpha > 0.4) {
            alpha = 0.4;
        }

        this.ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ', ' + alpha + ')';
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    }

    /**
     * Draws connecting lines between all particles withing MIN_DISTANCE of each other
     */
    drawLines() {
        let length = this.particles.length,
            i;

        for (i = 0; i < length; i++) {
            let j;
            for (j = i + 1; j < length; j++) {
                let dist = distance(this.particles[i], this.particles[j]);
                if (dist < this.maxDistance) {
                    this.drawLine(this.particles[i], this.particles[j], dist);
                }
            }
        }
    }

    /**
     * Global loop function, draws and moves particles
     */
    tick() {
        let length = this.particles.length,
            i;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (i = 0; i < length; i++) {
            this.particles[i].move();
        }
        this.drawLines();
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

module.exports = ParticleLines;