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
    var deg = 2 * Math.PI * Math.random();
    
    return [(Math.sin(deg) * length), (Math.cos(deg) * length)];
  };

}();
