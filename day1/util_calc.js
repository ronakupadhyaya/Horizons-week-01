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

function checkValid(exp) {
  // 1. empty
  // 2. alternate number, operator
  // 3. length odd

  if (exp.length === 0 || exp.length % 2 === 0) {
    throw "invalid length";
  }
  var ops = ["+", "-", "*", "/"]
  for(var i = 0; i < exp.length; i++){

    if(i % 2 && !ops.includes(exp[i])) {
        throw "Non operator in wrong place"
    } else if (i % 2 === 0 && isNaN(parseFloat(exp[i]))) {
        throw "non number found in wrong place"
    }
  }
}

function addSubtract(exp) {
  //left to right
  //var resultSoFar
  //start with first thing
  //resultSoFar updates from operator number (+1 or -6)
  //to the end

  var result = parseFloat(exp[0]);
  for (var i = 1; i < exp.length; i+=2) {
    if(exp[i] === '+'){
      result += parseFloat(exp[i+1]);
    } else if (exp[i] === '-') {
      result -= parseFloat(exp[i+1]);
    }
  }

  return result;
}

function multdiv(exp) {
// left to right on operators
// only do stuff for mult division
// do action on left and right
// replace <left self right> with <result>
//continue finding operators
//done when reach the end

for (var i = 1; i < exp.length; i+=2){
  if(exp[i] === '*') {
    var mult = parseFloat(exp[i-1]) * parseFloat(exp[i+1]);
    exp.splice(i-1, 3, mult);
    i-=2;
  } else if(exp[i] === '/'){
    var divi = parseFloat(exp[i-1]) / parseFloat(exp[i+1]);
    exp.splice(i-1, 3, divi);
    i-=2;
  }
}
  console.log(exp);
  return exp;
}

util.calc = function(expression) {
  var exp = expression.trim().split(' ');
  checkValid(exp);
  return addSubtract(multdiv(exp));


};
