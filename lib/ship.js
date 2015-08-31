!function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Ship = Asteroids.Ship = function (options) {
    Asteroids.MovingObject.call(this, options);
    this.pos = [this.game.DIM_X / 2, this.game.DIM_Y / 2];
    this.vel = [0, 0];
    this.direction = - Math.PI / 2;
    this.fire = true;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.HEIGHT = 60;
  Ship.prototype.COLOR = '#0066FF';
  Ship.prototype.BASE = 36

  Ship.prototype.relocate = function(){
    this.game.subtractLife();
    this.pos = [-100, -100]
    this.HEIGHT = 0;
    this.BASE = 0;
    this.vel = [0, 0];
    this.direction = - Math.PI / 2;
    this.fire = false;
    this.invincible = true;
    setTimeout(function () {
      this.invincible = false;
    }.bind(this), 2000)
    setTimeout(function () {
      this.HEIGHT = 60;
      this.BASE = 36;
      this.pos = [this.game.DIM_X / 2, this.game.DIM_Y / 2];
      this.fire = true;
    }.bind(this), 1000);
  };

  Ship.prototype.draw = function(ctx) {
    var x1 = this.pos[0];
    var y1 = this.pos[1] - this.HEIGHT / 2;
    var x2 = this.pos[0] + this.BASE / 2;
    var y2 = this.pos[1] + this.HEIGHT / 2;
    var x3 = this.pos[0] - this.BASE / 2;
    var y3 = y2;

    // Rotating
    var x1r = ((x1 - this.pos[0]) * Math.cos(this.direction + Math.PI / 2) - (y1 - this.pos[1]) * Math.sin(this.direction + Math.PI / 2) + this.pos[0]);
    var y1r = ((x1 - this.pos[0]) * Math.sin(this.direction + Math.PI / 2) + (y1 - this.pos[1]) * Math.cos(this.direction + Math.PI / 2) + this.pos[1]);

    var x2r = ((x2 - this.pos[0]) * Math.cos(this.direction + Math.PI / 2) - (y2 - this.pos[1]) * Math.sin(this.direction + Math.PI / 2) + this.pos[0]);
    var y2r = ((x2 - this.pos[0]) * Math.sin(this.direction + Math.PI / 2) + (y2 - this.pos[1]) * Math.cos(this.direction + Math.PI / 2) + this.pos[1]);

    var x3r = ((x3 - this.pos[0]) * Math.cos(this.direction + Math.PI / 2) - (y3 - this.pos[1]) * Math.sin(this.direction + Math.PI / 2) + this.pos[0]);
    var y3r = ((x3 - this.pos[0]) * Math.sin(this.direction + Math.PI / 2) + (y3 - this.pos[1]) * Math.cos(this.direction + Math.PI / 2) + this.pos[1]);
    if (this.invincible) {
      if (this.COLOR === '#0066FF') {
        this.COLOR = '#00FF00'
      } else {
        this.COLOR = '#0066FF'
      }
    } else {
      this.COLOR = '#0066FF';
    }


    ctx.fillStyle = this.COLOR;

    var path = new Path2D();
    path.moveTo(x1r, y1r);
    path.lineTo(x2r, y2r);
    path.lineTo(x3r, y3r);
    ctx.fill(path);

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
    if (!this.fire) { return; }
    var newVel = [Math.cos(this.direction) * 7, Math.sin(this.direction) * 7];
    var newPos = [this.pos[0], this.pos[1]];
    var options = {vel: newVel, pos: newPos, game: this.game };
    var bullet = new Asteroids.Bullet(options);
    this.game.add(bullet);
  };


}();
