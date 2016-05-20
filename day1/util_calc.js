window.util = {};

// Bonus Exercise! Write a function calc() that takes a string
// that represents an arithmetic operation (such as "3 + 2") and
// returns the numerical result of the operation.

// Essentially, we are rewriting 

// We'll take this step-by-step.

util.calc = function(op) {
  // 1. See util.stripWhitespace()!
  op = util.stripWhitespace(op);

  // 2. See util.explode()!
  var parsed = util.explode(op);
  var nums = parsed[0];
  var ops = parsed[1];

  // 3. See util.calcOne()! 

  // Hint: you'll be using calcOne() multiple times.
  // Use the loop below and for each calcOne() call,
  // replace the original two numbers in the nums array
  // with the result of calcOne().

  // Only worry about addition and subtraction for now;
  // we'll be jumping into precedence with multiplication
  // and division next!

  while(ops.length > 0) {
    // YOUR CODE HERE
    var result = util.calcOne(nums[0], nums[1], ops[i]);

    nums = nums.slice(1);
    ops = ops.slice(1);

    nums[0] = result;
  }

};

util.stripWhitespace = function(s) {

  // 1. First, use the builtins we created earlier to remove all
  // whitespace from the string "op". Hint: use search() and a while 
  // loop to find all occurrences of whitespace and remove!

  // Double-hint: the condition for the while loop should using
  // your search function!

  // YOUR CODE HERE
  while (builtins.search(s, " ")) {
    s = s.substring(0, s.indexOf(" ")) + s.substring(s.indexOf(" ") + 1);
  }
  return s;
};

util.explode = function(s) {
  // 2. For this step, we want to take a whitespace-stripped string
  // representing an operation that looks like "3+3" and turn it into
  // two arrays: one with the numbers between operators and one with
  // the operators themselves.

  // ex. util.explode("3+5+6+7.1") -> [[3, 5, 6, 7.1], ["+", "+", "+"]]

  // To do this, we need to use regular expressions - TODO

  // YOUR CODE HERE 

};

util.calcOne = function(a, b, op) {
  // 3. calcOne() takes two numbers a and b and returns the numerical
  // result of the operation specified by op (could be "+", "-", "*", or "/").

  // ex. util.calcOne(3, 4, "+") -> 7
  // ex. util.calcOne(3, 0, "/") -> Infinity
  // ex. util.calcOne(5, 9, "-") -> -4

  // YOUR CODE HERE
  return eval(a + op + b);

  return {
    "+": function (a, b) { return a + b; },
    "-": (a, b) => a - b,
    "*": (a, b) => 
  }[op](a, b);
}