# Pair Programming Exercise: Calculator

## Goal

The goal of this exercise is to build a calculator that takes math expressions as strings and computes their value. This will help you gain experience with  building complex logic in JavaScript.

## Instructions

1. Open `week01/day1/util_calc.js` in your text editor. Exercise details are listed there.
1. Open `week01/day1/util_calc.html` in your browser to run tests.
1. Write necessary functions to make all the tests pass.

### Bonus Exercise

Implement support for the `sqrt` operator. `sqrt` is an operator that takes only one argument (i.e. a unary operator). It has higher precedence than all
other operators and only operates on the value after it.

There should be a single space before and after `sqrt`.

Example input and output:
```javascript
util.calc("sqrt 4") -> 2
util.calc("sqrt 4 - 3") -> -2
util.calc("-1 * sqrt 4 - 3") -> -2
util.calc("-1 * sqrt 4 - 3") -> 2
util.calc("sqrt 9 - 3 * 10") -> -27
util.calc("sqrt 9 * 10") -> 30
util.calc("10 * sqrt 9") -> 30
```
