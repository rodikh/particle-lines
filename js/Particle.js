(function () {
    'use strict';

    var Particle = function (point, velocity, canvas) {
        this.x = point.x;
        this.y = point.y;

        this.vx = velocity.x;
        this.vy = velocity.y;

        this.canvas = canvas;
    };

    Particle.prototype.move = function () {
        // add velocity to position
        this.x += this.vx;
        this.y += this.vy;

        // check bounds
        if (this.x > this.canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = this.canvas.width;
        }

        if (this.y > this.canvas.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = this.canvas.height;
        }
    };

    Particle.prototype.draw = function () {
        var particleSize = 2;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, particleSize, 0, 2 * Math.PI);
        ctx.fill();
    };

    window.Particle = Particle;

} ());
