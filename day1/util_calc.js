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
  // YOUR CODE HERE
  // Check for invalid input
  var expArr = expression.split(" ");

  if (expression === '') {
  	throw exception;
  }
  var ops = ['+', '-', '*', '/'];
  var odd = true;
  var currNum;
  for (let i = 0; i < expArr.length; i++) {
  	if (expArr[i] === 'sqrt') {
 //		odd = !odd;
 		continue;
  	}

  	if (odd) {
  		currNum = +expArr[i];
  		if (isNaN(currNum)) {
  			throw exception;
  		}
  	} else {
  		if (!ops.includes(expArr[i])) {
  			throw exception;
  		}
  	}
  	odd = !odd;
  }
  if (ops.includes(expArr[expArr.length - 1])) {
  	throw exception;
  }

  // multiply and divide
  var arg1, arg2, result = 0;
  var newArr = [];

  var firstOp;
  if (expArr[0] === 'sqrt') {
  	expArr[1] = Math.sqrt(expArr[1]);
  	firstOp = 2;
  	newArr.push(expArr[1]);
  } else {
  	firstOp = 1;
    newArr.push(expArr[0]);
  }

  for (let i = firstOp; i < expArr.length; i += 2) {

  	if (expArr[i] === 'sqrt') {
  		expArr[i + 1] === Math.sqrt(expArr[i + 1]);
  		i += 2;
  	}

  	if (expArr[i] === '*') {
  		if (expArr[i + 1] === 'sqrt') {
  			newArr[newArr.length - 1] *= Math.sqrt(expArr[i + 2]);
  			i++;
  			// see footnote
  		} else {
  			newArr[newArr.length - 1] *= expArr[i + 1];
  		}
  	} else if (expArr[i] === '/') {
  		if (expArr[i + 1] === 'sqrt') {
  			newArr[newArr.length - 1] /= Math.sqrt(expArr[i + 2]);
  			i++;
  			// see footnote
  		} else {
  			newArr[newArr.length - 1] /= expArr[i + 1];
  		}
  	} else {
  		newArr.push(expArr[i]);
  		newArr.push(expArr[i + 1]);
  	}
  }

  // addition and subtraction
  arg1 = 0;
  arg2 = 0;
  result = 0;
  arg1 = +newArr[0];
  for (let i = 1; i < newArr.length; i += 2) {

  	arg2 = newArr[i + 1];
  	if (newArr[i] === '+') {
  		arg1 += +arg2;
  	} else if(newArr[i] === '-') {
  		arg1 -= +arg2;
  	}
  }
  console.log(arg1);
  return arg1;
  // footnote:
  // can't handle chained square roots --> i.e.) sqrt sqrt 16 would not produce 2
};
