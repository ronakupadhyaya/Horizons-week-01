"use strict";

window.varArgs = {};

// Exercise 0. varArgs.numArgs(args...)
// Write a function that takes any number of arguments and returns the number of arguments you gave it.
// ex. varArgs.numArgs(1, 5, 'a', { 'x': 13}) -> 4
// ex. varArgs.numArgs(1, 8) -> 2
// ex. varArgs.numArgs() -> 0
//
// Try to insert, pop or push another 'argument' inside the function into the list of arguements. What happens?
// Hint: see <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments> for details about the `arguments` data structure
varArgs.numArgs = function() {
  // TODO: YOUR CODE HERE
};


// Exercise 1. varArgs.sum(args...)
// Write a function that takes any number of integers as arguments and computes their sum.
// ex. varArgs.sum(1) -> 1
// ex. varArgs.sum(1, 2, 4) -> 7
// ex. varArgs.sum() -> 0
//
varArgs.sum = function() {
  // TODO: YOUR CODE HERE
};

// Exercise 2. varArgs.product(args...)
// Write a function that takes any number of integers as arguments and computes their product.
// ex. varArgs.product(1) -> 1
// ex. varArgs.product(1, 2, 4) -> 8
// ex. varArgs.product() -> 0
//
varArgs.product = function() {
  // TODO: YOUR CODE HERE
};

// Exercise 3. varArgs.joinWith(args...)
// Write a function that takes a delimiter as the first argument and any number of strings for the rest of the arguments, and joins the distinct strings together in order with the delimiter in between.
// ex. varArgs.joinWith(',', 'a', 'b') -> 'a,b'
// ex. varArgs.joinWith('.', '192', '168', '1', '1') -> '192.168.1.1'
//
varArgs.joinWith = function() {
  // TODO: YOUR CODE HERE
};
