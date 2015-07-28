!function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Ship = Asteroids.Ship = function (options) {
    Asteroids.MovingObject.call(this, options);
    this.pos = options.pos;
    this.vel = [0, 0];
    this.direction = - Math.PI / 2;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.RADIUS = 20;
  Ship.prototype.COLOR = '#0066FF';

  Ship.prototype.relocate = function(){
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
    this.direction = - Math.PI / 2;
  };

  Ship.prototype.power = function(impulse) {
    if (impulse.thrust) {
      this.vel[0] += Math.cos(this.direction);
      this.vel[1] += Math.sin(this.direction);
    } else if (impulse.direction) {
      this.direction += impulse.direction;
    }
  };

  Ship.prototype.decreasePower = function() {
    this.vel[0] *= 0.5;
    this.vel[1] *= 0.5;
  };

  Ship.prototype.fireBullet = function () {
    var newVel = [Math.cos(this.direction) * 7, Math.sin(this.direction) * 7];
    var newPos = [this.pos[0], this.pos[1]];
    var options = {vel: newVel, pos: newPos, game: this.game };
    var bullet = new Asteroids.Bullet(options);
    this.game.add(bullet);
  };

}();
