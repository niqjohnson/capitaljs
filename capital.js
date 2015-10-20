(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.capital = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
module.exports = {interest: require('./interest')};

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/index.js
},{"./interest":2}],2:[function(require,module,exports){
"use strict";
var utils = require('./utils');
function interest(opts) {
  var $__1;
  var $__0 = opts,
      principal = $__0.principal,
      rate = $__0.rate,
      years = $__0.years,
      compounding = ($__1 = $__0.compounding) === void 0 ? true : $__1,
      result = {};
  delete opts.compounding;
  utils.enforceNonNegative(opts);
  if (!principal || !rate || !years) {
    throw new Error('Principal, rate and years are required and must be non-negative.');
  }
  if (compounding) {
    result.interest = principal * Math.pow(Math.E, rate * years) - principal;
  } else {
    result.interest = principal * rate * years;
  }
  result.total = principal + result.interest;
  return result;
}
module.exports = interest;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/interest.js
},{"./utils":3}],3:[function(require,module,exports){
"use strict";
function enforceNonNegative(opts) {
  for (var key in opts) {
    if (opts.hasOwnProperty(key)) {
      if (typeof opts[key] === 'undefined' || isNaN(parseFloat(opts[key])) || opts[key] < 0) {
        throw new Error(key + ' must be a non-negative value.');
      }
    }
  }
}
;
module.exports = {enforceNonNegative: enforceNonNegative};

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/utils/index.js
},{}]},{},[1])(1)
});