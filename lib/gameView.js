!function (){

var Asteroids = window.Asteroids = window.Asteroids || {};
var GameView = Asteroids.GameView = function (game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.intervals = [];
};

GameView.prototype.start = function (){
  this.bindKeyHandlers();
  var int1 = setInterval( function () {
    this.game.step();
    this.game.draw(this.ctx);
  }.bind(this), 20);
  var int2 = setInterval( function () {
    this.game.ship.decreasePower();
  }.bind(this), 1000);
  var int3 = setInterval( function () {
    this.game.addAsteroid();
  }.bind(this), 9000);
  var int4 = setInterval( function () {
    this.game.addEnemyShip();
  }.bind(this), 10000);
  this.intervals = [int1, int2, int3, int4];
};

GameView.prototype.pause = function (time) {
  if (!time) {
    time = 1000;
  }
  this.intervals.forEach( function (interval) {
    clearInterval(interval);
  });
  this.intervals = [];
  setTimeout(this.start.bind(this), time);
};



GameView.prototype.bindKeyHandlers = function (){
  var that = this;
  window.addEventListener('keydown', function (e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 38:
        var interval = setInterval(function () {
          that.game.ship.power( {thrust: 1} )
        }, 40);
        window.addEventListener('keyup', function handler1(e) {
          e.preventDefault();
          if (e.keyCode === 38)
          clearInterval(interval);
        });
        break;
      case 37:
        var interval = setInterval(function () {
          that.game.ship.power( {direction: -(Math.PI / 12)} )
        }, 40);
        window.addEventListener('keyup', function handler2(e) {
          e.preventDefault();
          if (e.keyCode === 37)
          clearInterval(interval);
        });
        break;
      case 39:
        var interval = setInterval(function () {
          that.game.ship.power( {direction: (Math.PI / 12)} )
        }, 40);
        window.addEventListener('keyup', function handler3(e) {
          e.preventDefault();
          if (e.keyCode === 39)
          clearInterval(interval);
        });
        break;
      case 32:
        that.game.ship.fireBullet()
        var interval = setInterval(function () {
          that.game.ship.fireBullet()
        }, 250);
        window.addEventListener('keyup', function handler4(e) {
          e.preventDefault();
          if (e.keyCode === 32)
          clearInterval(interval);
        });
        break;
    }
  })
  // key('up', function () {that.game.ship.power( {thrust: 1} )});
  // key('left', function () {that.game.ship.power( {direction: -(Math.PI / 12)} )} );
  // key('right', function () {that.game.ship.power( {direction: (Math.PI / 12)} )} );
  // key('space', function () {that.game.ship.fireBullet()});
};

}();
