!function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Ship = Asteroids.Ship = function (options) {
    Asteroids.MovingObject.call(this, options);
    this.pos = options.pos;
    this.vel = [0, 0];
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.RADIUS = 20;
  Ship.prototype.COLOR = '#0066FF';

  Ship.prototype.relocate = function(){
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {
    var magnitude = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    var multiplier = magnitude === 0 ? 7 : (7 / magnitude);
    var newVel = [0, -7];
    if (magnitude !== 0) {
      newVel = [ multiplier * this.vel[0], multiplier * this.vel[1] ];
    };
    var newPos = [this.pos[0], this.pos[1]];
    var options = {vel: newVel, pos: newPos, game: this.game };
    var bullet = new Asteroids.Bullet(options);
    this.game.add(bullet);
  };

}();
