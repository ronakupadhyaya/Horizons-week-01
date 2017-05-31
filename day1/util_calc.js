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

util.helper = {};

util.helper.ops = {
	"+": function(a,b){ return a + b; },
	"-": function(a,b){ return a - b; },
	"*": function(a,b){ return a * b; },
	"/": function(a,b){ return a / b; }
}

util.helper.convert_numbers = function(arr){
	for(var i = 0 ; i < arr.length ; i++){
		if(!isNaN(Number.parseInt(arr[i]))){
			arr[i] = Number(arr[i]);
		}
	}
}

util.helper.check_exception = function(arr){
	if(arr.length < 1){
		throw "Error, empty expression";
	}
	if(isNaN(arr[0])){
		throw "Error, operator at the wrong spot";
	}
	for(var i = 0 ; i < arr.length ; i++){
		if(i % 2 == 0){
			if(isNaN(arr[i])){
				throw "Error, too many operators";
			}
		}else{
			if(!isNaN(arr[i])){
				throw "Error, too many numbers";
			}
		}
	}
	if (isNaN(arr[arr.length - 1])) {
		throw "Error, too many operators";
	}
};

util.helper.add_sub = function(arr) {
	var total = arr[0];
	for (var i = 1; i < arr.length; i += 2) {
		total = util.helper.ops[arr[i]](total, arr[i + 1]);
	}
	return total;
};

util.helper.mult_div = function(arr) {
	for (var i = 1; i < arr.length; i += 2) {
		if (arr[i] === "*" || arr[i] === "/") {
			arr.splice(i - 1, 3, util.helper.ops[arr[i]](arr[i - 1], arr[i + 1]));
			i -= 2;
		}
	}
};

util.calc = function(expression) {
	if (expression === '') {
		throw "Error, empty expression";
	}
	arr = expression.split(" ");
	util.helper.convert_numbers(arr);
	util.helper.check_exception(arr);
	util.helper.mult_div(arr);
	if(arr.length === 1) {return arr[0];}
	return util.helper.add_sub(arr);

};


