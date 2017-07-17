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

},{"./../functions/equals":1}]},{},[2]);
