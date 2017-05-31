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


//PART 1: ERRORS

  var numberofNumbers = 0
  var numberofNaN = 0

  //REMOVE ALL THE SPACES
    expression = expression.split(" ")


  //CHECK IF THERE ARE TOO MANY OPERATORS OR NUMBERS
    for (var i=0; i<expression.length; i++) {

if (expression[i] !== 'sqrt') {


      if (isNaN(parseFloat(expression[i]))) {
        numberofNaN += 1
      } else {
        numberofNumbers += 1
      }

      }
  }

  if (numberofNumbers - numberofNaN > 1 ) {
      console.log("Error, too many numbers")
      throw "Error, too many numbers"
    }
  if (numberofNaN - numberofNumbers > -1 ) {
      console.log("Error, too many operators")
      throw "Error, too many operators"
  }

  //CHECK IF THERE ARE TWO OPERATORS SIDE BY SIDE

  for (var i=0; i<expression.length-1; i++) {
    if (expression[i] && expression[i+1] !== 'sqrt') {

    if (  isNaN(parseFloat(expression[i])) && isNaN(parseFloat(expression[i+1]))  ) {
        console.log("Error, operators are in the wrong spot")
        throw "Error, operators are in the wrong spot"
      }
    }
  }

  //CHECK IF THERE ARE OPERATORS BEFORE OR AFTER
if (expression[0] !== 'sqrt') {

var firstItem = parseFloat(expression[0])
var lastItem = parseFloat(expression[expression.length-1])

if (isNaN(firstItem) || isNaN(lastItem)) {
    console.log("Error, operator at the wrong spot")
    throw "Error, operator at the wrong spot"
  }
}

//PART 2: ADDITION AND SUBTRACTION

//IF THERE IS ONLY ONE NUMBER
if (expression.length == 1) {
  return parseFloat(expression[0])
}

//IF THERE ARE MULTIPLE NUMBERS
var stringD = []

stringD.push(parseFloat(expression[0]))

  for (var i=1; i<expression.length;i++) {

if (expression[i] !== 'sqrt') {

    if (expression[i-1] == '+') {
        stringD.push(parseFloat(expression[i]))
    }
    if (expression[i-1] == '-') {
        stringD.push(parseFloat(expression[i])*-1)
    }

    if (expression[i-1] == '*') {
        var prd=parseFloat(expression[i])*stringD[stringD.length-1]
        stringD[stringD.length-1] = prd
    }
    if (expression[i-1] == '/') {
        var div=stringD[stringD.length-1]/parseFloat(expression[i])
        stringD[stringD.length-1] = div
    }
}
    console.log(stringD)
    console.log(expression[i])

    if (expression[i-1] == 'sqrt') {
        stringD.push(math.sqrt(parseFloat(expression[i])))

      console.log(math.sqrt(parseFloat(expression[i])))
    }
  }

console.log(stringD)
//MULTIPLICATION


//SUM ALL IN ARRAY

  var total = 0

  for (var i=0; i<stringD.length; i++) {
    total += stringD[i]
  }

  return total



//END



};
