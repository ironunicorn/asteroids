!function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Game = Asteroids.Game = function () {
    this.lives = 3;
    this.score = 0;
    this.addAsteroids();
    var shipOptions = {game: this};
    this.ship = new Asteroids.Ship(shipOptions);
    this.bullets = [];
    this.enemyShips = [];
  };

  Game.prototype.DIM_X = $('.front-page').width();
  Game.prototype.DIM_Y = $('.front-page').height();
  Game.prototype.NUM_ASTEROIDS = 3;

  Game.prototype.addAsteroids = function () {
    this.asteroids = [];
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      var options = { pos: this.randomPosition(), game: this };
      var newAsteroid = new Asteroids.Asteroid(options);
      this.add(newAsteroid);
   }
 };

 Game.prototype.addEnemyShip = function () {
   var options = { pos: this.randomPosition(),
     game: this,
     ship: this.ship
    };
   var newShip = new Asteroids.EnemyShip(options);
   this.add(newShip);
};

 Game.prototype.addAsteroid = function () {
   var options = { pos: this.randomPosition(), game: this };
   var newAsteroid = new Asteroids.Asteroid(options);
   this.add(newAsteroid);
};
 Game.prototype.addScore = function (radius) {
   var addition;
   if (radius === 60) {
     addition = 10;
   } else if (radius === 30) {
     addition = 15;
   } else {
     addition = 30;
   }
   console.log("current score: " + this.score);
   this.score += addition;
   console.log("addition: " + addition);
   $(".score").html("Score: " + this.score);
 };

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Math.random() * 2) * this.DIM_X;
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
    }.bind(this));
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
        }
      }
    }
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(obj);
      this.asteroids.splice(index, 1);
    } else if (obj instanceof Asteroids.Bullet) {
      var index2 = this.bullets.indexOf(obj);
      this.bullets.splice(index2, 1);
    } else if (obj instanceof Asteroids.EnemyShip) {
      var index2 = this.enemyShips.indexOf(obj);
      clearInterval(obj.fire);
      this.enemyShips.splice(index2, 1);
    }
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat([this.ship]).concat(this.enemyShips).concat(this.bullets);
  };

  Game.prototype.add = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    } else if (obj instanceof Asteroids.EnemyShip) {
      this.enemyShips.push(obj);
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] > this.DIM_X || pos[0] < 0 || pos[1] > this.DIM_Y || pos[1] < 0);
  };

  Game.prototype.subtractLife = function () {
    if (this.lives === 0) {
      var $div = $('<div>');
      $div.addClass('gameover');
      $div.html('Game Over. Final Score: ' + this.score)
      $div.append('<br><br><button class="start-button">Play Again!</button>')
      $(".front-page").html($div);
      this.score = 0;
      this.bullets = [];
      this.enemyShips = [];
      this.asteroids = [];

      $('.start-button').click(function () {
        var $lives = $('<div>');
        $lives.addClass('lives');
        $lives.html('<div class="triangle" data-id="1"></div><div class="triangle" data-id="2"></div><div class="triangle" data-id="3"></div>');
        var $score = $('<div>');
        $score.addClass('score');
        $score.html('Score: 0');
        var $canvas = $('<canvas>');
        $canvas.attr('id', 'game-canvas');
        $('.front-page').html($lives);
        $('.front-page').append($score);
        $('.front-page').append($canvas);
        var canvasEl = document.getElementById("game-canvas");
        var ctx = canvasEl.getContext('2d');
        var game = new Asteroids.Game();
        canvasEl.height = game.DIM_Y;
        canvasEl.width = game.DIM_X;
        new Asteroids.GameView(game, ctx).start();
      });
    }
    var $triangle = $('.lives').find("[data-id='" + this.lives + "']");
    $triangle.remove();
    this.lives --;
  }

}();
