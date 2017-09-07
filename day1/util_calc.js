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


//+2 operator testing
//functions for testing
//f: if it's operator -- if it's a number -- change to an integer -- pemdas
util.calc = function(expression) {
  var newExpression = expression.split(" ");

  for (var x = 0; x < newExpression.length; x++){
    if (newExpression[x] != "+"
    && newExpression[x] != "-"
    && newExpression[x] != "*"
    && newExpression[x] != "/"
    && newExpression[x] != "sqrt") {
      newExpression[x] = parseFloat(newExpression[x]);
    }
  }

  // //EXCEPTIONS
  if (!newExpression[0] || typeof newExpression[0] != "number" && newExpression[0] != "sqrt"){
    throw "Invalid";
  }
  for (var i = 0; i < newExpression.length; i ++){
    if (typeof newExpression[i] === typeof newExpression [i + 1]
    && newExpression[i+1] != "sqrt") {
      throw "Invalid";
    }
  }
  if (typeof newExpression[newExpression.length-1] != "number"){
    throw "Invalid";
  }

//SQUARE ROOT
  for (var u = 0; u < newExpression.length; u++){
    if (newExpression[u] === "sqrt"){
      newExpression[u+1] = Math.sqrt(newExpression[u+1]);
      newExpression.splice(u, 1);
    }
  }

  //MULTIPLICATION - DIVISION
  for (var q = 1; q < newExpression.length; q += 2) {
    if (newExpression[q] === "*") {
      newExpression[q-1] *= newExpression[q+1];
      newExpression.splice(q, 2);
      q -= 2;
    } else if (newExpression[q] === "/") {
      newExpression[q-1] /= newExpression[q+1];
      newExpression.splice(q, 2);
      q -= 2;
    }
  }

  //ADDITION - SUBTRACTION
  for (var j = 1; j < newExpression.length; j += 2) {
    if (newExpression[j] === "+") {
      newExpression[j-1] += newExpression[j+1];
      newExpression.splice(j, 2);
      j -= 2;

    } else if (newExpression[j] === "-") {
      newExpression[j-1] -= newExpression[j+1];
      newExpression.splice(j, 2);
      j -= 2;
    }
  }

  return newExpression[0];
};
