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

var inputCheck = function(expression){
  var operators = ["+","-","*","/"]
  var expressionArray = expression.split(" ");
  if(expression === "" || expressionArray.length % 2 === 0){
    throw "Error, invalid expression";
  }
  if(isNaN(parseInt(expressionArray[0]))|| isNaN(parseInt(
    expressionArray[expressionArray.length-1]))){
    throw "Error, operator in wrong place"
  }
  for(var i = 1; i < expressionArray.length; i += 2){
    if(operators.indexOf(expressionArray[i]) === -1){
      throw "Error, input in wrong order";
    }
  }


}
// Part 2. Implement support for addition and subtraction.
//
// ex. util.calc('1') -> 1
// ex. util.calc('-12') -> -12
// ex. util.calc('3 + 2') -> 5
// ex. util.calc('3 + 8 + 2 + 1    ') -> 14
// ex. util.calc('2 - 1 + 5 + 6') -> 12
// ex. util.calc('-1 + 3 - 2 + 5') -> 5
//

var addSub = function(expression){
  var expressionArray = expression.split(" ");
  if (expressionArray.length === 1) {
    return parseInt(expression);
  }
  var total = parseFloat(expressionArray[0]);
  for(var i = 2; i < expressionArray.length; i+= 2){
    if(expressionArray[i-1] === "+"){
      total += parseFloat(expressionArray[i]);
    } else if(expressionArray[i-1] === "-"){
      total -= parseFloat(expressionArray[i]);
    }
  }
  return total;
}
// Part 3. Implement support for multiplication and division.
// Note that the order of operations matters. Multiplication and division needs
// to be perfomed before addition and subtraction.
//
// ex. util.calc('1 * 3 / 5 + 2') -> 2.6
// ex. util.calc('1 + 3 / 2 - 5') -> -2.5
// ex. util.calc('5 * 6 + 8 / 9 * 4.5') -> 34
// ex. util.calc('1 / 0 + 1 * 0') -> Infinity
// ex. util.calc('1 / 0 * 0 + 1') -> NaN
var calculate = function(expression){
  var expressionArray = expression.split(" ");
  var expressionArrayCopy = expression.split(" ");
  for(var i = 1; i < expressionArray.length; i+= 2){
    if(expressionArray[i] === "*"){
      var tempIndex = expressionArrayCopy.indexOf("*")
      var product = parseFloat(expressionArrayCopy[tempIndex-1]) *
     parseFloat(expressionArrayCopy[tempIndex+1]);
      expressionArrayCopy.splice(tempIndex-1,3,product);
      console.log(expressionArray,expressionArrayCopy);
    } else if(expressionArray[i] === "/"){
      var tempIndex = expressionArrayCopy.indexOf("/");
      var quotient = parseFloat(expressionArrayCopy[tempIndex-1]) / parseFloat(expressionArrayCopy[tempIndex+1]);
      expressionArrayCopy.splice(tempIndex-1,3,quotient);
      console.log(expressionArrayCopy)
    }
  }
  var expressionNew = expressionArrayCopy.join(" ");
  return addSub(expressionNew);
}
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
  inputCheck(expression);
  // return addSub(expression);
  return calculate(expression);
};
