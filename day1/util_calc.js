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
  if (expression.length === 0) throw "Error, empty expression";

  var terms = expression.split(" ");
  var termsTemp = terms.slice();
  while (termsTemp.indexOf("sqrt") > -1) {
    termsTemp.splice(termsTemp.indexOf("sqrt"), 1);
  }
  if (termsTemp.length % 2 === 0) throw "Error, not enough operators";
  for (var i = 0; i < termsTemp.length; i++) {
    var term = parseInt(termsTemp[i]);
    if (i % 2 === 0) {
      if (isNaN(term)) throw "Error, operator at the wrong spot";
    } else {
      if (!isNaN(term)) throw "Error, mission operator";
    }
  }

  //after check
  var tempVal = 1;
  var index = 1;
  var sqrtIndex = 0;
  var size = terms.length;
  for (var i = 0; i < size; i++) {

    if (terms[sqrtIndex] === "sqrt") {
      tempVal = Math.sqrt(parseFloat(terms[sqrtIndex + 1]));
      terms.splice(sqrtIndex, 2, tempVal);
    } else {
      sqrtIndex++;
    }

  }
  for (var i = 1; i < size; i += 2) {
    if (terms[index] === "*") {
      tempVal = parseFloat(terms[index - 1]) * parseFloat(terms[index + 1]);
      terms.splice(index - 1, 3, tempVal);
    } else if (terms[index] === "/") {
      tempVal = parseFloat(terms[index - 1]) / parseFloat(terms[index + 1]);
      terms.splice(index - 1, 3, tempVal);
    } else {
      index += 2;
    }
  }
  while (terms.length > 1) {
    if (terms[1] === "+") {
      tempVal = parseFloat(terms[0]) + parseFloat(terms[2]);
    } else if (terms[1] === "-") {
      tempVal = parseFloat(terms[0]) - parseFloat(terms[2]);
    }
    terms.splice(0, 3, tempVal);
  }
  return parseFloat(terms[0]);
};
