(function () {
    'use strict';

    var Vector = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    /**
     * Creates a new vector
     * @param angle
     * @param length
     * @returns {Vector}
     */
    Vector.createFromAngle = function (angle, length) {
        return new Vector(length * Math.cos(angle), length * Math.sin(angle));
    };


    /**
     * Adds a vector to this
     * @param vector
     */
    Vector.prototype.addVector = function(vector) {
        this.x += vector.x;
        this.y += vector.y;
    };

    /**
     * Returns the length of this
     * @returns {number}
     */
    Vector.prototype.getLength = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };

    /**
     * Returns the angle of this
     * @returns {number}
     */
    Vector.prototype.getAngle = function () {
        return Math.atan2(this.y, this.x);
    };

    window.Vector = Vector;

} ());
