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
  var operators = ['-', '+', '*', '/'];
  var arr = expression.split(' ');
  var keep = arr.slice(0);

  if (expression.length === 0) {
    throw "empty";
  }
  if (keep.length === 1) {
    if (operators.includes(arr[0]) || arr[0] === 'sqrt') {
      throw "first is not number";
    } else {
      return parseFloat(keep[0]);
    }
  }
  while (arr.length > 1) {
    var first = arr.shift();
    var next = arr.shift();
    if (first === 'sqrt') {
      if (operators.includes(next)) {
        throw "bad sqrt";
      } else {
        arr.unshift(next);
      }
    } else if (operators.includes(first)) {
      throw "bad";
    } else {
      if (!operators.includes(next)) {
        throw "bad";
      }
    }
  }
  if (arr.length != 1) {
    throw "bad";
  }

//now that the array is correctly formatted
  var temp = null;

  for (var k = 0; k < keep.length; k++) {
    console.log("HI");
    if (keep[k] === 'sqrt') {
      temp = Math.sqrt(keep[k+1]);
      keep[k] = temp;
      keep.splice(k+1, 1);
      i = 0;
      console.log(keep);
    }
  }
  temp = null;

  for (var i = 0; i < keep.length; i++) {
    console.log("HI");
    if (keep[i] === '*') {
      temp = parseFloat(keep[i-1]) * parseFloat(keep[i+1]);
      keep[i-1] = temp;
      keep.splice(i, 2);
      i = 0;
      console.log(keep);
    } else if (keep[i] === '/') {
      temp = parseFloat(keep[i-1]) / parseFloat(keep[i+1]);
      keep[i-1] = temp;
      keep.splice(i, 2);
      i = 0;
      console.log(keep);
    }
  }
  temp = null;

  for (var j = 0; j < keep.length; j++) {
    if (keep[j] === '+') {
      temp = parseFloat(keep[j-1]) + parseFloat(keep[j+1]);
      keep[j-1] = temp;
      keep.splice(j, 2);
      j = 0;
      console.log(keep);
    } else if (keep[j] === '-') {
      temp = parseFloat(keep[j-1]) - parseFloat(keep[j+1]);
      keep[j-1] = temp;
      keep.splice(j, 2);
      j = 0;
      console.log(keep);
    }
  }
/*
  while (keep.length > 1) {
    if (temp === null) {
      first = parseFloat(keep.shift());
      temp = first;
    }
    symbol = keep.shift();
    second = keep.shift();
    if (symbol === '+') {
      temp = temp + parseFloat(second);
    } else if (symbol === '-') {
      temp = temp - parseFloat(second);
    }
  }
*/
  console.log(keep);
  return keep[0];
};
