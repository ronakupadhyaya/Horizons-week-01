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
var operater = '+ - / *'.split(' ');



function sumAndSubstract(list) {

  initial = parseFloat(list[0]);

  list.forEach(function(item, index) {

    if (item === '+') {
      initial = initial + parseFloat(list[index + 1]);


    } else if (item === '-') {
      initial = initial - parseFloat(list[index + 1]);
    }
  })
  return initial;
}

function timeAndDivid(list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === '/') {

      list[i - 1] = parseFloat(list[i - 1]) / parseFloat(list[i + 1]);


      list.splice(i, 2);
      i--;
    }

    if (list[i] === '*') {
      list[i - 1] = parseFloat(list[i - 1]) * parseFloat(list[i + 1]);
      list.splice(i, 2);
      i--;

    }
  }
  return list;
}

function sqrtComputing(list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === 'sqrt') {

      list[i] = Math.sqrt(parseFloat(list[i + 1]));

      list.splice(i + 1, 1);
      console.log(list);
    }
  }
  return list;
}
util.calc = function(expression) {
  var list = expression.split(' ');
  var countN = 0;
  var countOp = 0;
  list.forEach(function(item) {
    if (Number.isInteger(parseInt(item))) countN++;
    else countOp++;
  })
  if (expression.length === 0) {
    throw 'Error';
  } else if (expression.indexOf('sqrt') !== -1) {
    var sqrt = sqrtComputing(list);
    var listAfterTimesAndDivid = timeAndDivid(sqrt);
    return sumAndSubstract(listAfterTimesAndDivid);
  } else if (!Number.isInteger(parseInt(list[0])) ||
    !Number.isInteger(parseInt(list[list.length - 1]))) {

    throw 'Error';
  } else if (!(countN === countOp + 1)) {
    throw 'Error';
  } else {
    var listAfterTimesAndDivid = timeAndDivid(list);

    return sumAndSubstract(listAfterTimesAndDivid);
  }

  // YOUR CODE HERE
};
