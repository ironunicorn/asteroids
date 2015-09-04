!function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Bullet = Asteroids.Bullet = function (options) {
    Asteroids.MovingObject.call(this, options);
    if (options.enemy) { this.enemy = true; }
    if (this.enemy) {
      this.COLOR = '#ff0000'
    }
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.COLOR = '#006600';
  Bullet.prototype.RADIUS = 5;
  Bullet.prototype.isWrappable = false;

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.EnemyShip && !this.enemy) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };
}();
