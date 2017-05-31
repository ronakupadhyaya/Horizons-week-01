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
  var operators = ["+", "-", "*", "/"]
  var expressionArr = expression.split(" ");
  var needsNum = true;

  //square roots
  debugger;
  if (expressionArr.indexOf("sqrt") !== -1) {
    var rootIndex = expressionArr.indexOf("sqrt");
    var tempRoot = Math.sqrt(parseFloat(expressionArr[rootIndex + 1]));
    expressionArr.splice(rootIndex, 2);
    expressionArr.splice(rootIndex, 0, tempRoot);
  }

  //if empty, throws error
  if (expression.length === 0) {
    throw "Error, empty expression";
  }
  //if the last value in the array is an operator, throw error
  if (operators.indexOf(expressionArr[expressionArr.length - 1]) !== -1) {
    throw "Error, too many operators";
  }
  //if the number and operator (in that order) don't alternate, throw error
  for (var i = 0; i < expressionArr.length; i++) {
    if(needsNum) {
      if(operators.indexOf(expressionArr[i]) !== -1) {
        throw "Error, too many operators";
      }
    }
    else {
      if(operators.indexOf(expressionArr[i]) === -1) {
        throw "Error, too many numbers";
      }
    }
    needsNum = !needsNum;
  }
  

  var nums = []
  var ops = []
  var sum = 0
  //addition and subtraction

  //if length one, return the number as is
  if (expressionArr.length == 1) {
    return (parseFloat(expressionArr[0]));
  }

  expressionArr.forEach(function (val) {
    if (operators.indexOf(val) !== -1) {
      console.log('ops', val);
      ops.push(val);
    }
    else {
      if (operators.indexOf(val) === -1) {
        console.log('nums', val);
        nums.push(val);
      }
    }
  });

var counter = 0;
for(var i = 0; i < ops.length; i++) {
  if(nums.length > 1) {
    if(ops[i] == "*") {
      var tempProduct = parseFloat(nums[i - counter]) * parseFloat(nums[i + 1 - counter]);
      nums.splice(i - counter, 2);
      nums.splice(i - counter, 0, tempProduct);
      counter++;
    }
    if(ops[i] == "/") {
      var tempProduct = parseFloat(nums[i - counter]) / parseFloat(nums[i + 1 - counter]);
      nums.splice(i - counter, 2);
      nums.splice(i - counter, 0, tempProduct);
      counter++;
    }
  }
}

for(var i = 0; i < ops.length; i++) {
  if(nums.length > 1) {
    if(ops[i] == "+") {
      var tempSum = parseFloat(nums[0]) + parseFloat(nums[1]);
      nums.splice(0, 2);
      nums.unshift(tempSum);
    }
    if(ops[i] == "-") {
      var tempSum = parseFloat(nums[0]) - parseFloat(nums[1]);
      nums.splice(0, 2);
      nums.unshift(tempSum);
    }
  }
}
return parseFloat(nums[0]);
};

//THIS IS WHEN WE GOT PART 3