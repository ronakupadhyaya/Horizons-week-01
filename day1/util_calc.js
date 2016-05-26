window.util = {};

// Calculator Exercise

// Write a function calc() that takes a string that
// represents an arithmetic operation (such as "3 + 2") and
// returns the numerical result of the operation.

// We'll start with addition and subtraction only!
// ex. util.calc('3 + 2') -> 5
// ex. util.calc('3 + 8 + 2 + 1    ') -> 14
// ex. util.calc('2 - 1 + 5 + 6') -> 12
// ex. util.calc('    -1 + 3 - 2 + 5') -> 5

util.calc = function(op) {
  // 1. First, using a builtin function you wrote before,
  // trim any whitespace before and after the op string.

  // YOUR CODE HERE

  // 2. See util.splitIntoParts()!
  var tokens = util.splitIntoParts(op);

  // 3. See util.validateExpression()!
  util.validateExpression(tokens[0], tokens[1]);

  var nums = tokens[0];
  var ops = tokens[1];


  // 4. See util.calcOne()! 

  // Hint: create a way to iterate through the arrays of
  // numbers and operations and calculate the collective result.
  // Use util.calcOne() for each operation! 

  // Only worry about addition and subtraction for now -
  // you can jump into operation precedence with multiplication
  // and division in the bonus step below!

  // YOUR CODE HERE


  // Bonus Step! Attempt after Tests 1-19 pass.
  // Now that we've completed addition and subtraction, it's
  // time to tackle operations with precedence (multiplication and division).
  // Rewrite the work you did in Step 4, calcOne()'ing the 
  // multiplication and division parts first.

  // Hint: Take advantage of indexOf() for finding your next operation
  // to complete.

  // YOUR CODE HERE
  // Make sure to comment out or delete your work from Step 4 when testing!

};

// ----------------------------------------------------------------------------

// 2. For this step, we want to take a whitespace-stripped string
// representing an operation that looks like "3 + 3" and turn it into
// a two-dimensional array: the first array with all the parsed
// numbers and the second array with all the operators as strings.

// ex. util.splitIntoParts('3 + 2') -> [[3, 2], ['+']]
// ex. util.splitIntoParts('3 + 8 + 2 + 1') -> [[3, 8, 2, 1], ['+', '+', '+']]
// ex. util.splitIntoParts('2 - 1 + 5 + 6') -> [[2, 1, 5, 6], ['-', '+', '+']]
// ex. util.splitIntoParts('-1 + 3 - 2 + 5') -> [[-1, 3, 2, 5], ['+', '-', '+']]

util.splitIntoParts = function(s) {
  // YOUR CODE HERE
};

// ----------------------------------------------------------------------------

// 3. validateExpression() returns true if the operation resulting from 
// running our calc() function with the given nums and ops array is valid.
// Otherwise, it should throw an exception.

// Write a function that determines that all the elements of the nums array
// are numbers and all of the characters of the ops array are valid
// arithmetic operators.

// ex. util.validateExpression([3, 2], ['+']) -> true
// ex. util.validateExpression([3, 8, 2, 1], ['+', '+', '+']) -> true
// ex. util.validateExpression([2, 1, 5, 6], ['-', '+', '+']) -> true
// ex. util.validateExpression([-1, 3, 2, 5], ['+', '-', '+']) -> true
// ex. util.validateExpression([0, 3, 4], ['-', '+', '/']) -> Exception thrown: "Too many or too few operations"
// ex. util.validateExpression([], []) -> Exception thrown: "Too many or two few operations"
// ex. util.validateExpression([1], []) -> Exception thrown: "Too many or two few operations"
// ex. util.validateExpression(['+', '-', '*'], [1, 2]) -> Exception thrown: "Expected number, got +"

util.validateExpression = function(nums, ops) {
  // YOUR CODE HERE
}

// ----------------------------------------------------------------------------

// 4. calcOne() takes two numbers a and b and returns the numerical
// result of the operation specified by op (could be "+", "-", "*", or "/").

// ex. util.calcOne(3, 4, "+") -> 7
// ex. util.calcOne(3, 0, "/") -> Infinity
// ex. util.calcOne(5, 9, "-") -> -4

util.calcOne = function(a, b, op) {
  // YOUR CODE HERE
};