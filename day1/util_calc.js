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

1 + 2 * 3

util.calc = function(expression) {
  // YOUR CODE HERE
  var calculate = function (a, b, operator){
  	switch(operator) {
  		case '+': return a+b;
  		case '-': return a-b;
  		case '*': return a*b;
  		case '/': return a/b;
  	}
  };

  var trimArray = function(){
  	for (var i = parsedArray.length-1; i >= 0; i--){
  		if (parsedArray[i] === '')
  			parsedArray.splice(i, 1);
  	}
  };

  if (expression === "")
  	throw "Empty expression";
  var array = expression.split(" ");
  var operators = [['*', '/'],["+", "-"]];
  var parsedArray = [];
  for (var i = 0; i < array.length; i++){
  	if (!isNaN(parseFloat(array[i])))
  		parsedArray.push(parseFloat(array[i]));
  	else
  		parsedArray.push(array[i]);
  }
  if (isNaN(parsedArray[0]) || isNaN(parsedArray[array.length-1]))
  	throw "Error, operator at the wrong spot";
  for (var i = 0; i < parsedArray.length; i++){
  	if ((i % 2 === 0 && isNaN(parsedArray[i]) || (i % 2 !== 0 && !isNaN(parsedArray[i]))))
  		throw "Error, invalid expression";
  }
  if (array.length === 1)
  	return parseInt(expression);
  console.log(parsedArray);
  for (var i = 0; i < 2; i++){
  	for (var j = 0; j < parsedArray.length; j++){
  		var operator = operators[i].indexOf(parsedArray[j]);
  		if (operator !== -1){
  			 console.log(parsedArray[j-1]);
  			 console.log(parsedArray[j]);
  			 console.log(parsedArray[j+1]);
  			parsedArray[j+1] = calculate(parsedArray[j-1], parsedArray[j+1], operators[i][operator]);
  			parsedArray[j-1] = '';
  			parsedArray[j] = '';
  			console.log(parsedArray[j+1]);
  		}
  	}
  console.log(parsedArray);
  trimArray();
  console.log(parsedArray);
  }
  trimArray();
  return parsedArray[0];
};
