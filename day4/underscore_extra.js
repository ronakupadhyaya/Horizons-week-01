"use strict";

// Underscore function functions (aka Functional Underscore)
//
// Implement the following functions from the underscore library.
// You'll need to use the 'arguments' object and function.apply()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

// Add _.once()

// Write a function called 'memoize' that takes a function 'fn' and returns
// a new function 'memoizedFn' that caches previously computed return values.
//
// When 'memoizedFn' is called with a new argument/parameter value, call
// through to 'fn' and save the result of that call. If 'memoizedFn' is
// called again with the same argument, return the previously saved
// value without calling 'fn'.
//
// You can assume fn takes only a single argument and that this argument is a
// number.
//
// function double(number) {
//   console.log('called');
//   return number * 2;
// }
// var memoizedDouble = memoize(double);
// memoizedDouble(1) -> returns 2, prints 'called'
// memoizedDouble(1) -> returns 2
// memoizedDouble(2) -> returns 4, prints 'called'
// memoizedDouble(2) -> returns 4
//
// This is a simplified version of _.memoize() without hashFunction
// http://underscorejs.org/#memoize
function memoize(func) {
  // YOUR CODE HERE
};

// Implement _.partial()
// http://underscorejs.org/#partial
function partial(fn) {
  // YOUR CODE HERE
}

// Bonus: Implement _.compose()
// http://underscorejs.org/#compose
function compose() {
  // YOUR CODE HERE
}
