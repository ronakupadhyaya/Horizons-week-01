"use strict";

// Underscore function functions (aka Functional Underscore)
//
// Implement the following functions from the underscore library.
// You'll need to use the 'arguments' object and function.apply()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

// Write a function called 'once' that takes a function 'fn' and
// returns a new function that will call through to 'fn' at
// most once.
// Repeated calls to the new function will have no effect.
//
// When you call 'fn' be sure to pass in all arguments
//
// Example.
// function sayHi(name) {
//  console.log('hi ', name);
//  return name;
// }
// var f = once(sayHi);
// f('moose'); // -> logs 'hi moose', returns 'moose'
// f(); // -> logs nothing, returns 'moose'
// f(); // -> logs nothing, returns 'moose'
// f(); // -> logs nothing, returns 'moose'
//
// This is http://underscorejs.org/#once
function once(fn) {
  var called = false;
  var ret;
  return function() {
    if (! called) {
      called = true;
      ret = fn.apply(null, arguments);
    }
    return ret
  }
}


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
  var cache = {};
  return function(num) {
    if (cache.hasOwnProperty(num)) {
      return cache[num];
    }
    cache[num] = func(num);
    return cache[num];
  }
};

// Implement _.partial()
// http://underscorejs.org/#partial
function partial(fn) {
  arguments[0] = null;
  return fn.bind.apply(fn, arguments);
}

// Bonus: Implement _.compose()
// http://underscorejs.org/#compose
function compose() {
  var fns = arguments;
  return function() {
    var first = true;
    var lastRet;
    for (var i = fns.length - 1; i >= 0; i--) {
      var fn = fns[i];
      if (first) {
        lastRet = fn.apply(null, arguments);
      } else {
        lastRet = fn(lastRet);
      }
      first = false;
    }
    return lastRet;
  }
}
