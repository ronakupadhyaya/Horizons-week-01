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
  // YOUR CODE HERE
  var splitted = expression.split(" ");
  var numbers = [];
  var operators = [];
  var res = 0;
  var temp = 0;
  var counter = 0;
  if (expression.length < 1) {
    throw "Error";
  }
  var sqrt_counter = 0;
  for (var i=0; i < splitted.length; i++) {
    if (splitted[i] === 'sqrt')
      sqrt_counter += 1;
  }
  while (sqrt_counter > 0) {
    var ind = splitted.indexOf('sqrt');
    var new_value = Math.sqrt(Number(splitted[ind + 1]));
    splitted.splice(ind, 2);
    splitted.splice(ind, 0, new_value);
    sqrt_counter -= 1;
  }
  if (splitted[splitted.length-1] === "+" || splitted[splitted.length-1] === "-" || splitted[splitted.length-1] === "*" || splitted[splitted.length-1] === "/") {
    throw "Error"
  }
  for (var i = 0; i < splitted.length; i++) {
    if (i % 2 == 0) {
      if (splitted[i] === "+" || splitted[i] === "-" || splitted[i] === "*" || splitted[i] === "/") {
        throw "Error";
      }
    } else {
      if (splitted[i] !== "+" && splitted[i] !== "-" && splitted[i] !== "*" && splitted[i] !== "/") {
        throw "Error";
      }
      if (splitted[i] === "*" || splitted[i] === "/") {
        counter += 1;
      }
    }
  }
  for (var i=0; i < splitted.length; i++) {
    if (i % 2 == 0) {
      numbers.push(Number(splitted[i]));
    } else {
      operators.push(splitted[i]);
    }
  }
  while (counter > 0) {
    for (var i=0; i<operators.length;i++) {
      if (operators[i] === '*') {
        tmp = numbers[i] * numbers[i+1];
        operators.splice(i,1);
        numbers.splice(i,2);
        numbers.splice(i,0,tmp);
        counter -= 1;
        break;
      } else if (operators[i] === '/') {
        tmp = numbers[i] / numbers[i+1];
        operators.splice(i,1);
        numbers.splice(i,2);
        numbers.splice(i,0,tmp);
        counter -= 1;
        break;
      }
    }
  }
  while (operators.length > 0) {
    for (var i=0; i < operators.length; i++) {
      console.log(i)
      console.log(operators[i])
      if (operators[i] === '+') {
        tmp = numbers[i] + numbers[i+1];
        operators.splice(i,1);
        numbers.splice(i,2);
        numbers.splice(i,0,tmp);
        break;
      } else if (operators[i] === '-') {
        tmp = numbers[i] - numbers[i+1];
        operators.splice(i,1);
        numbers.splice(i,2);
        numbers.splice(i,0,tmp);
        break;
      }
    }
  }
  return numbers[0];
};
