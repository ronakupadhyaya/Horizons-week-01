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
  // YOUR CODE HERE
// var array = rpnString.split(" ")
// var numArr = [];
// var operatorArr = [];
//
//
// array.forEach(function(x){
//   if(isNumberString(x)){
//
//     numArr.push(parseInt(x))
//   }
//   else{
//     operatorArr.push(x)
//   }
//
//
// });
//
//
//
// for(var i = 0; i<operatorArr.length; i++){
//   if(operatorArr[i] === "+"){
//     var operand1 = numArr.pop()
//     var operand2 = numArr.pop()
//     numArr.splice(numArr.length-1, 0,(operand2 + operand1))
//   }
//   if(operatorArr[i] === "-"){
//     var operand1 = numArr.pop()
//     var operand2 = numArr.pop()
//     numArr.splice(numArr.length-1, 0,(operand2 - operand1))
//   }
//   if(operatorArr[i] === "+"){
//     var operand1 = numArr.pop()
//     var operand2 = numArr.pop()
//     numArr.splice(numArr.length-1, 0,(operand2 * operand1))
//   }
//   if(operatorArr[i] === "/"){
//     var operand1 = numArr.pop()
//     var operand2 = numArr.pop()
//     numArr.splice(numArr.length-1, 0,(operand2 / operand1))
//   }
//
//
// }
// console.log(numArr)
// console.log(operatorArr)
// return numArr[0]
//
// }





















  var rpnArr = rpnString.split(" ")
  var stack = [];
  var numArr = []
var operand1 = 0
var operand2 = 0
var operatorArr = [];
  rpnArr.forEach(function(x){
    if(isNumberString(x) === true){
      stack.push(parseInt(x))
      numArr.push(parseInt(x))
    }
    if(isNumberString(x) === false){
      operatorArr.push(x)
    }
    if(x === "+"){
      operand1 = stack.pop(x)
      operand2 = stack.pop(x)
      stack.push(operand1 + operand2)

    }
    if(x === "-"){
      operand1 = stack.pop(x)
      operand2 = stack.pop(x)
      stack.push(operand2 - operand1)

    }
    if(x === "*"){
      operand1 = stack.pop(x)
      operand2 = stack.pop(x)
      stack.push(operand1 * operand2)

    }
    if(x === "/"){
      operand1 = stack.pop(x)
      operand2 = stack.pop(x)
      stack.push(operand2 / operand1)

    }






//    stack.push(parseInt(rpnArr[i]))

  });
  console.log(numArr.length , "numArr Length")
  console.log(operatorArr.length, "operatorArr Length")
  if(operatorArr.length !== numArr.length - 1){
    throw "Error"
  }

  return stack[0]



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
