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
  var parts = expression.split(" ");
  // ["2", "+", "3"]

  // check length of parts, bc only num are good
  if (parts.length === 1){
    // if not NaN
    if (parseInt(parts[0]) !== NaN){
      throw new Error('error');
    }
  }

  // error, missing operator
  var opArray = ["+","-","/","*","sqrt"];

  for (var i = 0; i < opArray.length; i++){
    var foundOp = false;
    // found the thing
    if (parts.indexOf(opArray[i]) !== -1){
      foundOp = true;
      break;
    }
  }
  if (!foundOp){
    throw new Error('missing operator');
  }

  // if even args then error
  if (parts.length%2===0){
    throw new Error('even args');
    // if odd args
  } else {

    // odd op
    // even num

    // even stuff
    // check that everything even is a number
    for (var i = 0; i < parts.length; i+=2){
      // check to see that thing is
      if (parseInt(parts[i]) ===NaN){
        throw new Error('even not num');
      }
    }

    // odd stuff
    // check that everything odd is an operator
    for (var i=1; i < parts.length; i +=2){
      if (parts.indexOf(opArray[i++]) !== -1){
        throw new Error('odd not opp');
      }
    }

    throw new Error('operator at wrong spot')
  }

  // 1 2 +
  // + 1 -18

}
