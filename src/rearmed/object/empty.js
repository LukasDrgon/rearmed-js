(function(){
  "use strict";

  Object.prototype.empty = function(){
    return this.length === 0;
  };
  Object.defineProperty(Object.prototype, "empty", {enumerable: false});
}(this));