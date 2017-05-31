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
util.calc = function(expression) {
  if(expression.length === 0){
    throw "empty expression";
  }
  var arr = expression.split(' ');
  if(arr.length === 1){
    if(!isNaN(arr[0])){
      return parseFloat(arr[0]);
    } else {
      throw "error: only one non-number entered";
    }
  } else if(arr.length === 2 && arr.indexOf("sqrt") === -1){
    throw "error: only two inputs, one not sqrt";
  } else if(isNaN(arr[arr.length-1])){
    throw "error: last must be a number";
  } else if(!(arr[arr.length-2] === '+' ||
              arr[arr.length-2] === '-' ||
              arr[arr.length-2] === '/' ||
              arr[arr.length-2] === '*' ||
              arr[arr.length-2] === "sqrt")){
    throw "error: second to last must be an operator";
  }
  /*
  if(arr.length % 2 == 0){
    throw "error, too many arguments";
  }
  for(var i  = 0; i < arr.length; i++){
    if(i % 2 == 0){
      if(isNaN(arr[i])){
        throw "error, invalid number";
      } else if(arr.length === 1){
        return parseFloat(arr[0]);
      }else{
        arr[i] = parseFloat(arr[i]);
      }
    } else {
      if(!(arr[i] === '+' ||
      arr[i] === '-' ||
      arr[i] === '/' ||
      arr[i] === '*')){
        throw "error, not an operator";
      }
    }
  }
  */

  for(var i = 0; i < arr.length-2; i++){
    if(!isNaN(arr[i])){
      if(!(arr[i+1] === '+' ||
      arr[i+1] === '-' ||
      arr[i+1] === '/' ||
      arr[i+1] === '*' ||
      arr[i+1] === "sqrt")){
        throw "error, number not followed by operator";
      }
    } else if(arr[i] === '+' ||
               arr[i] === '-' ||
               arr[i] === '/' ||
               arr[i] === '*' ||
               arr[i] === 'sqrt') {

      if(isNaN(arr[i+1]) && arr[i+1] != "sqrt"){
        throw "error, operator not followed by a number";
      }
    }
  }

  for(var i  = 0; i < arr.length; i++){
    if(!isNaN(arr[i])){
      arr[i] = parseFloat(arr[i]);
    }
  }

  while(true){
    var sqrtIndex = arr.indexOf("sqrt");
    if(sqrtIndex !== -1){
      arr[sqrtIndex] = Math.sqrt(arr[sqrtIndex+1]);
      arr.splice(sqrtIndex+1, 1);
    }

    if(arr.indexOf("sqrt") === -1){
      break;
    }
  }

  while(true){
    var indexDiv = arr.indexOf("/");
    var indexMul = arr.indexOf("*");
    if (indexDiv > indexMul) {
      if(indexMul == -1){
        var newVal = arr[indexDiv-1] / arr[indexDiv+1];
        arr[indexDiv - 1] = newVal;
        arr.splice(indexDiv, 2);
      } else {
        var newVal = arr[indexMul-1] * arr[indexMul+1];
        arr[indexMul - 1] = newVal;
        arr.splice(indexMul, 2);
      }
    } else if (indexDiv < indexMul) {
      if (indexDiv == -1) {
        var newVal = arr[indexMul-1] * arr[indexMul+1];
        arr[indexMul - 1] = newVal;
        arr.splice(indexMul, 2);
      } else {
        var newVal = arr[indexDiv-1] / arr[indexDiv+1];
        arr[indexDiv - 1] = newVal;
        arr.splice(indexDiv, 2);
      }
    }
    if(arr.indexOf("/") === -1 && arr.indexOf("*") === -1){
      break;
    }
  }

  while(true) {
    if(arr[1] === "+"){
      arr[0] = arr[0] + arr[2];
      arr.splice(1, 2);
    } else if(arr[1] === "-"){
      arr[0] = arr[0] - arr[2];
      arr.splice(1, 2);
    }

    if(arr.length === 1){
      break;
    }
  }

  return arr[0];

};
