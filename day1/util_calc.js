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
  if (expression === '') {
    throw 'Error, empty expression';
  }

  if (expression.indexOf(' ') != -1)
    if ((expression.indexOf("+") === -1) && (expression.indexOf("-") === -1) &&
      (expression.indexOf("*") === -1) && (expression.indexOf("/") === -1) &&
      (expression.indexOf("sqrt") === -1)) {
      throw "Error, missing operator";
    }

  if ((expression.indexOf("0") === -1) && (expression.indexOf("1") === -1) &&
    (expression.indexOf("2") === -1) && (expression.indexOf("3") === -1) &&
    (expression.indexOf("4") === -1) && (expression.indexOf("5") === -1) &&
    (expression.indexOf("6") === -1) && (expression.indexOf("7") === -1) &&
    (expression.indexOf("8") === -1) && (expression.indexOf("9") === -1)) {
    throw "Error, missing numbers";
  }

  if (((expression.indexOf("+") === 1) || (expression.indexOf("-") === 1) ||
      (expression.indexOf("*") === 1) || (expression.indexOf("/") === 1)) ||
    ((expression.indexOf("+") === expression.length - 1) ||
      (expression.indexOf("-") === expression.length - 1) ||
      (expression.indexOf("*") === expression.length - 1) ||
      (expression.indexOf("/") === expression.length - 1) ||
      (expression.indexOf("sqrt") === expression.length - 1))) {
    throw "Error, operator at the wrong spot";
  }

  var array = expression.split(' ');
  var temp = parseFloat(array[0]);

  while (array.indexOf('sqrt') != -1) {
    var index = array.indexOf('sqrt');
    temp = Math.sqrt(parseFloat(array[index + 1]));
    array.splice(index, 2);
    array.splice(index, 0, temp);
  }

  while (array.indexOf('/') != -1) {
    var index = array.indexOf('/');
    temp = parseFloat(array[index - 1]) / parseFloat(array[index + 1]);
    array.splice(index - 1, 3);
    array.splice(index - 1, 0, temp);
  }

  while (array.indexOf('*') != -1) {
    var index = array.indexOf('*');
    temp = parseFloat(array[index - 1]) * parseFloat(array[index + 1]);
    array.splice(index - 1, 3);
    array.splice(index - 1, 0, temp);
  }

  while (array.indexOf('-') != -1) {
    var index = array.indexOf('-');
    temp = parseFloat(array[index - 1]) - parseFloat(array[index + 1]);
    array.splice(index - 1, 3);
    array.splice(index - 1, 0, temp);
  }

  while (array.indexOf('+') != -1) {
    var index = array.indexOf('+');
    temp = parseFloat(array[index - 1]) + parseFloat(array[index + 1]);
    array.splice(index - 1, 3);
    array.splice(index - 1, 0, temp);
  }

  return temp;
};
