class Particle {
    constructor(point, velocity, bounds) {
        this.x = point.x;
        this.y = point.y;

        this.vx = velocity.x;
        this.vy = velocity.y;

        this.bounds = bounds;
    }

    move() {
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
    }
}

module.exports = Particle;