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
// ex. util.calc('') -> Error, empty expression DONE
// ex. util.calc('1 2') -> Error, mission operator DONE
// ex. util.calc('-') -> Error, no numbers DONE
// ex. util.calc('1 2 +') -> Error, operator at the wrong spot
// ex. util.calc('+ 1 -18') -> Error, operator at the wrong spot
// ex. util.calc('1 + 55 -2') -> Error, too many numbers DONE
// ex. util.calc('29 + + 1') -> Error, too many operators DONE
// ex. util.calc('29 + 1 +') -> Error, too many operators DONE
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
  // YOUR CODE HERE
  var stringArray = expression.split(" ");
  var opCounter = 0;
  var numCounter = 0;

  for (var i = 0; i < stringArray.length; i++) {
    if(isOperator(stringArray[i])) {
      opCounter++;
      //if(stringArray[i].indexOf % 2 != 0) throw "Error, operator at the wrong spot";
    } else if(!isNaN(stringArray[i])) {
      numCounter++;
    }

  }
  if(stringArray[0] === '') throw "Error, empty expression";
  if(opCounter === 0) throw "Error, missing operator";
  if(numCounter === 0) throw "Error, no numbers";
  if(opCounter >= numCounter) throw "Error, too many operators";

  // console.log("opCounter " + opCounter + ";" + "numCounter " + numCounter);
  //else if(stringArray.length % 2 == 0) throw "Incorrect expression";

  //return eval(expression);
};

isOperator = function(arg) {
  var arrayOp = ["+", "-", "/", "*"];
  for(var i = 0; i < arrayOp.length; i++) {
    if(arrayOp[i] === arg) return true;
  }
  return false;
}
