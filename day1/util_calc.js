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

function checkValid(toCheck) {

  // a string is valid if:
  // space-seprated
  // alternates numbers and operators
  // begins and ends with a number

  var tokens = toCheck.split(' ');
  console.log(tokens);

  if ( tokens.length % 2 === 0 ) {
    throw "Even number of arguments"
  }

  for (var i = 0; i < tokens.length; i++) {

    if (i % 2 === 0) { //for even index
      // this should be a number
      if ( isNaN(parseFloat(tokens[i])) === true ) {
        throw "Expected a number, found " +
          tokens[i] +
          " at position " + i;
      }
    } else {
      // this should be an operator
      if (!( tokens[i] === '+' ||
        tokens[i] === '-' ||
        tokens[i] === '*' ||
        tokens[i] === '/')) {
        throw "Expected an operator, found " +
          tokens[i] +
          " at position " + i;
      }
    }
  }



}


// Part 2. Implement support for addition and subtraction.
//
// ex. util.calc('1') -> 1
// ex. util.calc('-12') -> -12
// ex. util.calc('3 + 2') -> 5
// ex. util.calc('3 + 8 + 2 + 1    ') -> 14
// ex. util.calc('2 - 1 + 5 + 6') -> 12
// ex. util.calc('-1 + 3 - 2 + 5') -> 5
//

function plusMinus(expression) {
  var tokens = expression.split(' ');

  var result = parseFloat(tokens[0]);
  for (var i = 1; i < tokens.length; i+=2) {
    if (tokens[i] === '+') {
      result += parseFloat(tokens[i+1]);
    } else if (tokens[i] === '-') {
      result -= parseFloat(tokens[i+1]);
    }
  }

  return result;
}

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

//"1 + 2 - 3"
//"1 + 3 * 4 - 2" ---> "1 + 12 - 2" ---> "11"
//"1 + 3 * 4 - 2 / 2" ---> "1 + 12 - 1" ---> "12"
//"1 + 3 * 4 / 2 - 2" --->  1 + 12 / 2 - 2  ----> "1 + 6 - 2" ---> "5"
function multDiv(expression) {
  // FIRST ATTEMPT!
  // RAN INTO AN ISSUE WITH CHAINING (and more)
  //var tokens = expression.split(' ');

  // var result = "";
  // for ( var i = 1; i < tokens.length; i+=2) {
  //   if ( tokens[i] === '+' || tokens[i] === '-') {
  //     result += tokens[i-1] + ' ' + tokens[i] + ' ';
  //
  //     // check if next character is the final character
  //     // this is because we want to add the last one
  //     if (i+1 === tokens.length-1) {
  //       result += tokens[i+1];
  //     }
  //   } else if (tokens[i] === '*') {
  //     result += tokens[i-1] * tokens[i+1];
  //   } else if (tokens[i] === '/') {
  //     result += tokens[i-1] / tokens[i+1];
  //   }
  // }

  var tokens = expression.split(' ');

  var i = 1;
  while(i < tokens.length) {
    if ( tokens[i] === '+' || tokens[i] === '-') {
      i += 2;
    } else if (tokens[i] === '*') {
      var prod = tokens[i-1] * tokens[i+1]

      // i = 1
      // 3 * 2 + 1
      // 6 + 1 * 9
      // 6 + 9
      tokens = tokens.slice(0, i-1).concat([prod], tokens.slice(i+2, tokens.length));

    } else if (tokens[i] === '/') {
      var quot = tokens[i-1] / tokens[i+1];

      tokens = tokens.slice(0, i-1).concat([quot], tokens.slice(i+2, tokens.length));
    }
  }
  // turn tokens into a string

  return tokens.join(' ');
}


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
  checkValid(expression);

  return plusMinus(multDiv(expression));
};
