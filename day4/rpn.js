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
  var array = rpnString.split(" ");
  var checkArray = rpnString.split(" ");
  var calcArray = []
  var count = 0
  for (var x=0; x<array.length; x++) {
    if (!isNaN(parseInt(array[x],10))) {calcArray.push(parseInt(array[x],10))
    }
    else {
      if (array[x] === "+") {
        var a =  calcArray.pop();
        var b =  calcArray.pop();
        var value = b+a;
        calcArray.push(value);
        count++
      }
      if (array[x] === "-") {
        var a =  calcArray.pop();
        var b =  calcArray.pop();
        var value = b-a;
        calcArray.push(value);
        count++
      }
      if (array[x] === "*") {
        var a =  calcArray.pop();
        var b =  calcArray.pop();
        var value = b*a;
        calcArray.push(value);
        count++
      }
      if (array[x] === "/") {
        var a =  calcArray.pop();
        var b =  calcArray.pop();
        var value = b/a;
        calcArray.push(value);
        count++
      }
    }
  }
  if (calcArray.length !==1 ||  count === array.length || checkArray.length%2 !== 1) {
    throw "error"
  }
  else {
    return calcArray[0]}
}






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
