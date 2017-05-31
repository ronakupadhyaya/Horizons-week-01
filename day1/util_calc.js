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
	
	var ops = '+-*/';

	if (expression == ''){
		throw ('Empty expresion');
	}
	var expr = expression;
	for (var i = 0;i<expression.length;i++){
		if ((ops.indexOf(expr[i])== -1) && expr[i]!= ' '){ //if this is a number
			if (expr[i+1]==' ' && ops.indexOf(expr[i+2])==-1 && expr[i]!='t'){ //if next item is space and one after is number
				throw "operator not in correct spot; 2 consecutive numbers";
			}
			if (ops.indexOf(expr[i+2])!=-1 && expr[i+2]!=' '){ //if 2 over is an operator
				if (expr[i+2]=='-'){
					if (ops.indexOf(expr[i+3]==-1) && expr[i+3]!=' '){  //if the thing after the - is an operator
						throw "2 consecutive numbers";

					}
				}
			}

		}
		else if (ops.indexOf(expr[i]!=-1)&& expr[i]!=' '){ //if this is an operator
			if (i==0 && expr[i+1]==' '){
				throw 'operator at beginning'; 
			}
			if (i==expr.length-1){
				throw "operator at the end";
			}

			if (ops.indexOf(expr[i+2])!=-1 && expr[i+2]!=' '){ //if 2 over is an operator
				throw "too many operators";

			}
		}
	}
	var mathArr = Array.prototype.slice.call(arguments);
	mathArr = mathArr[0].split(' ');
	console.log(mathArr);


	var final = parseFloat(mathArr[0]);	

	var sqrt_ind = mathArr.indexOf('sqrt');
	while(sqrt_ind != -1){
		final = Math.sqrt(parseFloat(mathArr[sqrt_ind+1]));
		mathArr.splice(sqrt_ind,2);
		mathArr.splice(sqrt_ind	,0,final.toString());
		sqrt_ind = mathArr.indexOf('sqrt');
	}


	var div_ind = mathArr.indexOf('/');	
	while(div_ind != -1){
		final = parseFloat(mathArr[div_ind-1]);
		final /= parseFloat(mathArr[div_ind+1]);
		mathArr.splice(div_ind-1,3);
		mathArr.splice(div_ind-1,0,final.toString());
		div_ind = mathArr.indexOf('/');
	}

	var mult_ind = mathArr.indexOf('*');
	while(mult_ind != -1){
		final = parseFloat(mathArr[mult_ind-1]);
		final *= parseFloat(mathArr[mult_ind+1]);
		mathArr.splice(mult_ind-1,3);
		mathArr.splice(mult_ind-1,0,final.toString());
		mult_ind = mathArr.indexOf('*');
	}

	var answer = parseFloat(mathArr[0]);
	for (var i=0;i<mathArr.length;i++){
		if (mathArr[i]=='+'){
			answer += parseFloat(mathArr[i+1]);
		}
		else if (mathArr[i] == '-'){
				answer -= parseFloat(mathArr[i+1]);
			}

	}









		// for (var i=0;i<mathArr.length;i++){
		// 	if (mathArr[i]=='+') {
		// 		final += parseFloat(mathArr[i+1]);
		// 	}
		// 	else if (mathArr[i] == '-'){
		// 		final -= parseFloat(mathArr[i+1]);
		// 	}
		// }
	console.log(answer);
	return parseFloat(answer);














  /*
  if (expression == '')
  	throw('Empty expression');
  
	var expr = expression;
	var flag = -1;
	for (var i = 0; i < expr.length; i++) {
		var check = typeof(parseInt(expr[i]));
		//if (ops.indexOf(expr[i+2]== -1 && expr.length != 1)){
			//throw "missing operator";
		//}

		if (check == 'number' && ops.indexOf(expr[i]) == -1) {// if expr[i] is a number
			flag = 1; 
			if (ops.indexOf(expr[i + 2]) == -1) // check if the next item is a number
				throw ('Too many numbers');		// throw error
			if (expr[i + 2] == '-')		// check if next item is a negative sign
				if (expr[i + 3] != ' ')
					throw 'Too many numbers';
		}
		else if (check == 'number' && ops.indexOf(expr[i]) != -1) { // if an operator exists
			if (i == 0 || i == expr.length - 1)
				throw ('Wrong spot');
			if (ops.indexOf(expr[i - 2]) != -1 || ops.indexOf(expr[i + 2]) != -1) // if 2 before and 2 after is an operator
				throw ('Too many operators');
		}
	}
	if (flag == -1) 
		throw('No numbers');
	*/

};
