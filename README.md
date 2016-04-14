# Capital.js [![Build Status](https://secure.travis-ci.org/CapitalJS/capitaljs.png?branch=master)](https://travis-ci.org/CapitalJS/capitaljs)

## Installation

In a browser:

```
<script src="capital.js"></script>
```

Using npm:

```
$ npm install capitaljs
```

## Usage

In a browser:

```
var rate = capitaljs.compoundAnnualGrowthRate({...});
```

In an AMD loader:

```
require(['capitaljs'], function(capitaljs) {...});
```

In Node:

```
var capitaljs = require('capitaljs');
var rate = capitaljs.compoundAnnualGrowthRate({...});
```

Or if you just want a single formula (to reduce your browser bundle's filesize):

```
var cagr = require('capitaljs/compoundAnnualGrowthRate');
var rate = cagr({...});
```

## Current formulae

### Amortization

Amortization is paying off a loan, like a mortgage, with a fixed payment over a fixed amount of time. The amortization formula in Capital.js takes in loan terms and returns details about how the loan as amortized after a specified period of time.

#### Options

Option | Format | Details
------ | ------ | -------
`amount` | number | Total amount of the loan
`rate` | number | Loan’s annual interest rate
`totalTerm` | number | Total length of the loan, in months
`amortizeTerm` | number | Point in time after the start of the loan you’d like to check the amortization, in months

#### Returns

Property | Format | Details
-------- | ------ | -------
`balance` | number | Total amount of principal left to be paid after the number of months specified in `amortizeTerm`
`balanceRound` | string | `balance` rounded to the nearest cent
`interest` | number | Total amount of interest paid on the loan after the number of months specified in `amortizeTerm`
`interestRound` | string | `interest` rounded to the nearest cent
`payment` | number | Monthly payment
`paymentRound` | string | `payment` rounded to the nearest cent
`principal` | number | Total amount of principal paid on the loan after the number of months specified in `amortizeTerm`
`principalRound` | string | `principal` rounded to the nearest cent

#### Example

```js
var amortization = require('capitaljs/amortization');

// What’s the amortization like after 5 years for a 30-year, $180,000 mortgage
// with a 4.25% interest rate?
amortization( {
  amount: 180000,
  rate: 4.25,
  totalTerm: 360,
  amortizeTerm: 60
} );

/*
{
  balance: 163453.85387151438,
  balanceRound: "163453.85",
  interest: 36583.362108097754,
  interestRound: "36583.36",
  payment: 885.4918039430557,
  paymentRound: "885.49",
  principal: 16546.146128485594,
  principalRound: "16546.15"
}
*/
```

### Cash flow

Cash flow calculates how much money is left after subtracting expenses from income.

#### Options

Option | Format | Details
------ | ------ | -------
`income` | positive number or array | Total income or an array with all sources of income
`expenses` | positive number or array | Total expenses or an array with all expenses

#### Returns

Property | Format | Details
-------- | ------ | -------
`cash` | number | Total cash left over after subtracting expenses from income
`expenses` | number | Total expenses
`income` | number | Total income

#### Examples

```js
var cashFlow = require('capitaljs/cashFlow');

// How much money is left over given $50,000 of expenses and a $100,000 income?
cashFlow( {
  income: 100000,
  expenses: 50000
} );

/*
{
  cash: 50000,
  expenses: 50000,
  income: 100000
}
*/

// How much money is left over given a bunch of different income sources and
// a bunch of different expenses?
cashFlow( {
  income: [300, 14000, 189],
  expenses: [90, 681, 15980, 670]
} );

/*
{
  cash: -2932,
  expenses: 17421,
  income: 14489
}
*/
```

```
var cagr = require('capitaljs/compoundAnnualGrowthRate');

cagr({
  startValue: 100000,
  endValue: 50000,
  years: 10
});
```

```
var iar = require('capitaljs/inflationAdjustedReturn');

iar({
  investmentReturn: .08,
  inflationRate: .03
});
```

```
var interest = require('capitaljs/interest');

interest({
  principal: 100000,
  rate: .06,
  years: 10,
  compounding: true
});
```

```
var roi = require('capitaljs/returnOnInvestment');

roi({
  earnings: 5000,
  initialInvestment: 100000
});
```

## Contributing

Please read the [Contributing guidelines](CONTRIBUTING.md).

### Running Tests

```
$ npm test
```

## License

The project is in the public domain within the United States, and
copyright and related rights in the work worldwide are waived through
the [CC0 1.0 Universal public domain dedication](http://creativecommons.org/publicdomain/zero/1.0/).

All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.

Software source code previously released under an open source license and then modified by CFPB staff is considered a "joint work" (see 17 USC § 101); it is partially copyrighted, partially public domain, and as a whole is protected by the copyrights of the non-government authors and must be released according to the terms of the original open-source license.

For further details, please see: http://www.consumerfinance.gov/developers/sourcecodepolicy/
