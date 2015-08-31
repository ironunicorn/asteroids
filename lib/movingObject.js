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
      if (otherObject instanceof Asteroids.Ship) {
        var x1 = otherObject.pos[0];
        var y1 = otherObject.pos[1] - otherObject.HEIGHT / 2;
        var x2 = otherObject.pos[0] + otherObject.BASE / 2;
        var y2 = otherObject.pos[1] + otherObject.HEIGHT / 2;
        var x3 = otherObject.pos[0] - otherObject.BASE / 2;
        var y3 = y2;
        var x1r = ((x1 - otherObject.pos[0]) * Math.cos(otherObject.direction + Math.PI / 2) - (y1 - otherObject.pos[1]) * Math.sin(otherObject.direction + Math.PI / 2) + otherObject.pos[0]);
        var y1r = ((x1 - otherObject.pos[0]) * Math.sin(otherObject.direction + Math.PI / 2) + (y1 - otherObject.pos[1]) * Math.cos(otherObject.direction + Math.PI / 2) + otherObject.pos[1]);
        var x2r = ((x2 - otherObject.pos[0]) * Math.cos(otherObject.direction + Math.PI / 2) - (y2 - otherObject.pos[1]) * Math.sin(otherObject.direction + Math.PI / 2) + otherObject.pos[0]);
        var y2r = ((x2 - otherObject.pos[0]) * Math.sin(otherObject.direction + Math.PI / 2) + (y2 - otherObject.pos[1]) * Math.cos(otherObject.direction + Math.PI / 2) + otherObject.pos[1]);
        var x3r = ((x3 - otherObject.pos[0]) * Math.cos(otherObject.direction + Math.PI / 2) - (y3 - otherObject.pos[1]) * Math.sin(otherObject.direction + Math.PI / 2) + otherObject.pos[0]);
        var y3r = ((x3 - otherObject.pos[0]) * Math.sin(otherObject.direction + Math.PI / 2) + (y3 - otherObject.pos[1]) * Math.cos(otherObject.direction + Math.PI / 2) + otherObject.pos[1]);
        var c1x = this.pos[0] - x1r;
        var c1y = this.pos[1] - y1r;
        var c2x = this.pos[0] - x2r;
        var c2y = this.pos[1] - y2r;
        var c3x = this.pos[0] - x3r;
        var c3y = this.pos[1] - y3r;
        var e1x = x2r - x1r;
        var e1y = y2r - y1r;
        var e2x = x3r - x2r;
        var e2y = y3r - y2r;
        var e3x = x1r - x3r;
        var e3y = y1r - y3r;
        if (Math.sqrt(c1x*c1x + c1y*c1y) <= this.RADIUS) { return true; }
        if (Math.sqrt(c2x*c2x + c2y*c2y) <= this.RADIUS) { return true; }
        if (Math.sqrt(c3x*c3x + c3y*c3y) <= this.RADIUS) { return true; }

        // first edge
        var k = c1x * e1x + c1y * e1y

        if (k > 0) {
          var len = Math.sqrt(e1x*e1x + e1y*e1y)
          k = k/len;

          if (k < len) {
            if (Math.sqrt(c1x*c1x + c1y*c1y - k*k) <= this.RADIUS) {
              return true;
            }
          }
        }

        // Second edge
        var j = c2x * e2x + c2y * e2y

        if (j > 0) {
          var len = Math.sqrt(e2x*e2x + e2y*e2y)
          j = j/len

          if (j < len) {
            if (Math.sqrt(c2x*c2x + c2y*c2y - j*j) <= this.RADIUS) {
              return true;
            }
          }
        }

       // Third edge
        var l = c3x * e3x + c3y * e3y

        if (l > 0) {
          var len = Math.sqrt(e3x*e3x + e3y*e3y)
          l = l/len

          if (l < len) {
            if (Math.sqrt(c3x*c3x + c3y*c3y - l*l) <= this.RADIUS) {
              return true;
            }
          }
        }
        return false;
      } else if (otherObject instanceof Asteroids.Bullet && this instanceof Asteroids.EnemyShip) {
        if (otherObject.enemy) { return false; }
        var xDistance = this.pos[0] - otherObject.pos[0];
        var yDistance = this.pos[1] - 15 - otherObject.pos[1];
        var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        if ((distance) < (20 + otherObject.RADIUS)) { return true; }

        var distX = Math.abs(otherObject.pos[0] - this.pos[0]);
        var distY = Math.abs(otherObject.pos[1] - this.pos[1]);

        if (distX > (50 / 2 + otherObject.RADIUS)) { return false; }
        if (distY > (15 / 2 + otherObject.RADIUS)) { return false; }

        if (distX <= (50 / 2)) { return true; }
        if (distY <= (15 / 2)) { return true; }

        var dx = distX - 50 / 2;
        var dy = distY - 15 / 2;
        return ((dx * dx + dy * dy) <= (otherObject.RADIUS * otherObject.RADIUS));
      } else if (otherObject instanceof Asteroids.Bullet && this instanceof Asteroids.Ship) {
        if (!otherObject.enemy) { return false; }
        var x1 = this.pos[0];
        var y1 = this.pos[1] - this.HEIGHT / 2;
        var x2 = this.pos[0] + this.BASE / 2;
        var y2 = this.pos[1] + this.HEIGHT / 2;
        var x3 = this.pos[0] - this.BASE / 2;
        var y3 = y2;
        var x1r = ((x1 - this.pos[0]) * Math.cos(this.direction + Math.PI / 2) - (y1 - this.pos[1]) * Math.sin(this.direction + Math.PI / 2) + this.pos[0]);
        var y1r = ((x1 - this.pos[0]) * Math.sin(this.direction + Math.PI / 2) + (y1 - this.pos[1]) * Math.cos(this.direction + Math.PI / 2) + this.pos[1]);
        var x2r = ((x2 - this.pos[0]) * Math.cos(this.direction + Math.PI / 2) - (y2 - this.pos[1]) * Math.sin(this.direction + Math.PI / 2) + this.pos[0]);
        var y2r = ((x2 - this.pos[0]) * Math.sin(this.direction + Math.PI / 2) + (y2 - this.pos[1]) * Math.cos(this.direction + Math.PI / 2) + this.pos[1]);
        var x3r = ((x3 - this.pos[0]) * Math.cos(this.direction + Math.PI / 2) - (y3 - this.pos[1]) * Math.sin(this.direction + Math.PI / 2) + this.pos[0]);
        var y3r = ((x3 - this.pos[0]) * Math.sin(this.direction + Math.PI / 2) + (y3 - this.pos[1]) * Math.cos(this.direction + Math.PI / 2) + this.pos[1]);
        var c1x = otherObject.pos[0] - x1r;
        var c1y = otherObject.pos[1] - y1r;
        var c2x = otherObject.pos[0] - x2r;
        var c2y = otherObject.pos[1] - y2r;
        var c3x = otherObject.pos[0] - x3r;
        var c3y = otherObject.pos[1] - y3r;
        var e1x = x2r - x1r;
        var e1y = y2r - y1r;
        var e2x = x3r - x2r;
        var e2y = y3r - y2r;
        var e3x = x1r - x3r;
        var e3y = y1r - y3r;
        if (Math.sqrt(c1x*c1x + c1y*c1y) <= otherObject.RADIUS) { return true; }
        if (Math.sqrt(c2x*c2x + c2y*c2y) <= otherObject.RADIUS) { return true; }
        if (Math.sqrt(c3x*c3x + c3y*c3y) <= otherObject.RADIUS) { return true; }

        // first edge
        var k = c1x * e1x + c1y * e1y

        if (k > 0) {
          var len = Math.sqrt(e1x*e1x + e1y*e1y)
          k = k/len;

          if (k < len) {
            if (Math.sqrt(c1x*c1x + c1y*c1y - k*k) <= otherObject.RADIUS) {
              return true;
            }
          }
        }

        // Second edge
        var j = c2x * e2x + c2y * e2y

        if (j > 0) {
          var len = Math.sqrt(e2x*e2x + e2y*e2y)
          j = j/len

          if (j < len) {
            if (Math.sqrt(c2x*c2x + c2y*c2y - j*j) <= otherObject.RADIUS) {
              return true;
            }
          }
        }

       // Third edge
        var l = c3x * e3x + c3y * e3y

        if (l > 0) {
          var len = Math.sqrt(e3x*e3x + e3y*e3y)
          l = l/len

          if (l < len) {
            if (Math.sqrt(c3x*c3x + c3y*c3y - l*l) <= otherObject.RADIUS) {
              return true;
            }
          }
        }
        return false;
      } else {
        var xDistance = this.pos[0] - otherObject.pos[0];
        var yDistance = this.pos[1] - otherObject.pos[1];
        var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        return (distance) < (this.RADIUS + otherObject.RADIUS);
      }
    };

}();
