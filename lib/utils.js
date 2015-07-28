!function (){
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Util = Asteroids.Util = function (){};

  Util.inherits = function(ChildClass, ParentClass){
    function Surrogate (){}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Util.randomVec = function(length) {
    var x = Math.floor((Math.random() - 0.5) * length * 2);
    var y = Math.floor((Math.random() - 0.5) * length * 2);
    return [x, y];
  };

}();
