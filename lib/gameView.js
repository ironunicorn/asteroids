!function (){

var Asteroids = window.Asteroids = window.Asteroids || {};
var GameView = Asteroids.GameView = function (game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function (){
  this.bindKeyHandlers();
  setInterval( function () {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
  setInterval( function () {
    this.game.ship.decreasePower();
  }, 1500);
};

GameView.prototype.bindKeyHandlers = function (){
  var that = this;
  key('up', function () {that.game.ship.power( {thrust: 1} )});
  key('left', function () {that.game.ship.power( {direction: -(Math.PI / 6)} )} );
  key('right', function () {that.game.ship.power( {direction: (Math.PI / 6)} )} );
  key('space', function () {that.game.ship.fireBullet()});
};

}();
