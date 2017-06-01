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
  // console.log(rpnString);

  var arr=rpnString.split(' ');
  // console.log(arr);


  var stack=[];
  var op = [];
  var num = [];
  if(!arr.includes('+')||!arr.includes('-')||!arr.includes('/')||!arr.includes('*'))
  for (var i = 0; i < arr.length; i++) {
    // console.log(arr[i]);
    // console.log(typeof arr[i])


    // console.log(parseFloat(arr[i]));

    // console.log(stack);
    // if(arr[i]==='+'){
    //   console.log(stack.push(stack.unshift() + stack.unshift()))
    // } else if(arr[i]==='-'){
    //   stack.push(stack.unshift() - stack.unshift())
    // } else if(arr[i]==='*'){
    //   stack.push(stack.unshift() * stack.unshift())
    // } else if(arr[i]==='/'){
    //   stack.push(stack.unshift() / stack.unshift())
    // } else{
    //   stack.push(arr[i]);
    // }
    // console.log(stack.length).push()

    // console.log(stack);
    if(arr[i]==='+'){
      var temp1=stack.pop();
      var temp2=stack.pop();
      op.push(arr[i]);
      stack.push(temp2 + temp1);
    } else if(arr[i]==='-'){
      var temp1=stack.pop();
      var temp2=stack.pop();
      op.push(arr[i]);
      stack.push(temp2 - temp1);
    } else if(arr[i]==='*'){
      var temp1=stack.pop();
      var temp2=stack.pop();
      op.push(arr[i]);
      stack.push(temp2 * temp1);
    } else if(arr[i]==='/'){
      var temp1=stack.pop();
      var temp2=stack.pop();
      op.push(arr[i]);
      stack.push(temp2 / temp1);
    } else{
      num.push(arr[i]);
      stack.push(parseFloat(arr[i]));
      console.log(num);

    }
    //console.log(stack.length)

    console.log(stack);

  }
  console.log(op);
  console.log(num);

  if(num.length===1 && op.length===0){
    return stack[0];
  }

  if(num.length!==op.length+1){
    throw Error;
  }

  console.log(stack);
  //console.log(return[0]);
  return stack[0];




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
