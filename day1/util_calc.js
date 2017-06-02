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
util.calc = function(expression) {
  // YOUR CODE HERE
  if (expression === null) {return;}
  if (expression === '') {throw "Error, empty expression"};

  var newArr = expression.split(' ');

  // console.log(newNum);
  var index = newArr.indexOf('sqrt');
  if (index != -1) {
    var newNum = eval(Math.sqrt(newArr[index+1]));
    if (newArr.length === 2) {
      return newNum
    } else {

    newArr.splice(index, index + 2);
    // console.log(newNum);
    newArr.splice(index, 0, String(newNum));
    // console.log(newArr);
   }
  }

  // console.log(newArr);
  if (newArr.length === 1) {
    if (!isNaN(newArr[0])) {
      return eval(newArr[0])}
     else {
      throw "Error, no numbers";
    }
  }

  // if (newArr.length === 1) {  return eval(newArr[0])}


  if (newArr.length > 1 && newArr.indexOf('+') + newArr.indexOf('-') +
      newArr.indexOf('/') + newArr.indexOf('*') === -4) {
        throw "Error, mission operator";
      };
  if (newArr.indexOf('1') + newArr.indexOf('2') +
      newArr.indexOf('3') +newArr.indexOf('4') +
      newArr.indexOf('5') + newArr.indexOf('6') +
      newArr.indexOf('7') + newArr.indexOf('8') +
      newArr.indexOf('9') + newArr.indexOf('0')=== -10) {
        throw "Error, no numbers";
      }

  // if (isNaN(arr[0]) || isNaN(arr[arr.length])) {
  //   throw "Error, operator at the wrong spot";
  // }

  var operator = 0, number = 0;
  for (var i = 0; i < newArr.length; i++) {
    if (isNaN(newArr[i])) {
      operator += 1;
    } else {
      number += 1;
    }
  }
  if (operator >= number) {
    throw "Error, too many operators";
  }
  if (operator + 1 <  number) {
    throw "Error, too many numbers";
  }

  for (var i = 0; i < newArr.length - 1; i += 2) {
    if (!isNaN(newArr[i])) {
      if (!isNaN(newArr[i+1])) {
        throw "Error, operator at the wrong spot"
      }
    }
    if (isNaN(newArr[i])){
      throw "Error, operator at the wrong spot"
    }

  }


 return eval(expression);


};
