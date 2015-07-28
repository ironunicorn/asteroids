!function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Asteroid = Asteroids.Asteroid = function (options) {
    Asteroids.MovingObject.call(this, options);
    this.pos = options.pos;
    this.vel = Asteroids.Util.randomVec(3);
    this.RADIUS = options.radius || 60;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.COLOR = "#FF6600";
  Asteroid.prototype.RADIUS = 60;

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Bullet) {
      this.game.remove(this);
      this.game.remove(otherObject);
      if (this.RADIUS > 15) {
        var newPos1 = [this.pos[0], this.pos[1]];
        var newPos2 = [this.pos[0], this.pos[1]];
        var newVel1 = [this.vel[1], this.vel[0]];
        var newVel2 = [this.vel[1], (this.vel[0] * -1)];
        var radius = this.RADIUS / 2;
        var asteroid1 = new Asteroid({
          pos: newPos1, 
          game: this.game, 
          vel: newVel1, 
          radius: radius
        });
        var asteroid2 = new Asteroid({
          pos: newPos2, 
          game: this.game, 
          vel: newVel2, 
          radius: radius
        });
        this.game.add(asteroid1);
        this.game.add(asteroid2);
      }
    }
  };
}();
