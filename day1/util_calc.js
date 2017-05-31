window.util = {};

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
				var i = arr.indexOf("*")
				var result = util.evaluate(i, op, arr);  
				arr.splice(i-1, 3, result); 
			} else {
				var op = "/"
				var i = arr.indexOf("/")
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
			}
		}
		else {
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