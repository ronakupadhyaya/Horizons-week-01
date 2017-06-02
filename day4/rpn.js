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
  var operators = {
    "+": function(a, b){
      return a+b
    },
    "-": function(a,b) {
      return a-b
    },
    "*": function(a,b){
      return a*b
    },
    "/": function(a,b){
      return a/b
    }
  };


  var splitted = rpnString.split(" "); // turns it into an array
  var finalArr = []; // an array used to store final answers

  /*
  has_.has(object, key)
  Does the object contain the given key?
  Identical to object.hasOwnProperty(key), but uses a safe reference
  to the hasOwnProperty function, in case it's been overridden accidentally.
  */
  splitted.forEach(function(x){ //loop through splitted
    if(isNumberString(x)) { //if x in the array is a number //uses the function written for us
      finalArr.push(parseFloat(x));
      // console.log("NUM: " + finalArr);
    } else { //it;s an operator
      //do something here?
      // if there's not operator?? --> throw Error
      if (!_.has(operators, x) ){// checks if array contains operators
        throw "Error: no operator";
      }
      var op = operators[x]; // access it
      if (finalArr.length < 2) {
        throw "Error: not enought numbers";
      }
      var b = finalArr.pop();
      var a = finalArr.pop();
      finalArr.push(op(a,b));
    }
  });
  // console.log(finalArr);
  if (finalArr.length === 1) {
    return finalArr[0];
  } else {
    throw "Error";
  }
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
