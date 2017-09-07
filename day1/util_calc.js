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

  //part 1
  if (expression == '') {
    throw "Error, empty expression";
  }
  if (!(expression.includes('+') || expression.includes('-')
  || expression.includes('*') || expression.includes('/')
  || expression.includes('sqrt')) && expression.includes(' ')) {
    throw "Error, missing operator";
  }
  var bool = true;
  for (var i = 0; i < expression.length; i++) {
    bool &= isNaN(expression.charAt(i));
  }
  if (bool) {
    throw "Error, no numbers";
  }
  var exp = expression.split(' ');

  //part 4
  while (exp.includes('sqrt')) {
    var ind = exp.indexOf('sqrt');
    exp = exp.slice(0, ind).concat(Math.sqrt(exp[ind+1])).concat(exp.slice(ind+2));
  }

  //back to part 1
  if (exp.length % 2 == 0) {
    throw "Error, too many numbers or operators";
  }
  for (var j = 0; j < exp.length; j += 2) {
    exp[j] = parseFloat(exp[j]);
    if (isNaN(exp[j])) {
      throw "Error, operator at wront spot";
    }
  }
  for (var k = 1; k < exp.length; k += 2) {
    if (!"+-*/".includes(exp[k])) {
      throw "Error, too many numbers"
    }
  }

  //part 3
  for (var x = 1; x < exp.length; x += 2) {
    //debugger;
    if (exp[x] == '*') {
      exp = exp.slice(0, x - 1).concat([exp[x-1] * exp[x+1]]).concat(exp.slice(x + 2));
      x -= 2;
    }
    if (exp[x] == '/') {
      exp = exp.slice(0, x - 1).concat([exp[x-1] / exp[x+1]]).concat(exp.slice(x + 2));
      x -= 2;
    }
  }

  //part 2
  var result = exp[0];
  for (var y = 1; y < exp.length; y += 2) {
    if (exp[y] == '+') {
      result += exp[y + 1];
    }
    if (exp[y] == '-') {
      result -= exp[y + 1];
    }
  }

  return result;
};
