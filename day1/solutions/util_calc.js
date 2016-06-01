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

  op = op.trim(); // Use builtins.trim() instead!

  // Make one pass through the data to handle sqrt 
  var tokens = op.split(' ');
  var tokens2 = [];
  var found = false;
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (token === 'sqrt') {
      found = true;
      tokens2.push(Math.sqrt(parseFloat(tokens[++i])));
    } else {
      tokens2.push(token);
    }
  }

  if (found && tokens2.length === 1) {
    return tokens2[0];
  }

  // 2. See util.splitIntoParts()!
  tokens = util.splitIntoParts(tokens2.join(' '));

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

  /*
  while (ops.length > 0) {
    var result = util.calcOne(nums[0], nums[1], ops[0]);

    nums = nums.slice(1);
    ops = ops.slice(1);

    nums[0] = result;
  }
  */

  // 5. Now that we've completed addition and subtraction, it's
  // time to tackle operations with precedence (multiplication and division).
  // Rewrite the work you did in Step 4, calcOne()'ing the
  // multiplication and division parts first.

  // Hint: Take advantage of indexOf() for finding your next operation
  // to complete.

  while (ops.length > 0) {
    var nextOp = 0;

    if (ops.indexOf('/') != -1) {
      nextOp = ops.indexOf('/');
    } else if (ops.indexOf('*') != -1) {
      nextOp = ops.indexOf('*');
    }

    var result = util.calcOne(nums[nextOp], nums[nextOp + 1], ops[nextOp]);

    nums.splice(nextOp, 1);
    ops.splice(nextOp, 1);

    nums[nextOp] = result;
  }

  return result;
};

// ----------------------------------------------------------------------------

// 2. For this step, we want to take a whitespace-stripped string
// representing an operation that looks like "3 + 3" and turn it into
// a two-dimensional array: the first array with all the parsed
// numbers and the second array with all the operators as strings.

// Hint: Make sure you are using parseFloat() to convert your strings to numbers
// you can calculate!
// See this for examples of parseFloat():
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat

// ex. util.splitIntoParts('3 + 2') -> [[3, 2], ['+']]
// ex. util.splitIntoParts('3 + 8 + 2 + 1') -> [[3, 8, 2, 1], ['+', '+', '+']]
// ex. util.splitIntoParts('2 - 1 + 5 + 6') -> [[2, 1, 5, 6], ['-', '+', '+']]
// ex. util.splitIntoParts('-1 + 3 - 2 + 5') -> [[-1, 3, 2, 5], ['+', '-', '+']]

util.splitIntoParts = function(s) {
  var tokens = s.split(" ");
  var nums = [];
  var ops = [];

  tokens.forEach(function(token) {
    if (isNaN(token)) {
      ops.push(token);
    } else {
      nums.push(parseFloat(token));
    }
  });

  return [nums, ops];
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
// ex. util.validateExpression([], []) -> Exception thrown: "Too many or too few operations"
// ex. util.validateExpression([1], []) -> Exception thrown: "Too many or too few operations"
// ex. util.validateExpression(['+', '-', '*'], [1, 2]) -> Exception thrown: "Expected number, got +"

util.validateExpression = function(nums, ops) {
  if (ops.length + 1 != nums.length || nums.length == 0 || ops.length == 0) {
    throw "Too many or too few operations";
  }

  _.each(nums, function(num) {
    if (! _.isNumber(num)) throw "Expected number, got " + num;
  });

  _.each(ops, function(op) {
    if (op !== "+" && op !== "-" && op !== "*" && op !== "/") {
      throw "Expected operation, got " + op;
    }
  });

  return true;
}

// ----------------------------------------------------------------------------

// 4. calcOne() takes two numbers a and b and returns the numerical
// result of the operation specified by op (could be "+", "-", "*", or "/").

// ex. util.calcOne(3, 4, "+") -> 7
// ex. util.calcOne(3, 0, "/") -> Infinity
// ex. util.calcOne(5, 9, "-") -> -4

util.calcOne = function(a, b, op) {
  return {
    "+": function (a, b) { return a + b; },
    "-": function(a, b) { return a - b; },
    "*": function(a, b) { return a * b; },
    "/": function(a, b) { return a / b; }
  }[op](a, b);
};
