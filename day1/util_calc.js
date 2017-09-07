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

var correction = function(add, sub, mult, div, sqrtArr, indexUsed, offset){
	debugger;
	for(var i = 0; i < add.length; i++){
		if(add[i] > indexUsed){
			add[i] -= offset;
		}
	}

	for(var i = 0; i < sub.length; i++){
		if(sub[i] > indexUsed){
			sub[i] -= offset;
		}
	}

	for(var i = 0; i < mult.length; i++){
		if(mult[i] > indexUsed){
			mult[i] -= offset;
		}
	}

	for(var i = 0; i < div.length; i++){
		if(div[i] > indexUsed){
			div[i] -= offset;
		}
	}

	for(var i = 0; i < sqrtArr.length; i++){
		if(sqrtArr[i] > indexUsed){
			sqrtArr[i] -= offset;
		}
	}
};

util.calc = function(expression) {
  // YOUR CODE HERE

  var sep = [];
  var numOp = 0;
  var numNum = 0;
  var sqrtNum = 0;

  var add = [];
  var sub = [];
  var mult = [];
  var div = [];
  var sqrtArr = [];

  // Convert string to array
  sep = expression.split(' ');
  var lastInput = '';
  var testFirst = parseFloat(sep[0]);

  if(sep[0] == "sqrt") {}

  else if(isNaN(testFirst)){
	  throw "Error, operator at wrong spot.";
  }

  // Seperate
  var number = 0;
  for(var i = 0; i < sep.length; i++){
	  if(sep[i] == "sqrt"){
		  sqrtNum++;
		  lastInput = "sqrt";
	  }
	  else{
	  	number = parseFloat(sep[i]);
	   	if(isNaN(number)){
		  numOp++;

		  if(lastInput == "operator" || lastInput == "sqrt"){
			  throw "Error, operator at wrong spot.";
		  }
		  lastInput = "operator";
	  	} else{
		  numNum++;
		  if(lastInput == "number"){
			 throw "Error, operator at wrong spot.";
		 }
		  lastInput = "number";
	  }
    }
  }
console.log('118');
  // INVALID EXPRESSIONS

  // empty
  if(expression == ''){
	  throw "Error, empty expression.";
  }

  if(numOp !== numNum - 1){
	  throw "Error, missing operator.";
  }

  if(numNum === 0){
	  throw "Error, no numbers.";
  }

console.log('134');
  // Evaluate.

  for(var i = 0; i < sep.length; i+=1){
	 // debugger;
	  var currOp = sep[i];
	  switch(currOp){
		  case '+':
		  	add.push(i);
			    break;
		  case '-':
			sub.push(i);
			    break;
		  case '*':
			mult.push(i);
				break;
		  case '/':
			div.push(i);
				break;
		  case 'sqrt':
		    sqrtArr.push(i);
				break;

	  }

  }
  console.log('157');
  if(sep.length == 1){
	  console.log("Hi.");
	  console.log(sep);
	  var x = parseFloat(sep[0]);
	  return x;
  }

  var newArray = [];
  // first handle placement of mult and div
  for(var i = 0; i < sqrtArr.length; i++){

	newArray = [];
	var input = Math.sqrt(parseFloat(sep[sqrtArr[i] + 1]));

	correction(add, sub, mult, div, sqrtArr, sqrtArr[i], 1);

	for(var j = 0; j < sqrtArr[i]; j++){
		newArray.push(sep[j]);
	}

	newArray.push(input);

	for(var j = sqrtArr[i] + 2; j < sep.length; j++){
		newArray.push(sep[j]);
	}
	sep = newArray.slice();
  }




  for(var i = 0; i < div.length; i++){
	newArray = [];
	var input = parseFloat(sep[div[i] - 1]) / parseFloat(sep[div[i] + 1]);

	correction(add, sub, mult, div, sqrtArr, div[i], 2);

	for(var j = 0; j < div[i] - 1; j++){
		newArray.push(sep[j]);
	}

	newArray.push(input);

	for(var j = div[i] + 2; j < sep.length; j++){
		newArray.push(sep[j]);
	}
	sep = newArray.slice();
  }


  for(var i = 0; i < mult.length; i++){
	  newArray = [];
	  var input = parseFloat(sep[mult[i] - 1]) * parseFloat(sep[mult[i] + 1]);

	  correction(add, sub, mult, div, sqrtArr, mult[i], 2);

	  for(var j = 0; j < mult[i] - 1; j++){
		  newArray.push(sep[j]);
	  }

	  newArray.push(input);

	  for(var j = mult[i] + 2; j < sep.length; j++){
		  newArray.push(sep[j]);
	  }
	  sep = [];
	  sep = newArray.slice();
  }


	debugger;
  for(var i = 0; i < sub.length; i++){
	newArray = [];
	var input = sep[sub[i] - 1] - sep[sub[i] + 1];

	correction(add, sub, mult, div, sqrtArr, sub[i], 2);

	for(var j = 0; j < sub[i] - 1; j++){
		newArray.push(sep[j]);
	}

	newArray.push(input);

	for(var j = sub[i] + 2; j < sep.length; j++){
		newArray.push(sep[j]);
	}
	sep = newArray.slice();
  }

  for(var i = 0; i < add.length; i++){
	  newArray = [];
	  var input = parseFloat(sep[add[i] - 1]) + parseFloat(sep[add[i] + 1]);

	  correction(add, sub, mult, div, sqrtArr, add[i], 2);

	  for(var j = 0; j < add[i] - 1; j++){
		  newArray.push(sep[j]);
	  }

	  newArray.push(input);

	  for(var j = add[i] + 2; j < sep.length; j++){
		  newArray.push(sep[j]);
	  }

	  sep = newArray.slice();
  }



    console.log(newArray);
    return parseFloat(newArray[0]);
};
