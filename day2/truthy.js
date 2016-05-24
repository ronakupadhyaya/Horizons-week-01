"use strict";

window.truthy = {};

// Exercise 1. truthy.is(thing)
// Write a function that returns the boolean value of its input using the `!` operator
// ex. truthy.is('a') -> true
// ex. truthy.is('') -> false
// ex. truthy.is(113) -> true
// ex. truthy.is(0) -> false
//
// hint. !!true -> true
truthy.is = function(thing) {
  // YOUR CODE HERE
};

// Exercise 2. truthy.isEqual(a, b)
// Write a function that takes two arguments, `a` and `b`, and returns true or false when a and b are equivalent.
// ex. truthy.isEqual(1, 1) -> true
// ex. truthy.isEqual(1, 0) -> false
// ex. truthy.isEqual('1', 1) -> true
// ex. truthy.isEqual('', ' ') -> false
// ex. truthy.isEqual([ 'a', 'b' ], 'a') -> false
// ex. truthy.isEqual([ 'a', 'b' ], { 0: 'a', 1: 'b'}) -> false
// ex. truthy.isEqual({ 0: 'a', 1: 'b'}, { 0: 'a', 1: 'b'}) -> false
///
// hint. maybe use `===`? `==`? 
// hint. see: http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons
truthy.isEqual = function(a, b) {
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
//
// hint. think about the binary analogs of true and false => 1 and 0 respectively. 1 * 1 is 1; what about 1 * 0 or 0 * 0?
truthy.and = function(a, b) {
  // YOUR CODE HERE
};

// Exercise 4.B truthy.or(a, b)
// Write a function that takes two arguments, `a` and `b`, and returns true when at least one of a and b are truthy (`like` true).
// ex. truthy.or(1, 1) -> true
// ex. truthy.or(1, 0) -> true
// ex. truthy.or(false, 1) -> true
// ex. truthy.or(true, '') -> true
//
// hint. mthink about the binary analogs of true and false again! What kind of operator do you think you can use?
truthy.or = function(a, b) {
  // YOUR CODE HERE
};

// Exercise 5. truthy.compareStr(a<string>, b<string>)
// Write a function that takes two strings as arguments, `a` and `b`, and returns true or false when a and b are equal.
// ex. truthy.compareStr('john', 'John') -> false
// ex. truthy.compareStr('xDvz7h$k', 'xDvz7h$k') -> true
// ex. var s = "To be or not to be, that is the question. Whether `tis nobler in the mind to suffer the slings and arrows of outrageous fortune..`";
//  truhty.compareStr(s, s) -> true
//
truthy.compareStr = function(a, b) {
  // YOUR CODE HERE
};

// Exercise 6. truthy.compareNum(a<number>, b<number>)
// Write a function that takes two numbers as arguments, `a` and `b`, and returns true or false when a and b are equal.
// ex. truthy.compareNum(1, 1) -> true
// ex. truthy.compareNum(1, 0) -> false
// ex. truthy.compareNum(1, 1.000000000000000000000000000000001) -> true
//
truthy.compareNum = function(a, b) {
  // YOUR CODE HERE
};
