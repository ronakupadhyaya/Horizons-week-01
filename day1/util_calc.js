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
// ex. util.calc('') -> Error, empty expression /////
// ex. util.calc('1 2') -> Error, missing operator
// ex. util.calc('-') -> Error, no numbers
// ex. util.calc('1 2 +') -> Error, operator at the wrong spot /////
// ex. util.calc('+ 1 -18') -> Error, operator at the wrong spot /////
// ex. util.calc('1 + 55 -2') -> Error, too many numbers /////
// ex. util.calc('29 + + 1') -> Error, too many operators ////
// ex. util.calc('29 + 1 +') -> Error, too many operators /////
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

var isOp = function (char) {
  return (char === '+'||char === '-'||char === '/'||char === '*');
};

util.calc = function(expression) {
  var lastVal = expression[expression.length - 1];
  if (expression.length % 2 === 0) {
    throw new Error ("something's wrong")
  };
  if (expression.length === 0) {
    throw new Error ("empty expression");
  };
  for (var i=0; i<expression.length; i=i+2) {
    if (isOp(expression[i])) {
      throw new Error ("operator at the wrong spot / too many operators")
    }
  };
  for (var i=1; i<expression.length; i=i+2) {
    if (isOp(expression[i])) {
      throw new Error ("operator at the wrong spot / too many operators")
    }
  };
  for (var i=1;i<expression.length; i=i+2) {

  }






// if ((split[split.length - 1] === "+" || split[split.length - 1] === "-" ||
    //      split[split.length - 1] === "*" || split[split.length - 1] === "/" ))

//   for (var i=0; i<expression.length; i=i+2) {
//     if (expression[i] === '+'||'-'||'/'||'*') {
//       if ((expression[0] !== number ||
//       (expression[expression.length - 1] === '+'||'-'||'/'||'*')) {
//         throw new Error ("operator at the wrong spot");
//       }
//       /// OPERATOR AT THE WRONG spot
//       ///NO NUMBERS
//       /// too many numbers
//       /// too many operators
//     } else {
//       throw new Error ("too many operators")
//     }
//   }
//   for (var i=1; i<expression.length; i=i+2) {
//     if (typeof expression[i] === number) {
//       throw new Error ("too many numbers");
//     }
//   }
// }
//


//   var expr = expression.split(" ");
//   var answer = true;
//   var reversed = expr.reverse();
//   if (expr.length === 0) {
//     throw new Error ("empty expression");
//   } else if (typeof expr[0] || typeof reversed[0] !== number) {
//     throw new Error ("operator at the wrong spot");
//   }
//   for (var i=0; i<expr.length; i++) {
//     if (typeof expr[i] && typeof expr[i+1] === number) {
//         throw new Error ("too many numbers")
//       } else if {
//
//       }
//
//       if (parseInt(expr, 10) !== NaN) {
//
//       }
//     }
//   }
// }
//
// if (isOdd
//
//
//
//
//
//
//















//
//
// util.calc = function(expression) {
//   expression = expression.split(" ");
//   if (expression.length === 1 && expression[0] === '') {
//     throw new Error("empty expression");
//   } else if (expression.length % 2 === 0) {
//     throw new Error("too many operators")
//   } else if (expression.length === 1 && typeof parseInt(expression[0]) === "number") {
//     return parseInt(expression[0]);
//   }
//   for (var i = 0; i < expression.length; i = i + 2) {
//     if (typeof parseInt(expression[i]) !== "number") {
//       if (expression[i] === "+"|| "-" || "/" || "*") {
//         throw new Error("operator at the wrong spot");
//       }
//     }
//   }
//   for (var i = 1; i < expression.length; i= i + 2) {
//     if (expression[i] !== "+" || "-" || "/" || "*") {
//       throw new Error("missing operator");
//     }
//   }
//   var answer = 0;
//   while (plusIndex !== -1 || minusIndex !== -1) {
//     var plusIndex = expression.indexOf('+')
//     var minusIndex = expression.indexOf('-')
//     if (plusIndex !== -1) {
//       answer += expression[plusIndex - 1] + expression[plusIndex + 1]
//       expression.splice(plusIndex - 1, plusIndex + 2)
//     }
//     if (expression.indexOf('-') !== -1) {
//       answer -= expression[minusIndex - 1] - expression[mind + 1]
//       expression.splice(minusIndex - 1, minusIndex + 2)
//
//     }
//   }
//   return answer;
// };
