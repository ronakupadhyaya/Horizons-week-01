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
util.isOperator = function(val) {
	return val === "+" || val === "-" || val === "*" || val === "/";
}

util.nullCleaner = function(array) {
	var accum = [];
	for (var i = 0; i < array.length; i++) {
		if (array[i] !== null) {
  			accum.push(array[i]);
		}
	}
	return accum;
}

util.calc = function(expression) {
  var array = expression.split(" ");
  if (expression === "") {
  	throw "Error, empty expression";
  }
  if (util.isOperator(array[0]) || util.isOperator(array[array.length - 1])) {
  	throw "Error, operation at the wrong spot";
  }
  for (var i = 0; i < array.length - 1; i++) {
  	//check if number
  	if (!util.isOperator(array[i]) && array[i] !== "sqrt") {
  		if (!util.isOperator(array[i + 1]) && array[i + 1] !== "sqrt") {
  			throw "Error, too many numbers"
  		}
  	}
  	//check if operator
  	else if (util.isOperator(array[i])) {
  		if (util.isOperator(array[i + 1])) {
  			throw "Error, operator followed by operator"
  		}
  	}
  	//check if sqrt
  	else {
  		if (util.isOperator(array[i + 1])) {
  			throw "Error, sqrt not followed by number"
  		}
  	}
  }
  for (var i = 0; i < array.length; i++) {
  	if (array[i] === "sqrt") {
  		array[i + 1] = Math.sqrt(array[i + 1]);
  		array[i] = null;
  	}
  }
  array = util.nullCleaner(array);

  //multiplication and division
  while (array.includes("*") || array.includes("/")) {
  	var i = Math.min(array.indexOf("*"), array.indexOf("/"));
  	if (array.indexOf("*") === -1) {
  		var i = array.indexOf("/");
  	} else if (array.indexOf("/") === -1) {
  		var i = array.indexOf("*");
  	}
  	if (array[i] === "*") {
  		array[i] = parseFloat(array[i - 1]) * parseFloat(array[i + 1]);
  		array[i - 1] = null;
  		array[i + 1] = null;
  		array = util.nullCleaner(array);
  	} else if (array[i] === "/") {
  		array[i] = parseFloat(array[i - 1]) / parseFloat(array[i + 1]);
  		array[i - 1] = null;
  		array[i + 1] = null;
  		array = util.nullCleaner(array);
  	}
  }

  //add and subtract
  while (array.includes("+") || array.includes("-")) {
  	var i = Math.min(array.indexOf("+"), array.indexOf("-"));
  	if (array.indexOf("+") === -1) {
  		var i = array.indexOf("-");
  	} else if (array.indexOf("-") === -1) {
  		var i = array.indexOf("+");
  	}
  	if (array[i] === "+") {
  		array[i] = parseFloat(array[i - 1]) + parseFloat(array[i + 1]);
  		array[i - 1] = null;
  		array[i + 1] = null;
  		array = util.nullCleaner(array);
  	} else if (array[i] === "-") {
  		array[i] = parseFloat(array[i - 1]) - parseFloat(array[i + 1]);
  		array[i - 1] = null;
  		array[i + 1] = null;
  		array = util.nullCleaner(array);
  	}
  }
  console.log(array);
  return parseFloat(array[0]);
};
