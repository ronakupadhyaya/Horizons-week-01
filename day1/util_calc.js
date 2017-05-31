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

util.Errors = function(expression) {
  var number = true
  var operator = false
  var argList = expression.split(' ')
  if (expression === '') {
      throw "Error"
  }
  for (var i = 0; i < argList.length; i++) {
      if (argList[i] === 'sqrt') {
          continue;
      }
      else if (number && isNaN(argList[i])) {
          throw "Error"
      }
      else if (operator && !isNaN(argList[i])) {
          throw "Error"
      }
      number = !number
      operator = !operator
  }
  if (number) {
      throw "Error"
  }
};

util.Add = function(argList) {
    var sum = parseFloat(argList[0])
    for (var i = 2; i < argList.length; i+=2) {
        if (argList[i-1] === '+') {
            sum += parseFloat(argList[i])
        }
        else if (argList[i-1] === '-') {
            sum -= parseFloat(argList[i])
        }
    }
    return sum
}

util.calc = function(expression) {
  util.Errors(expression)

  var argList = expression.split(' ')
  var current = parseFloat(argList[0])
  var total = 0
  for (var i = 1;i < argList.length; i+=2 ) {
      if (argList[i] === '*') {
          current *= parseFloat(argList[i+1])
      }
      if (argList[i] === '/') {
          current /= parseFloat(argList[i+1])
      }
      if (argList[i] === '+') {
          total += current
          current = parseFloat(argList[i+1])
      }
      if (argList[i] === '-') {
          total += current
          current = -1 * parseFloat(argList[i+1])
      }
  }
  total += current
  return total




  // var root = argList.indexOf("sqrt")
  // if (root !== -1) {
  //     argList[root+1] = Math.sqrt(parseFloat(argList[root+1]))
  //     argList.splice(root,1)
  // }
  //
  // for (var i = 1; i < argList.length; i +=2) {
  //     if (argList[i] === '*') {
  //         argList[i+1] = parseFloat(argList[i-1]) * parseFloat(argList[i+1])
  //         argList[i-1] = null
  //         argList[i] = null
  //     }
  //     else if (argList[i] === '/') {
  //         argList[i+1] = parseFloat(argList[i-1]) / parseFloat(argList[i+1])
  //         argList[i-1] = null
  //         argList[i] = null
  //     }
  // }
  // return util.Add(argList.filter(function(val) { return val !== null; }))

};
