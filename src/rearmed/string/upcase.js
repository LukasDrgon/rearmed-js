(function(){
  "use strict";

  var warn = require('./../functions/warn');
  if(String.prototype.upcase){
    warn('String', 'upcase');
  }

  String.prototype.upcase = function(){
    return this.toUpperCase();
  };

  Object.defineProperty(String.prototype, "upcase", {enumerable: false});
}(this));
