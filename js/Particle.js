(function () {
    'use strict';

    var Particle = function (point, velocity) {
        this.position = point;

        this.velocity = velocity;
    };

    Particle.prototype.move = function () {
        this.position.addVector(this.velocity);
        if (this.position.x > stage.canvas.width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = stage.canvas.width;
        }

        if (this.position.y > stage.canvas.height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = stage.canvas.height;
        }
    };

    Particle.prototype.draw = function () {
        var particleSize = 2;
//            var rect = new createjs.Rectangle(this.position.x, this.position.y, particleSize, particleSize);
        if (!this.circle) {
            this.circle = new createjs.Shape();
            this.circle.graphics.beginFill("white").drawCircle(0, 0, particleSize);
            stage.addChild(this.circle);
        } else {
            this.circle.x = this.position.x;
            this.circle.y = this.position.y;
        }
    };

    window.Particle = Particle;

} ());
