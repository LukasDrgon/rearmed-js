(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function equals(obj1, obj2){
  if((obj1 == null || typeof obj1 != 'object') || (obj2 == null || typeof obj2 != 'object')){
    return obj1 == obj2;
  }

  for(var propName in obj1){
    if(obj1.hasOwnProperty(propName) != obj2.hasOwnProperty(propName)){
      return false;
    }else if(typeof obj1[propName] != typeof obj2[propName]){
      return false;
    }
  }
  for(var propName in obj2){
    var val = obj1[propName];
    var other = obj2[propName];
    if(obj1.hasOwnProperty(propName) != obj2.hasOwnProperty(propName)){
      return false;
    }else if(typeof val != typeof other){
      return false;
    }

    if(!obj1.hasOwnProperty(propName)){
      continue;
    }

    if(!equals(val, other)){
      return false;
    }
  }
  return true;
};

module.exports = equals;

},{}],2:[function(require,module,exports){
function simpleType(x){
  var val = typeof x;

  if(val == 'number'){
    val = 'Number';
  }else if(val == 'string'){
    val = 'String';
  }else if(val == 'boolean'){
    val = 'Boolean';
  }else if(!!(x && x.constructor && x.call && x.apply)){
    val = 'Function';
  }else if(x != null && val == 'object'){
    val = Array.isArray(x) ? 'Array' : 'Object';
  }

  return val;
}

module.exports = simpleType;

},{}],3:[function(require,module,exports){
require('./object/rearmed');

require('./object/all');
require('./object/any');
require('./object/compact');
require('./object/dig');
require('./object/each');
require('./object/empty');
require('./object/equals');
require('./object/except');
require('./object/hasKey');
require('./object/hasValue');
require('./object/join');
require('./object/keys');
require('./object/merge');
require('./object/only');
require('./object/reject');
require('./object/select');
require('./object/values');

},{"./object/all":4,"./object/any":5,"./object/compact":6,"./object/dig":7,"./object/each":8,"./object/empty":9,"./object/equals":10,"./object/except":11,"./object/hasKey":12,"./object/hasValue":13,"./object/join":14,"./object/keys":15,"./object/merge":16,"./object/only":17,"./object/rearmed":18,"./object/reject":19,"./object/select":20,"./object/values":21}],4:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    all: function(cb){
      var bool = true;

      if(!cb){
        cb = function(k,v){
          return !!v;
        }
      }

      for(var k in this){
        if(!cb(k, this[k])){
          bool = false;
          break;
        }
      }

      return bool;
    }
  });
}(this));

},{}],5:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    any: function(cb){
      var bool = false;

      if(!cb){
        cb = function(){
          return true;
        }
      }

      for(var k in this){
        if(cb(k, this[k])){
          bool = true;
          break;
        }
      }
      return bool;
    }
  });
}(this));

},{}],6:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    compact: function(bad){
      var bad;
      if(arguments.length === 0){
        bad = [null, undefined];
      }else if(arguments.length === 1){
        if(Array.isArray(arguments[0])){
          bad = arguments[0];
        }else{
          bad = [arguments[0]];
        }
      }else{
        bad = arguments;
      }

      var obj = {};

      for(var k in this){
        var val = this[k];
        var bool = true;
        for(var i=0;i<bad.length;i++){
          if(val === bad[i]){
            bool = false; 
            break;
          }
        }
        if(bool){
          obj[k] = val;
        }
      }
      return obj;
    }
  });
}(this));

},{}],7:[function(require,module,exports){
(function(){
  "use strict";

  var simpleType = require('./../functions/simpleType');

  Object.rearmed.add({
    dig: function(){
      var keys;
      if(arguments.length === 0){
        keys = [];
      }else if(arguments.length === 1){
        if(Array.isArray(arguments[0])){
          keys = arguments[0];
        }else{
          keys = [arguments[0]];
        }
      }else{
        keys = arguments;
      }

      var val = this;
      for(var k in arguments){
        var type = simpleType(val);
        if(type == 'Array' || type == 'Object'){
          val = val[arguments[k]];
        }else{
          val = undefined;
          break;
        }
      }
      return val;
    }
  });
}(this));

},{"./../functions/simpleType":2}],8:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    each: function(cb){
      for(var k in this){
        cb(k, this[k]);
      }
    }
  });
}(this));

},{}],9:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    empty: function(){
      return Object.keys(this).length === 0;
    }
  });
}(this));

},{}],10:[function(require,module,exports){
(function(){
  "use strict";

  var Rearmed = {
    equals: require('./../functions/equals')
  };

  Object.rearmed.add({
    equals: function(obj2){
      return Rearmed.equals(this, obj2);
    }
  });
}(this));

},{"./../functions/equals":1}],11:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    except: function(keys){
      var keys;
      if(arguments.length === 0){
        keys = [];
      }else if(arguments.length === 1){
        if(Array.isArray(arguments[0])){
          keys = arguments[0];
        }else{
          keys = [arguments[0]];
        }
      }else{
        keys = arguments;
      }

      var obj = {};
      for(var k in this){
        var bool = true;
        for(var i=0;i<keys.length;i++){
          if(k === keys[i]){
            bool = false;
            break;
          }
        }
        if(bool){
          obj[k] = this[k];
        }
      }
      return obj;
    }
  });
}(this));

},{}],12:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    hasKey: function(key){
      var bool = false;
      for(var k in this){
        if(k === key){
          bool = true;
          break;
        }
      }
      return bool;
    }
  });
}(this));

},{}],13:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    hasValue: function(val){
      var bool = false;
      for(var k in this){
        if(this[k] === val){
          bool = true;
          break;
        }
      }
      return bool;
    }
  });
}(this));

},{}],14:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    join: function(cb, delim){
      delim = delim || ', ';
      var str = '';
      var first = true;

      for(var k in this){
        if(first){
          first = false;
        }else{
          str += delim;
        }
        str += this[k];
      }
      return str;
    }
  });
}(this));

},{}],15:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    keys: function(){
      return Object.keys(this);
    }
  });
}(this));

},{}],16:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    merge: function(obj){
      var item = {};
      for(var k in this){
        item[k] = this[k];

        for(var k2 in obj){
          item[k2] = obj[k2];
        }
      }
      return item;
    }
  });
}(this));

},{}],17:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    only: function(keys){
      var keys;
      if(arguments.length === 0){
        keys = [];
      }else if(arguments.length === 1){
        if(Array.isArray(arguments[0])){
          keys = arguments[0];
        }else{
          keys = [arguments[0]];
        }
      }else{
        keys = arguments;
      }

      var obj = {};
      for(var k in this){
        var bool = false;
        for(var i=0;i<keys.length;i++){
          if(k === keys[i]){
            bool = true;
            break;
          }
        }
        if(bool){
          obj[k] = this[k];
        }
      }
      return obj;
    }
  });
}(this));

},{}],18:[function(require,module,exports){
if(!Object.prototype.rearmed){
  function RearmedObject(obj){
    for(var k in obj){
      this[k] = obj[k];
    }
  }

  var simpleType = require('./../functions/simpleType');

  Object.prototype.rearmed = function(){
    return new RearmedObject(this);
  };
  Object.defineProperty(Object.prototype, 'rearmed', {enumerable: false});

  Object.rearmed = {
    config: {
      object: []
    },

    add: function(obj){
      if(simpleType(obj) == 'Object'){
        for(var k in obj){
          RearmedObject.prototype[k] = obj[k];
          Object.defineProperty(RearmedObject.prototype, k, {enumerable: false});

          if(Object.rearmed.config.object.indexOf(k) == -1){
            Object.rearmed.config.object.push(k);
          }else{
            console.warn("Warning: Overriding rearmed()." + method);
          }
        }
      }else{
        throw('argument must be an object');
      }
    },

    remove: function(){
      var methods;
      if(arguments.length === 0){
        methods = [];
      }else if(arguments.length === 1){
        if(Array.isArray(arguments[0])){
          methods = arguments[0];
        }else{
          methods = [arguments[0]];
        }
      }else{
        methods = arguments;
      }

      for(var k in methods){
        var i = Object.rearmed.config.object.indexOf(k);
        if(i != -1){
          RearmedObject.prototype[k] = undefined;
          Object.rearmed.config.object.splice(i, 1);
        }
      }
    }
  };

}

},{"./../functions/simpleType":2}],19:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    reject: function(cb){
      var obj = {};
      for(var k in this){
        var val = this[k];
        if(!cb(k, val)){
          obj[k] = val;
        }
      }
      return obj;
    }
  });
}(this));

},{}],20:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    select: function(cb){
      var obj = {};
      for(var k in this){
        var val = this[k];
        if(cb(k, val)){
          obj[k] = val;
        }
      }
      return obj;
    }
  });
}(this));

},{}],21:[function(require,module,exports){
(function(){
  "use strict";

  Object.rearmed.add({
    values: function(){
      var arr = [];
      for(var k in this){
        arr.push(this[k]);
      }
      return arr;
    }
  });
}(this));

},{}]},{},[3]);
