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
  var expressionArr = expression.split(' ');
  var operators = ['+', '-', '*', '/'];
  var operatorCount = 0;
  var numberCount = 0;


  // check for empty expression
  if (expression.length === 0) throw 'Error, insufficient expression';

  // check for invalid expression of 2 items
  if (expressionArr.length === 2) throw 'Error, insufficient expression';

  // verify that beginning and ending elements are not operands
  if (isNaN(expressionArr[0]) || isNaN(expressionArr[expressionArr.length-1]))
    throw 'Error, operator at the wrong spot';

  for (var i=0; i<expressionArr.length; i++) {
    // verify there is no garbage items in string
    if (isNaN(expressionArr[i])
      && operators.includes(expressionArr[i]) === false) {
      throw 'Invalid input';
    }

    // verify there are no consecutive operators
    if (operators.includes(expressionArr[i])) {
      if (i+1 < expressionArr.length
        && operators.includes(expressionArr[i+1])) {
        throw 'Error, too many operators';
      }

      // valid operator
      operatorCount++;
    }

    // verify there are no consecutive numbers
    if (isNaN(expressionArr[i]) == false) {
      if (i+1 < expressionArr.length
        && isNaN(expressionArr[i+1]) === false) {
        throw 'Error, missing operator';
      }

      numberCount++;
    }
  }

  // verify valid number of operators
  if (operatorCount !== numberCount - 1) throw 'Error, invalid';

  /////////////////Begin expression evaluation //////////////////

  //Each element of expressionArr is a valid number or operator

  // For a single element and no operator
  if(expressionArr.length === 1) return parseInt(expressionArr[0]);

  // first pass where multiplication and division is executed
  for (var i=0; i < expressionArr.length; i++) {
    console.log(expressionArr, expressionArr.length, expressionArr[i]);
    if (expressionArr[i] === '*') {
      newVal = parseFloat(expressionArr[i-1]) * parseFloat(expressionArr[i+1]);
      expressionArr.splice(i-1, 3, newVal);
      i--;
    } else if (expressionArr[i] === '/') {
      newVal = parseFloat(expressionArr[i-1]) / parseFloat(expressionArr[i+1]);
      expressionArr.splice(i-1, 3, newVal);
      i--;
    }
  }

  console.log(expressionArr, expressionArr.length);

  // For an indefinite number of numbers
  var masterTotal = 0; // for addition and subtraction
  var lastOperator = '+'; // initialize the last operator
  for(var i =0; i < expressionArr.length; i++) {

    // the item is an operator
    if(operators.includes(expressionArr[i])) {
      lastOperator = expressionArr[i];
    } else {
      switch(lastOperator) {
      case '+':
        var num = parseFloat(expressionArr[i]);
        masterTotal += num;
        break;
      case '-':
        var num = parseFloat(expressionArr[i]);
        masterTotal -= num;
        break;

      }

    }

  }

  return masterTotal;



};
