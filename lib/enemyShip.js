!function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var EnemyShip = Asteroids.EnemyShip = function (options) {
    Asteroids.MovingObject.call(this, options);
    if (this.pos[0] === 0) {
      this.vel = [2, 0];
    } else {
      this.vel = [-2, 0];
    }
    this.isWrappable = false;
    this.ship = options.ship;
    this.fire = setInterval(this.fireBullet.bind(this), 1000);
  };

  Asteroids.Util.inherits(EnemyShip, Asteroids.MovingObject);
  EnemyShip.prototype.COLOR = '#ffff00';


  EnemyShip.prototype.draw = function(ctx) {
    if (this.pos[0] < -50 || this.pos[0] > this.game.DIM_X + 50) {
      this.game.remove(this);
    }
    ctx.fillStyle = this.COLOR;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1] - 15,
      20,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(this.pos[0], this.pos[1], 50, 15, 0, 0, 2 * Math.PI);

    ctx.fill();
  };

  EnemyShip.prototype.fireBullet = function () {

    var direction = Math.atan((this.ship.pos[0] - this.pos[0]) / (this.ship.pos[1] - this.pos[1]))
    var newVel = [Math.cos(direction) * 7, Math.sin(direction) * 7];
    var newPos = [this.pos[0], this.pos[1]];
    var options = {
      vel: newVel,
      pos: newPos,
      game: this.game,
      enemy: true
    };
    var bullet = new Asteroids.Bullet(options);
    this.game.add(bullet);
  };

  EnemyShip.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Bullet) {
      this.game.remove(this);
      this.game.addScore(15);
      this.game.remove(otherObject);
    } else {
      return;
    }
  };


}();
