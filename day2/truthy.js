"use strict";

window.truthy = {};

// Exercise 1. truthy.isTruthy(thing)
// Write a function that returns the boolean value of its input using the `!` operator
// ex. truthy.isTruthy('a') -> true
// ex. truthy.isTruthy('') -> false
// ex. truthy.isTruthy(113) -> true
// ex. truthy.isTruthy(0) -> false
truthy.isTruthy = function(thing) {
  // YOUR CODE HERE
};

// Exercise 2. truthy.isSortOfEqual(a, b)
// Write a function that takes two arguments, `a` and `b`, and returns true or false when a and b are sort of the same.
// ex. truthy.isSortOfEqual(1, 1) -> true
// ex. truthy.isSortOfEqual(1, 0) -> false
// ex. truthy.isSortOfEqual('1', 1) -> true
// ex. truthy.isSortOfEqual('', ' ') -> false
// ex. truthy.isSortOfEqual([ 'a', 'b' ], 'a') -> false
// ex. truthy.isSortOfEqual([ 'a', 'b' ], { 0: 'a', 1: 'b'}) -> false
// ex. truthy.isSortOfEqual({ 0: 'a', 1: 'b'}, { 0: 'a', 1: 'b'}) -> false
truthy.isSortOfEqual = function(a, b) {
  // YOUR CODE HERE
};

// Exercise 3. truthy.max(a, b)
// Write a function that takes two arguments, `a` and `b`, and returns the argument that has the highest value. If they both have the same value, return the first argument.
// ex. truthy.max(1, 1) -> 1
// ex. truthy.max(-1, 0) -> 0
// ex. truthy.max('1', 1) -> '1'
// ex. truthy.max(0, '0') -> 0
//
truthy.max = function(a, b) {
  // YOUR CODE HERE
};

// Exercise 4.A truthy.and(a, b)
// Write a function that takes two arguments, `a` and `b`, and returns true when BOTH a and b are truthy (`like` true).
// ex. truthy.and(1, 1) -> true
// ex. truthy.and(1, 0) -> false
// ex. truthy.and(false, 1) -> false
// ex. truthy.and(true, '') -> false
truthy.and = function(a, b) {
  // YOUR CODE HERE
};

// Exercise 4.B truthy.or(a, b)
// Write a function that takes two arguments, `a` and `b`, and returns true when at least one of a and b are truthy (`like` true).
// ex. truthy.or(1, 1) -> true
// ex. truthy.or(1, 0) -> true
// ex. truthy.or(false, 1) -> true
// ex. truthy.or(true, '') -> true
truthy.or = function(a, b) {
  // YOUR CODE HERE
};


// Exercise 5. truthy.isReallyEquals(a, b)
// Write a function that takes two  arguments, `a` and `b`, and returns true or false when a and b are equal.
// ex. truthy.compareStr('john', 'John') -> false
// ex. truthy.compareStr('xDvz7h$k', 'xDvz7h$k') -> true
// ex. truthy.isReallyEquals('1', 1) -> false
// ex. truthy.isReallyEquals(1, 1) -> true
// ex. truthy.isReallyEquals(1, 0) -> false
// ex. truthy.isReallyEquals(1, 1.000000000000000000000000000000001) -> true
truthy.isReallyEquals = function(a, b) {
  // YOUR CODE HERE
};
