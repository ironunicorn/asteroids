!function (){
    var Asteroids = window.Asteroids = window.Asteroids || {};

    var MovingObject = Asteroids.MovingObject = function(attrs){
        this.pos = attrs.pos;
        this.vel = attrs.vel;
        this.game = attrs.game;
    };

    MovingObject.prototype.isWrappable = true;

    MovingObject.prototype.draw = function(ctx) {
        ctx.fillStyle = this.COLOR;
        ctx.beginPath();

        ctx.arc(
          this.pos[0],
          this.pos[1],
          this.RADIUS,
          0,
          2 * Math.PI,
          false
        );

        ctx.fill();
    };

    MovingObject.prototype.move = function(){
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      if (this.game.isOutOfBounds(this.pos) && this.isWrappable){
        this.pos = this.game.wrap(this.pos);
      } else if (this.game.isOutOfBounds(this.pos)) {
        this.game.remove(this);
      }
    };

    MovingObject.prototype.isCollidedWith = function(otherObject) {
      var xDistance = this.pos[0] - otherObject.pos[0];
      var yDistance = this.pos[1] - otherObject.pos[1];
      var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
      return (distance) < (this.RADIUS + otherObject.RADIUS);
    };

    MovingObject.prototype.collideWith = function(otherObject) {
      // this.game.remove(this);
      // this.game.remove(otherObject);
    };
}();
