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
  //takes RPN Math expression
  // splite the PRN string (.split())
  //if number parse it --> store into two sep variables

  //String --> Array
  var string = rpnString;
  var array = string.split([" "]);
  //console.log(array);

  //order Array
  var numbers = [];
  var operators = [];
  for (var i = 0; i < array.length; i++){
    if (isNumberString(array[i])){
      numbers.push(array[i])
    } else{
      operators.push(array[i])
    }
  }
//  console.log(numbers)
  //console.log(operators)

  //compare lengths
  if (numbers.length  !== operators.length+1){
    throw "error";
  }

  //calculate
  var sorted = [];
  for (var i = 0; i < array.length; i++){
    if (isNumberString(array[i])){
      sorted.push(array[i])

    } else{
        console.log(sorted);
      var val1 = sorted[sorted.length-2];
      var val2 = sorted[sorted.length-1];
      var temp = sorted.slice(sorted.length-2).join(" "+ array[i] + " ");
      sorted.splice(sorted.length-2,2);
      console.log(eval(temp));
      //sorted.splice(0,2);
      sorted.push(eval(temp));

      //console.log(eval(temp))
      //sorted.unshift(eval(temp));
      //console.log(temp);
      //console.log(eval(temp));
      //console.log(sorted)

    }
  }


  //return number
  return Number(sorted);
  //console.log(sorted)



  //https://en.wikipedia.org/wiki/Reverse_Polish_notation
  // look at the example --> need to use index to reference the previosu two numbers befor ethe operator and store those values

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
