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
        if (this.checkTriangle(otherObject, this)) { return true; }

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
        if (this.checkTriangle(this, otherObject)) { return true; }

        return false;
      } else {
        var xDistance = this.pos[0] - otherObject.pos[0];
        var yDistance = this.pos[1] - otherObject.pos[1];
        var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

        return (distance) < (this.RADIUS + otherObject.RADIUS);
      }
    };

    MovingObject.prototype.checkEdge = function(cx, cy, ex, ey, circle) {
      var k = cx * ex + cy * ey

      if (k > 0) {
        var len = Math.sqrt(ex * ex + ey * ey)
        k = k/len;

        if (k < len) {
          if (Math.sqrt(cx * cx + cy * cy - k * k) <= circle.RADIUS) {
            return true;
          }
        }
      }
      return false;
    };

    MovingObject.prototype.findX = function(x, y, triangle) {
      return ((x - triangle.pos[0]) * Math.cos(triangle.direction + Math.PI / 2) -
        (y - triangle.pos[1]) * Math.sin(triangle.direction + Math.PI / 2) +
        triangle.pos[0]);
    };

    MovingObject.prototype.findY = function(x, y, triangle) {
      return ((x - triangle.pos[0]) *
        Math.sin(triangle.direction + Math.PI / 2) +
        (y - triangle.pos[1]) *
        Math.cos(triangle.direction + Math.PI / 2) +
        triangle.pos[1]);
    };

    MovingObject.prototype.checkTriangle = function (triangle, circle) {
      var x1 = triangle.pos[0];
      var y1 = triangle.pos[1] - triangle.HEIGHT / 2;
      var x2 = triangle.pos[0] + triangle.BASE / 2;
      var y2 = triangle.pos[1] + triangle.HEIGHT / 2;
      var x3 = triangle.pos[0] - triangle.BASE / 2;
      var y3 = y2;

      var x1r = triangle.findX(x1, y1, triangle);
      var y1r = triangle.findY(x1, y1, triangle);
      var x2r = triangle.findX(x2, y2, triangle);
      var y2r = triangle.findY(x2, y2, triangle);
      var x3r = triangle.findX(x3, y3, triangle);
      var y3r = triangle.findY(x3, y3, triangle);

      var c1x = circle.pos[0] - x1r;
      var c1y = circle.pos[1] - y1r;
      var c2x = circle.pos[0] - x2r;
      var c2y = circle.pos[1] - y2r;
      var c3x = circle.pos[0] - x3r;
      var c3y = circle.pos[1] - y3r;

      var e1x = x2r - x1r;
      var e1y = y2r - y1r;
      var e2x = x3r - x2r;
      var e2y = y3r - y2r;
      var e3x = x1r - x3r;
      var e3y = y1r - y3r;

      if (Math.sqrt(c1x*c1x + c1y*c1y) <= circle.RADIUS) { return true; }
      if (Math.sqrt(c2x*c2x + c2y*c2y) <= circle.RADIUS) { return true; }
      if (Math.sqrt(c3x*c3x + c3y*c3y) <= circle.RADIUS) { return true; }

      if (triangle.checkEdge(c1x, c1y, e1x, e1y, circle)) { return true };
      if (triangle.checkEdge(c2x, c2y, e2x, e2y, circle)) { return true };
      if (triangle.checkEdge(c3x, c3y, e3x, e3y, circle)) { return true };

      return false;
    };

}();
