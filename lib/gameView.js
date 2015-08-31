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
  }.bind(this), 1500);
  var int3 = setInterval( function () {
    this.game.addAsteroid();
  }.bind(this), 7000);
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
  key('up', function () {that.game.ship.power( {thrust: 1} )});
  key('left', function () {that.game.ship.power( {direction: -(Math.PI / 12)} )} );
  key('right', function () {that.game.ship.power( {direction: (Math.PI / 12)} )} );
  key('space', function () {that.game.ship.fireBullet()});
};

}();
