(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.capitaljs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * amortization table calculations
 * ===============================
 * calculates the monthly payment
 * calculates remaining loan balance
 * calculates sum of interest payments
 * calculates sum of principal payments
 * @param {number} amount
 * @param {number} rate
 * @param {number} totalTerm
 * @param {number} amortizeTerm
 * @returns {object}
 */
var amortizationCalc = function(amount, rate, totalTerm, amortizeTerm) {
  var periodInt,
      monthlyPayment,
      summedInterest = 0,
      summedPrincipal = 0,
      monthlyIntPaid,
      monthlyPrincPaid,
      summedAmortize = {};

  // Calculate monthly interest rate and monthly payment
  periodInt = (rate / 12) / 100;
  monthlyPayment = amount * (periodInt / (1 - Math.pow(1 + periodInt, -(totalTerm))));
  // If zero or NaN is returned (i.e. if the rate is 0) calculate the payment without interest
  monthlyPayment = monthlyPayment || amount / totalTerm;

  // Calculate the interest, principal, and remaining balance for each period
  var i = 0;
  while( i < amortizeTerm) {
    monthlyIntPaid = amount * periodInt;
    monthlyPrincPaid = monthlyPayment - monthlyIntPaid;
    summedInterest = summedInterest + monthlyIntPaid;
    summedPrincipal = summedPrincipal + monthlyPrincPaid;
    amount = amount - monthlyPrincPaid;
    i += 1;
  }

  summedAmortize.interest = summedInterest;
  summedAmortize.principal = summedPrincipal;
  summedAmortize.balance = amount;
  summedAmortize.payment = monthlyPayment;

  return summedAmortize;

};

/**
 * Throw an error if a string or number below 0 is passed
 * @param {object}
 * @returns {object}
 */
var errorCheck = function(opts) {
  for (var key in opts) {
    if (opts.hasOwnProperty(key)) {
      if (typeof opts[key] === 'undefined' || isNaN(parseFloat(opts[key])) || opts[key] < 0) {
        throw new Error('Loan ' + key + ' must be a non-negative value.');
      }
    }
  }
};

/**
 * Round values to two decimal places
 * @param {object}
 * @returns {object}
 */
var roundNum = function(numObj) {
  var tmp = {};
  for (var property in numObj) {
    tmp[property] = numObj[property];
    tmp[property + 'Round'] = (Math.round(numObj[property] * 100) / 100).toFixed(2);
  }
  return tmp;
};

/**
 * Pass values and return output
 * @param {object} amount, rate, totalTerm, amortizeTerm
 * @example amortize({amount: 180000, rate: 4.25, totalTerm: 360, amortizeTerm: 60})
 * @returns {object}
 */
var amortize = function(opts) {
  errorCheck(opts);
  var amortized = amortizationCalc(opts.amount, opts.rate, opts.totalTerm, opts.amortizeTerm);
  return roundNum(amortized);
};

module.exports = amortize;
},{}],2:[function(_dereq_,module,exports){
"use strict";
var amortize = _dereq_('amortize'),
    enforcePositive = _dereq_('./utils/enforce/number/positive'),
    sumArray = _dereq_('./utils/sumArray');
function amortization(opts) {
  var $__1;
  var $__0 = opts,
      amount = $__0.amount,
      rate = $__0.rate,
      totalTerm = $__0.totalTerm,
      amortizeTerm = ($__1 = $__0.amortizeTerm) === void 0 ? true : $__1,
      result = {};
  enforcePositive(opts);
  if (!amount || !rate || !totalTerm || !amortizeTerm) {
    throw new Error('Amount, rate, totalTerm, and amortizeTerm are required and must be non-negative.');
  }
  result = amortize(opts);
  return result;
}
module.exports = amortization;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/amortization.js
},{"./utils/enforce/number/positive":10,"./utils/sumArray":12,"amortize":1}],3:[function(_dereq_,module,exports){
"use strict";
var enforcePositive = _dereq_('./utils/enforce/number/positive'),
    sumArray = _dereq_('./utils/sumArray');
function arrayCheck(val) {
  if (val.constructor === Array) {
    val = sumArray(val);
  }
  return val;
}
function cashFlow(opts) {
  var $__1;
  var $__0 = opts,
      income = $__0.income,
      expenses = ($__1 = $__0.expenses) === void 0 ? true : $__1,
      result = {};
  enforcePositive(opts);
  if (!income || !expenses) {
    throw new Error('Income and expenses are required and must be non-negative.');
  }
  result.income = arrayCheck(income);
  result.expenses = arrayCheck(expenses);
  result.cash = result.income - result.expenses;
  return result;
}
module.exports = cashFlow;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/cashFlow.js
},{"./utils/enforce/number/positive":10,"./utils/sumArray":12}],4:[function(_dereq_,module,exports){
"use strict";
var enforceNumber = _dereq_('./utils/enforce/number');
function compoundAnnualGrowthRate(opts) {
  var $__0 = opts,
      startValue = $__0.startValue,
      endValue = $__0.endValue,
      years = $__0.years,
      result = {};
  enforceNumber(opts);
  if (!startValue || !endValue || !years) {
    throw new Error('Start value, end value and years are required and must be numbers.');
  }
  result.raw = Math.pow(endValue / startValue, 1 / years) - 1;
  result.rounded = Math.round(result.raw * 1000) / 1000;
  result.percent = result.rounded * 100;
  return result;
}
module.exports = compoundAnnualGrowthRate;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/compoundAnnualGrowthRate.js
},{"./utils/enforce/number":9}],5:[function(_dereq_,module,exports){
"use strict";
module.exports = {
  'interest': _dereq_('./interest'),
  'cashFlow': _dereq_('./cashFlow'),
  'compoundAnnualGrowthRate': _dereq_('./compoundAnnualGrowthRate'),
  'inflationAdjustedReturn': _dereq_('./inflationAdjustedReturn'),
  'amortization': _dereq_('./amortization'),
  'returnOnInvestment': _dereq_('./returnOnInvestment')
};

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/index.js
},{"./amortization":2,"./cashFlow":3,"./compoundAnnualGrowthRate":4,"./inflationAdjustedReturn":6,"./interest":7,"./returnOnInvestment":8}],6:[function(_dereq_,module,exports){
"use strict";
function inflationAdjustedReturn(opts) {
  var $__1;
  var $__0 = opts,
      investmentReturn = $__0.investmentReturn,
      inflationRate = ($__1 = $__0.inflationRate) === void 0 ? true : $__1,
      realReturn;
  if (!investmentReturn || !inflationRate) {
    throw new Error('Income and expenses are required and must be non-negative.');
  }
  realReturn = ((1 + investmentReturn) / (1 + inflationRate) - 1) * 100;
  realReturn = (Math.round(realReturn * 100) / 100);
  return realReturn;
}
module.exports = inflationAdjustedReturn;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/inflationAdjustedReturn.js
},{}],7:[function(_dereq_,module,exports){
"use strict";
var enforcePositive = _dereq_('./utils/enforce/number/positive');
function interest(opts) {
  var $__1;
  var $__0 = opts,
      principal = $__0.principal,
      rate = $__0.rate,
      years = $__0.years,
      compounding = ($__1 = $__0.compounding) === void 0 ? true : $__1,
      result = {};
  delete opts.compounding;
  enforcePositive(opts);
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
},{"./utils/enforce/number/positive":10}],8:[function(_dereq_,module,exports){
"use strict";
var enforceNumber = _dereq_('./utils/enforce/number');
function returnOnInvestment(opts) {
  var $__0 = opts,
      earnings = $__0.earnings,
      initialInvestment = $__0.initialInvestment,
      result = {};
  enforceNumber(opts);
  if (!earnings || !initialInvestment) {
    throw new Error('Earnings and initial investment are required and must be numbers.');
  }
  result.raw = (earnings - initialInvestment) / initialInvestment;
  result.rounded = Math.round(result.raw * 10000) / 10000;
  result.percent = result.rounded * 100;
  return result;
}
module.exports = returnOnInvestment;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/returnOnInvestment.js
},{"./utils/enforce/number":9}],9:[function(_dereq_,module,exports){
"use strict";
function enforceNumber(opts) {
  for (var key in opts) {
    if (opts.hasOwnProperty(key)) {
      if (typeof opts[key] === 'undefined' || isNaN(parseFloat(opts[key]))) {
        throw new Error(key + ' must be a number.');
      }
    }
  }
}
;
module.exports = enforceNumber;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/utils/enforce/number/index.js
},{}],10:[function(_dereq_,module,exports){
"use strict";
var processOpts = _dereq_('../../processOpts');
function check(key, val) {
  if (typeof val === 'undefined' || isNaN(parseFloat(val)) || val < 0) {
    throw new Error(key + ' must be a non-negative value.');
  }
}
function enforceNonNegativeNumber(opts) {
  processOpts(opts, check);
}
;
module.exports = enforceNonNegativeNumber;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/utils/enforce/number/positive.js
},{"../../processOpts":11}],11:[function(_dereq_,module,exports){
"use strict";
function processOpts(opts, cb) {
  if (opts === Object(opts) && Object.prototype.toString.call(opts) !== '[object Array]') {
    for (var key in opts) {
      if (opts.hasOwnProperty(key)) {
        cb(key, opts[key]);
      }
    }
  } else if (opts instanceof Array) {
    for (var i = 0; i < opts.length; i++) {
      cb('All params', opts[i]);
    }
  } else {
    cb('All params', opts);
  }
}
;
module.exports = processOpts;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/utils/processOpts.js
},{}],12:[function(_dereq_,module,exports){
"use strict";
function sumArray(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}
module.exports = sumArray;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/utils/sumArray.js
},{}]},{},[5])(5)
});