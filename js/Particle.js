(function () {
    'use strict';

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
            this.x = 0;
        } else if (this.x < 0) {
            this.x = this.bounds.width;
        }

        if (this.y > this.bounds.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = this.bounds.height;
        }
    };

    window.Particle = Particle;

} ());
