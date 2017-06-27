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
// ex. util.calc('1 2') -> Error, missing operator
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
//if there's no expression, throw the error
  if (! expression) {
    throw new Error('Empty expression');
  }

  var tokens = expression.split(' ');
  //split expression by ' '
  var i = 0;
  //index starts at 0
  var product = num();
  //product will take the form of a number
  var tot = 0;
  // starts at 0

  function next() {
    return tokens[i++];
  }
  //when called, will move on to next token

  function num() {
    var cur = next();
    if (cur === 'sqrt') {
      return Math.sqrt(num());
    }
    //if current number is SQRT, carry out squareroot

    if (! isNumber(cur)) {
      throw new Error('Expected number, got ' + cur);
    }
    return + cur;
  }
  // current number is not a number, throw error

  function op() {
    var cur = next();
    //go through all of the current values
    if (['-', '+', '/', '*', 'sqrt'].indexOf(cur) < 0) {
      throw new Error('Expected operator, got ' + cur);
    }
    //if there's no operator, throw an error
    return cur;
    //return current value if it is an operator
  }


  while (i < tokens.length) {
    //while index is shorter than number of tokens
    var oper = op();
    //define variable as function op().
    //returns the current value if it is one of the operators
    if (oper === '+') {
      tot += product;
      //tot is the running total
      //
      product = num();
    } else if (oper === '-') {
      tot += product;
      product = -num();
    } else if (oper === '*') {
      product *= num();
    } else if (oper === '/') {
      product /= num();
    }
  }

  return tot + product;
};

function isNumber(n) {
  return ! isNaN(n);
};
