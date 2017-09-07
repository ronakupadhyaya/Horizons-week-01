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

  var argArray = expression.split(" ");

  var i = 0;
  while( i < argArray.length){
    if( argArray[i] == 'sqrt') {
      argArray[i] = Math.sqrt(parseInt(argArray[i + 1]));
      argArray.splice(i + 1, 1);
    }

    console.log(argArray);
    i++;
  }

  if (argArray.length % 2 == 0) throw "Need one more number or one fewer."
  for(var i = 0; i < argArray.length; i ++){
    if (i % 2 == 0 && isNaN(parseInt(argArray[i]))){

      throw "Operator misplaced."
    }

    if (i % 2 == 1 && !isNaN(parseInt(argArray[i]))){

      throw "Number misplaced."
    }
  }

  if (argArray.length == 1) return parseInt(argArray[0]);

  if (argArray.length <= 2) throw "You forgot something.";

  for(var h = 0; h < argArray.length; h += 2) argArray[h] = parseFloat(argArray[h]);

  var i = 1;

  while(i < argArray.length){
    if (argArray[i] == "*"){
      argArray[i - 1] = argArray[i - 1] * argArray[i + 1];
      argArray.splice(i, 2);

    } else if (argArray[i] == "/") {
      argArray[i - 1] = argArray[i - 1] / argArray[i + 1];
      argArray.splice(i, 2);

    } else {
      i += 2;
    }
  }

  while(i < argArray.length){
    if (argArray[i] == "*"){
      argArray[i - 1] = argArray[i - 1] * argArray[i + 1];
      argArray.splice(i, 2);
      console.log(argArray);
    } else if (argArray[i] == "/") {
      argArray[i - 1] = argArray[i - 1] / argArray[i + 1];
      argArray.splice(i, 2);
      console.log(argArray);

    } else {
      i += 2;
    }
  }

  var j = 1;

  while(j < argArray.length){
    if (argArray[j] == "+"){
      argArray[j - 1] = argArray[j - 1] + argArray[j + 1];
      argArray.splice(j, 2);
      console.log(argArray);
    } else if (argArray[j] == "-") {
      argArray[j - 1] = argArray[j - 1] - argArray[j + 1];
      argArray.splice(j, 2);
      console.log(argArray);

    } else {
      j += 2;
    }
  }

  return argArray[0];

};
