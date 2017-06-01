"use strict";
//import Math
window.util = {};

// Calculator Exercise
//
// Write a function calc() that takes a string that represents an arithmetic
// operation (such as "3 + 2") and returns the numerical result of the
// operation.
//
// You can assume that each number or operator (i.e. + - / *) is separated by a single
// space.
//
// Part 1. If an invalid expression is given, throw an exception.
//
// ex. util.calc('') -> Error, empty expression
// ex. util.calc('1 2') -> Error, mission operator
// ex. util.calc('-') -> Error, no numbers
// ex. util.calc('1 2 +') -> Error, operator at the wrong spot
// ex. util.calc('+ 1 -18') -> Error, operator at the wrong spot
// ex. util.calc('1 + 55 -2') -> Error, too many numbers
// ex. util.calc('29 + + 1') -> Error, too many operators
// ex. util.calc('29 + 1 +') -> Error, too many operators
//
// Part 2. Implement support for addition and subtraction.
//
// ex. util.calc('1') -> 1
// ex. util.calc('-12') -> -12
// ex. util.calc('3 + 2') -> 5
// ex. util.calc('3 + 8 + 2 + 1    ') -> 14
// ex. util.calc('2 - 1 + 5 + 6') -> 12
// ex. util.calc('-1 + 3 - 2 + 5') -> 5
//
// Part 3. Implement support for multiplication and division.
// Note that the order of operations matters. Multiplication and division needs
// to be perfomed before addition and subtraction.
//
// ex. util.calc('1 * 3 / 5 + 2') -> 2.6
// ex. util.calc('1 + 3 / 2 - 5') -> -2.5
// ex. util.calc('5 * 6 + 8 / 9 * 4.5') -> 34
// ex. util.calc('1 / 0 + 1 * 0') -> Infinity
// ex. util.calc('1 / 0 * 0 + 1') -> NaN
//
// Bonus: Implement support for the square root operator.
// Implement support for the `sqrt` operator. `sqrt` is an operator that takes
// only one argument (i.e. a unary operator). `sqrt` applied before all other
// operators
// other operators and only operates on the value after it.
// There should be a single space before and after `sqrt`.
//
// Note: you can use the builtin Math.sqrt() function.
//
// ex. util.calc('sqrt 4') -> 2, same as Math.sqrt(4)
// ex. util.calc('sqrt 4 - 3') -> -1
// ex. util.calc('-1 * sqrt 4 - 3') -> -5
// ex. util.calc('sqrt 9 - 3 * 10') -> -27
// ex. util.calc('10 * sqrt 81') -> 90


util.calc = function(expression) {

  if (expression.length === 0) {
    throw "Error, empty expression.";
  }

  var exp = expression.split(" ");

  // Support for square root operator
  while (exp.indexOf('sqrt') != -1) {
    var new_num = Math.sqrt(exp[exp.indexOf('sqrt') + 1]);
    exp.splice(exp.indexOf('sqrt'), 2, new_num);
  };

  // Checking for invalid expressions
  if (exp.length === 1 && (exp[0] === '-' || exp[0] === '+' || exp[0] === "/" || exp[0] === "*")) {
    throw "Error, no numbers ";
  }
  if (exp.length === 1 && (typeof(parseInt(exp[0])) === "number") ) {
    return parseInt(exp[0]);
  }

  // Checking for invalid expressions
  if (exp.length === 2) {
    throw "Error, misssing operator ";
  }
  if (exp.length % 2 === 0) {
    throw "Error";
  }

  var total = parseInt(exp[0]);

  // Support Mult and Div
  while (exp.indexOf('/') != -1 || exp.indexOf('*') != -1) {
    for (var i = 2; i < exp.length; i += 2) {
      if ((exp[i - 1] === '*') || (exp[i - 1] === '/')) {
        var num = parseFloat(exp[i]);
        var num1 = parseFloat(exp[i - 2]);
        var op = exp[i - 1];


        if (op === '/') {
          var new_num = (num1 / num);
        }
        else if (op === '*')  {
          var new_num = (num1 * num);
        }

        exp.splice(i - 2, 3, new_num);
        break
      }
    }
  };

  // Support Add and Sub
  var total = parseFloat(exp[0]);
  for (var i=2; i<exp.length; i += 2) {
    var num = parseFloat(exp[i]);
    if (num === NaN) {
      throw "Error, operator at the wrong spot";
    }
    if (exp[i - 1] === '+') {
      total += parseFloat(exp[i]);
    }
    else if (exp[i - 1] === '-') {
      total -= parseFloat(exp[i]);
    }
    else {
      throw "Error, too many numbers";
    }
  };

  return total;
};


