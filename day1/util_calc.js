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

//ERRORS
  var newExp = expression.split(' ');
  console.log(newExp);
  if(newExp.length % 2 === 0) {
    throw "Even number of items";
  }

  if (expression.length===0){
    throw "Empty expression";
  }

  for (var i = 0; i<newExp.length; i+=2){
    if(isNaN(newExp[i])){
      throw "NaN";
    } else {
      newExp[i]= parseFloat(newExp[i]);
    }
  }

  for (var z = 1; z < newExp.length; z+=2){
    if((newExp[z] != '+') && (newExp[z] != '-') && (newExp[z] != '*') && (newExp[z] != '/')) {
      throw "Not an operator";
    }
  }
console.log(newExp);

 /*var finalExp = [];
 for (var i = 0; i<newExp.length; i++){
   if (i%2===0){
     finalExp.push(parseFloat(newExp[i]));
   } else {
     finalExp.push(newExp[i]);
   }
 }
 console.log (finalExp);*/
//MULTIPLICATION AND DIVISION
  /*var firstMult = newExp.indexOf("*");
  var firstDiv = newExp.indexOf("/");

  while (firstMult !== firstDiv) {
    if (firstMult < firstDiv) {
      var firstArray = [];
      firstArray.push(newExp.slice(0, firstMult));
      firstArray.push(newExp[firstMult-1]*newExp[firstMult+1]);
      firstArray.push(newExp.slice(firstMult+1, newExp.length));
      newExp = firstArray.slice(0); //check
    } else if (firstDiv < firstMult) {
      var firstArray = [];
      firstArray.push(newExp.slice(0, firstDiv));
      firstArray.push(newExp[firstDiv-1]*newExp[firstDiv+1]);
      firstArray.push(newExp.slice(firstDiv+1, newExp.length));
      newExp = firstArray.slice(0); //check
    }
  }*/

//ADDITION AND SUBTRACTION
  var lastOperator = "+";
  var sum = 0;
  sum += newExp[0];
  for (var i = 1; i < newExp.length; i+=2) {
    lastOperator = newExp[i];
    switch (lastOperator) {
      case "+": sum += newExp[i+1];
      break;

      case "-": sum -= newExp[i+1];
      break;
    }
  }
  return sum;


  /*var firstAdd = newExp.indexOf("+");
  var firstSub = newExp.indexOf("-");
  while (firstAdd !== firstSub) {
    if (firstAdd < firstSub) {
      var firstArray = [];
      firstArray.push(newExp.slice(0, firstAdd));
      firstArray.push(newExp[firstAdd-1]*newExp[firstAdd+1]);
      firstArray.push(newExp.slice(firstAdd+1, newExp.length));
      newExp = firstArray.slice(0); //check
    } else if (firstSub < firstAdd) {
      var firstArray = [];
      firstArray.push(newExp.slice(0, firstSub));
      firstArray.push(newExp[firstSub-1]*newExp[firstSub+1]);
      firstArray.push(newExp.slice(firstSub+1, newExp.length));
      newExp = firstArray.slice(0); //check
    }
  }
  return newExp[0];*/
};
