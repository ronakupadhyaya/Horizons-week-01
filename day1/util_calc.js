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
util.isOperator = function(str){
  switch(str) {
  case "+":
    return true;
  case "-":
    return true;
  case "/":
    return true;
  case "*":
    return true;
  default:
    return false;
  }
}

util.findOperator = function(arr2){
  var isFound = false
  var opIndex;
  for(var i = 0; i<arr2.length; i++){
    if (util.isOperator(arr2[i])){
      if(!isFound){
        isFound = true;
        opIndex = i;
      }
      if(arr2[i]==="/" || arr2[i]==="*"){
        opIndex = i;
        return opIndex
      }
    }
  }
  return opIndex
}

util.performOperation = function(intA, Op, intB){
  intA = Number.parseFloat(intA);
  intB = Number.parseFloat(intB);
  switch(Op) {
  case "+":
    return intA + intB;
  case "-":
    return intA - intB;
  case "/":
    return intA / intB;
  case "*":
    return intA * intB;
  default:
    throw "performOperation did not recieve operation"
  }
}

util.evaluateSqrt = function(str, num){

}

util.calc = function(expression) {
  // HANDLE EMPTY EXPRESSION
  if(expression === ""){
    throw "Error: Empty expression";
  }
  // SPLIT THE EXPRESSION ON SPACES
  var arr = expression.split(" ");
  //console.log(arr);

  // HANDLE NO NUMBERS IN EXPRESSION
  if(util.isOperator(arr[0])){
    throw "Error: no numbers";
  }

  if(util.isOperator(expression[expression.length - 1])){
    throw "Error: operator at end of expression";
  }

  // HANDLE INCOMPLETE EXPRESSION
  if(arr[0]!="sqrt"){

  if(arr.length == 2){
    throw "Error, Length = 2"
  }

  for(var i = 0; i < arr.length-1; i+=2) {
    if(!util.isOperator(arr[i+1])) {
      throw "Error: Missing operator";
    }
  }
}
  if(arr.length == 1){
    return Number.parseFloat(arr[0]);
  }
  var sqrtIndex = arr.indexOf("sqrt");
  var sqrtResult = 0;
  while(arr.length >= 2 && sqrtIndex != -1){
    sqrtResult = Math.sqrt(arr[sqrtIndex + 1]);
    arr.splice(sqrtIndex,2,sqrtResult);
    sqrtIndex = arr.indexOf("sqrt");
    console.log(arr);
  }
  while(arr.length >= 3){


    var loc =  util.findOperator(arr)
    result = util.performOperation(arr[loc-1],arr[loc],arr[loc+1]);
    arr.splice(loc-1,3,result);
    console.log(result);
  }

  return result;

};
