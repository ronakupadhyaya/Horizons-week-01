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


  var parts = rpnString.split(' ')


  var numbers = 0, ops = 0


//ERROR CHECKING HERE
  for(var i = 0; i < parts.length; i++){
    if( parts[i] === '+' || parts[i] === '-' || parts[i] === '*' || parts[i] === '/'){
      ops++
    }else{
      numbers++
    }
  }

  //console.log(numbers, ops)

  if(ops > numbers - 1 || ops === 0 && numbers === 0 || ops === 0 && numbers > 1 ){
    throw new Error("Error")
  }

  var stack = []

  parts.forEach(function(element){
    if("+-*/".indexOf(element) === -1){
      //its a number so you can push it
      //console.log(parseInt(element))
      stack.push(parseInt(element))
    }else{
      //its an operator so you can get two and perform operations
      if(element === '+'){
        var second = stack.pop()
        var first = stack.pop()
        stack.push(first + second)

      }else if(element === '-'){
        var second = stack.pop()
        var first = stack.pop()
        stack.push(first  - second)

      }else if(element === '*'){
        var second = stack.pop()
        var first = stack.pop()
        stack.push(first * second)

      }else if(element === '/'){
        var second = stack.pop()
        var first = stack.pop()
        stack.push(first / second)
      }
    }
  });

  var boop = stack.pop()
  return boop


//OPERATIONS

  // var stack = []
  //
  // for(var i = 0; i < parts.length; i++){

  //
  //   }else if(  isNumberString(parts[i])  ){
  //     stack.push(parts[i]);
  //   }else{
  //     console.log("problem")
  //   }
  // }


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
