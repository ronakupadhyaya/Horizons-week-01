"use strict";

// "RPN" stands for "Reverse Polish Notation".
// See http://en.wikipedia.org/wiki/Reverse_Polish_notation for more information on this colorful term
//
// Briefly, in an RPN world, instead of using normal "infix" notation, e.g.
//     2 + 2
// you use "postfix" notation, e.g.
//     2 2 +
//
// While this may seem bizarre, there are some advantages to doing
// things this way. For one, you never need to use parentheses, since
// there is never any ambiguity as to what order to perform operations
// in. The rule is, you always go from the back, or the left side.
//
//     1 + 2 * 3 =>
//     (1 + 2) * 3 or
//     1 + (2 * 3)
//     1 2 + 3 * => (1 + 2) * 3
//     1 2 3 * + => 1 + (2 * 3)
//
// Another advantage is that you can represent any mathematical formula
// using a simple and elegant data structure, called a stack.
// http://en.wikipedia.org/wiki/Stack_(data_structure)
//
// To calculate an RPN string:
//  - split the string into parts using .split(' ')
//  - for each part of the string
//    - if it's a number, parse it into a number and .push() to stack
//    - if it's an operator, .pop() two items from the stack and apply the
//      operator, push the result back

// Write a function that takes an RPN Math expression and returns the value of it.
// If the expression is not valid you should throw an error.
//
// ex. rpnCalculator('0') -> 0
// ex. rpnCalculator('1 2 +') -> 3
// ex. rpnCalculator('1 2 + 8 *') -> 24
// ex. rpnCalculator('1 2 - -1 * 2 /') -> 0.5
//
// ex. rpnCalculator('0 1') -> Error, too many numbers
// ex. rpnCalculator('*') -> Error, too many operations
// ex. rpnCalculator('1 *') -> Error, too many operations
window.rpnCalculator = function(rpnString) {
  // Split the string into parts
  var rpnStrParts = rpnString.split(" ");
  var operationStack = [];
  var result = 0;

  // If we have just one number, return it.
  debugger;
  if(rpnStrParts.length === 1){
    if(isNum(rpnStrParts[0])){
      return Number.parseInt(rpnStrParts[0]);
    }

    throw new Error("Found only an operator!");
  }

  // For each element, either push a number, or pop and evaluate an operation
  //debugger;
  for(var str of rpnStrParts){

    // If number --> push
    if(isNum(str)){
      operationStack.push(str);

    } else if(isOp(str) && operationStack.length > 1){
      result = performOp(Number.parseInt(operationStack.pop()),
        str,
        Number.parseInt(operationStack.pop()));

        operationStack.push(result);
    } else {
        throw new Error("Error! Incorrect Format");
    }

  }
  if(operationStack.length === 1){
    console.log(operationStack[0]);
    return operationStack.pop();
  }

  throw new Error("The operation stack is not empty!");

}

// Gets an op from a string and performs the correct operation
function performOp(num1, op, num2){
  switch(op) {
  case '*':
    return num1 * num2;
  case '/':
    return num2 / num1;
  case '+':
    return num1 + num2;
  case '-':
    return num2 - num1;
  default:
    return new Error("Invalid op passed to performOp()");
  }
}

function isOp(str){
  return str.length === 1
    && ["*", "/", "+", "-"].indexOf(str) !== -1
}

function isNum(str){
  return !isNaN(str);
}


// This function returns true if given string represents a valid number.
//
// ex. isNumberString('a') -> false
// ex. isNumberString('*') -> false
// ex. isNumberString('0.1') -> true
// ex. isNumberString('-1') -> true
// ex. isNumberString('0') -> true
// ex. isNumberString('-0.4') -> true
function isNumberString(str) {
  if (! _.isString(str)) {
    return false;
  }

  if (! str.length) {
    return false;
  }

  // isNaN() is a built-in JavaScript function that stands for is-Not-A-Number()
  // It works on strings too. Read more about it here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
  return ! isNaN(str);
}
