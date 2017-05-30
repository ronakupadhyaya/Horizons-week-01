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
  var array = [];
  //throw error if incorrect input
  if (expression.length < 1) {
    //console.log("Error at "+0);
    throw "Error: not enough digits";
  }
  //split expression into array of its indices;
  array = expression.split(' ');

  //check for sqrt
  for (var i=0; i<array.length; i++) {
    if (array[i] ==='sqrt') {
      array[i+1]= Math.sqrt(array[i+1]);
      array.splice(i,1);
    }
  }

  //check for errors
  for(var i = 0; i<array.length; i+=2) {
    array[i] = parseInt(array[i]);

    if (isNaN(array[i])) {
      throw "Error: not enough numbers";
    }
  }
  for (i = 1; i<array.length; i += 2) {
    if (!isNaN(parseInt(array[i]))) {
      throw "Error: not enough operators";
    }

    if (i === array.length-1 && isNan(parseInt(array[i]))) {
      throw "Error: too many operators";
    }
  }

  //multiply/divide numbers:
  var stack = [];
  for(var i=0; i<array.length; i++) {
    var c = array[i];
    if (c != "/" && c != "*") {
      stack.push(c);
    } else if (c === "/") {
      var first = stack.pop();
      var second = array[i+1];
      stack.push(first/second);
      i++;
    } else if (c === "*") {
      var first = stack.pop();
      var second = array[i+1];
      stack.push(first*second);
      i++;
    }
  }

  //add and subtract numbers:
  var stack2 = [];
  for(var i=0; i<stack.length; i++) {
    var c = stack[i];
    if (typeof c === "number") {
      stack2.push(c);
    } else if (c === "+") {
      var first = stack2.pop();
      var second = stack[i+1];
      stack2.push(first+second);
      i++;
    } else if (c === "-"){
      var first = stack2.pop();
      var second = stack[i+1];
      stack2.push(first-second);
      i++;
    } else {
      throw "Error: invalid input";
    }
  }

  return stack2[0];
};
