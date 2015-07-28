!function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Game = Asteroids.Game = function () {
    this.addAsteroids();
    var shipOptions = {pos: this.randomPosition(), game: this};
    this.ship = new Asteroids.Ship(shipOptions);
    this.bullets = [];
  };

  Game.prototype.DIM_X = 1000;
  Game.prototype.DIM_Y = 600;
  Game.prototype.NUM_ASTEROIDS = 4;

  Game.prototype.addAsteroids = function () {
    this.asteroids = [];
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      var options = { pos: this.randomPosition(), game: this };
      var newAsteroid = new Asteroids.Asteroid(options);
      this.add(newAsteroid);
   }
 };

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Math.random() * this.DIM_X);
    var y = Math.floor(Math.random() * this.DIM_Y);
    return [x, y];
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach( function (el) {
      el.draw(ctx); });
  };

  Game.prototype.moveObjects = function(){
    this.allObjects().forEach( function(el) {
      el.move();
    });
  };

  Game.prototype.step = function (){
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.wrap = function (pos){
    if (pos[0] < 0) {
      pos[0] = this.DIM_X;
    } else if (pos[0] > this.DIM_X) {
      pos[0] = 0;
    }
    if (pos[1] < 0) {
      pos[1] = this.DIM_Y;
    } else if (pos[1] > this.DIM_Y) {
      pos[1] = 0;
    }
    return pos;
  };

  Game.prototype.checkCollisions = function (){
    var arr = this.allObjects();
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i].isCollidedWith(arr[j])) {
          arr[i].collideWith(arr[j]);
          console.log(arr[i] + " collided with " + arr[j]);
        }
      }
    }
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(obj);
      this.asteroids.splice(index, 1);
    }
    else if (obj instanceof Asteroids.Bullet) {
      var index2 = this.bullets.indexOf(obj);
      this.bullets.splice(index2, 1);
    }
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  };

  Game.prototype.add = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    }
    else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] > this.DIM_X || pos[0] < 0 || pos[1] > this.DIM_Y || pos[1] < 0);
  };

}();
