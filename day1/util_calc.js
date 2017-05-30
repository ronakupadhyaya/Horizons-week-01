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
	var operation = {
    	'+': function (x, y) { return x + y },
    	'-': function (x, y) { return x - y },
    	'*': function (x, y) { return x * y },
    	'/': function (x, y) { return x / y },
    	'sqrt': function (x) { return Math.sqrt(x)}
    };


	if (expression.length == 0) {
		throw "Error, empty expression";
	}
  	var arr = expression.split(" ");
   if (arr.length % 2 == 0 && arr.indexOf('sqrt') == -1) {
  	throw "Wrong balance";
  }


  	for (var i = 0; i < arr.length; i++) {
  		if (!isNaN(arr[i])) {
  			arr[i] = parseFloat(arr[i]);
  		}
  		if (i % 2 == 0 && isNaN(arr[i]) && arr.indexOf('sqrt') == -1) {
  			throw "Misplaced Operator";
  		}
  		if (i % 2 == 1 && !isNaN(arr[i]) && arr.indexOf('sqrt') == -1) {
  			throw "Misplaced Digit";
  		}
  }

  if (arr.length == 1) {
  	return arr[0];
  }


var i = 0;

// arr.splice(0, 3, operation[arr[1]](arr[0], arr[2]));
// console.log("Plus ", arr.indexOf('+'));
// console.log("Minus ", arr.indexOf('-'));
// console.log("Condition", arr.indexOf('+') != -1 || arr.indexOf('-') != -1);


// arr.splice(0, 3, operation[arr[1]](arr[0], arr[2]));
// console.log("Plus ", arr.indexOf('+'));
// console.log("Minus ", arr.indexOf('-'));
// console.log("Condition", arr.indexOf('+') != -1 || arr.indexOf('-') != -1);

// arr.splice(0, 3, operation[arr[1]](arr[0], arr[2]));
// console.log("Plus ", arr.indexOf('+'));
// console.log("Minus ", arr.indexOf('-'));
// console.log("Condition", arr.indexOf('+') != -1 || arr.indexOf('-') != -1);
console.log(arr);

while (arr.indexOf('sqrt') != -1) {
	if (arr[i] == 'sqrt'){
		var op = arr[i];
		var num = arr[i + 1];
		arr.splice(i, 2, operation[op](num));
		i = 0;
	}
	i += 1;
	console.log(arr);
}
while (arr.indexOf('*') != -1 || arr.indexOf('/') != -1) {
	if (arr[i] == '*' || arr[i] == '/'){
		var op = arr[i];
		var fir = arr[i - 1];
		var sec = arr[i + 1];
		arr.splice(i - 1, 3, operation[op](fir, sec));
		i = 0;
	}
	i += 1;
	console.log(arr);
}

i = 0;
while (arr.indexOf('+') != -1 || arr.indexOf('-') != -1){
	if (arr[i] == '+' || arr[i] == '-'){
		var op = arr[i];
		var fir = arr[i - 1];
		var sec = arr[i + 1];
		arr.splice(i - 1, 3, operation[op](fir, sec));
		i = 0;
	}
	i += 1;
	console.log(arr);
}
return arr[0];
};
