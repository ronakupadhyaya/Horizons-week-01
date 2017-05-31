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
	// First, we'll create an array with each bit of the expression without the spaces.
	var arr = util.intoArray(expression)

	// Part 1. If an invalid expression is given, throw an exception.
		//1. Empty array 
		if (arr == []) {
			throw "Error, empty expression"
		} 

		//2. Don't have a sandwich where numbers=bread and operators=meat  
		if (arr.length % 2 == 0) {
			throw "Error"
		}; 

		for (var i = 0; i < arr.length; i+=2) {
		if (util.isOperator(arr[i])) {
			throw "Error"
			}
		}

		if (util.isOperator(arr[arr.length-1])) {
			throw "Error"
		}

		//3. Doesn't have an operator
		var operators = []; 
		for (var i = 0; i < arr.length; i++) {
			if (util.isOperator(arr[i])) {
				operators.push(arr[i]); 
			}
		} 
		if (operators == []) {
			throw "Error"
		} 

		//4. Doesn't have a number 
		var numbers = []; 
		for (var i = 0; i < arr.length; i++) {
			if (!util.isOperator(arr[i])) {
				numbers.push(arr[i]); 
			}
		} 
		if (numbers == []) {
			throw "Error"
		} 

		//5. Number of operators = number of numbers - 1 
		if (operators.length != numbers.length -1) {
			throw "Error"
		}

	// Part 3. Implement support for multiplication and division.
	while (arr.indexOf("*") != -1 || arr.indexOf("/") != -1) {
		if (arr.indexOf("*") != -1 && arr.indexOf("/") != -1) {
			if (arr.indexOf("*") < arr.indexOf("/")) {
				var op = "*"
				i = arr.indexOf("*")
				var result = util.evaluate(i, op, arr);  
				arr.splice(i-1, 3, result); 
			} else {
				var op = "/"
				i = arr.indexOf("/")
				var result = util.evaluate(i, op, arr); 
				arr.splice(i-1, 3, result)
			}
		} else {
			while (arr.indexOf("*") != -1) {
				var op = "*"
				i = arr.indexOf("*")
				var result = util.evaluate(i, op, arr);  
				arr.splice(i-1, 3, result);
			} 
			while (arr.indexOf("/") != -1) {
				var op = "/"
				i = arr.indexOf("/")
				var result = util.evaluate(i, op, arr); 
				arr.splice(i-1, 3, result)
			}
		}; 	
	}	



	// Part 2. Implement support for addition and subtraction.
	while (arr.indexOf("+") != -1 || arr.indexOf("-") != -1) {
		if (arr.indexOf("+") != -1 && arr.indexOf("-") != -1) {
			if (arr.indexOf("+") < arr.indexOf("-")) {
				var op = "+"
				i = arr.indexOf("+")
				var result = util.evaluate(i, op, arr); 
				arr.splice(i-1, 3, result);  
			} else {
				var op = "-"
				i = arr.indexOf("-")
				var result = util.evaluate(i, op, arr); 
				arr.splice(i-1, 3, result)
		} else {
				while (arr.indexOf("+") != -1) {
					var op = "+"
					i = arr.indexOf("+")
					var result = util.evaluate(i, op, arr); 
					arr.splice(i-1, 3, result);
				} 
				while (arr.indexOf("-") != -1) {
					var op = "-"
					i = arr.indexOf("-")
					var result = util.evaluate(i, op, arr); 
					arr.splice(i-1, 3, result);
				}
			}	
			} 
		}
	return parseFloat(arr[0]); 
};


		util.intoArray = function(arg) {
			// Trimming using a regular expression. LOOK INTO REGULAR EXPRESSIONS 
			var expression = arg.replace(/\s+/g,' ').trim();
			var temp = [];
			var start = 0;
			var end = 0;
			for (var i = 0; i < expression.length; i++) {	
				if (expression[i] == ' ') {
					end = i;
					temp.push(expression.substring(start,end));
					start = i + 1;
				} 
				if (i == expression.length - 1) {
					end = i + 1;
					temp.push(expression.substring(start,end));
				}

			}
			return temp;
		};

		util.isOperator = function(bit) {
			if (bit == "+" || bit == "-" || bit == "*" || bit == "/") {
				return true; 
			}
			return false; 
		}; 

		util.evaluate = function(i, op, arr) {
			num1 = parseFloat(arr[i-1]); 
			num2 = parseFloat(arr[i+1]); 
			if (op == "*") {
				return num1 * num2; 
			} else if (op == "/") {
				return num1 / num2; 
			} else if (op == "+") {
				return num1 + num2; 
			} else {
				return num1 - num2;
			}
		}; 
 























