"use strict";

// ex. 1.1 This exercise has a function that creates
// a bank account for a user. It takes in a username
// and password. In order to login to your created account
// the account has a login command. When you have multiple
// users it is important to note that the passwords for
// each user must be kept separate (only available in the
// local scope of the login function), or else users might have
// access to passwords of their fellow users.
//
// Implement a function vault() that returns a function fn.
// fn takes in a string called attempt and returns true or false
// based on whether the attempt matches password. The purpose of
// this function is to hide the password from prying eyes.
function vault(password) {
  // YOUR CODE HERE
  return function (attempt){
    return attempt===password;
  }
}

// This function returns an object that leaks private information!
// See if you can fix this.
var createUser = function(username, password) {
  return {
    username: username,
    // Delete privatePassword and use vault()
    // to implement the login function
    // YOUR CODE HERE
    login: vault(password)
  }
}

// create a horizons user with password horizonites
var horizons = createUser('horizons', 'horizonites');

// ex. 1.2 Revisit Once
// The function below is the answer for the once
// function exercise in the toolbox in your prepwork.
// You have to modify it to make the following tests
// pass.
//
// The once function takes in a function f
// and returns a function that takes in
// an arbitrary number of arguments and
// calls f given the args. The return function
// should call f at most once, and remember the
// return value in order to keep returning it
// in all subsequent calls.
// Repeated calls to the return function
// should reuturn whatever f returned
// the first time it was called.
//
// var square = function(x) {
//   return x * x;
// }
// var cube = function(x) {
//   return x * x * x;
// }
// var multiply = function(a, b) {
//   return a * b;
// }
// var exponentiate = function(x, y) {
//   return Math.pow(x,y);
// }
// var squareNum = once(square);
// var cubeNum = once(cube);
// var multiplyNum = once(multiply);
// var exponentiateNum = once(exponentiate);
//
// calling squareNum(3) should make it so that
// every later call of squareNum will always
// output 9 (regardless of the arguments). See below.
//
// ex. squareNum(3) -> 9
// ex. squareNum(4) -> 9
// ex. cubeNum(5) -> 125
// ex. cubeNum(6) -> 125
// ex. multiplyNum(5, 6) -> 30
// ex. multiplyNum(6, 7) -> 30
// ex. exponentiateNum(5, 5) -> 3125
// ex. exponentiateNum(6, 5) -> 3125
var once = function(f) {
  var called = false; // Let's create a local variable to track if f has been called
  var used;
  return function() {
    var argLength = arguments.length;
    // first time it's called
    if (! called) { // if f hasn't been called yet
      f(); // call f
      used = arguments;
      // bind to object (this)
      f.apply(this, arguments);
      called = true; // mark f as called
    // after first time it's called
    } else {
      f(); // call f
      f.apply(this, used);
    }
  }
}

// ex. 1.3
// functionFactory takes in two numbers (num1, num2)
// and returns an array of functions where each index
// of the array is a function that returns the next
// number between num1 and num2. Currently this function
// does not work, use closures to fix it and figure out
// a way to account for num1 and num2 being negative
//
// ex. functionFactory(0,2) -> [
//   function() -> 0,
//   function() -> 1,
//   function() -> 2
// ]
//
// ex. functionFactory(-2,1) -> [
//   function() -> -2,
//   function() -> -1,
//   function() -> 0,
//   function() -> 1
// ]
//
// Use closures to fix this function.
//
// functionFactory(0,2) -> [function, function, function]
var functionFactory = function(num1, num2) {
  var functionArray = [];
  for (var i = num1; i <= num2; i++) {
    functionArray[i] = function() {
      // function that returns i
      return i;
    }
  }

  return functionArray;
}
// DO NOT CHANGE THIS FUNCTION
//
// This function takes in numbers from the two labels
// and prints out all numbers in between onto the label.
// It uses functionArray which is an array of functions.
// where each function returns the next number between
// the numbers in the label.
//
// DO NOT CHANGE THIS FUNCTION
var counter = function () {
  var num1 = parseInt(document.getElementById('num1').value);
  var num2 = parseInt(document.getElementById('num2').value);

  var functionArray = functionFactory(num1, num2);

  // lets call the functions in the function array
  document.getElementById('numbers').innerHTML = ""; // clear label
  functionArray.forEach(function(fun) {
    // populate label with return values of the funtions in functionArray
    document.getElementById('numbers').innerHTML += fun() + " ";
  });
}
// DO NOT CHANGE THIS FUNCTION

// TESTS PAST THIS LINE
describe("horizons.password()", function() {
  function beforeEach() {
    var horizons = createUser('horizons', 'horizonites');
  }
  it("horizons.login('horizonites') -> true", function() {
    expect(horizons.login('horizonites')).toBe(true);
  });
});

describe("once()", function() {
  var square = function(x) {
    return x * x;
  }
  var cube = function(x) {
    return x * x * x;
  }
  var multiply = function(a, b) {
    return a * b;
  }
  var exponentiate = function(x, y) {
    return Math.pow(x, y);
  }
  var squareNum = once(square);
  var cubeNum = once(cube);
  var multiplyNum = once(multiply);
  var exponentiateNum = once(exponentiate);

  it("squareNum(3) -> 9", function() {
    expect(squareNum(3)).toEqual(9);
  });
  it("squareNum(4) -> 9", function() {
    expect(squareNum(4)).toEqual(9);
  });

  it("cubeNum(5) -> 125", function() {
    expect(cubeNum(5)).toEqual(125);
  });
  it("cubeNum(6) -> 125", function() {
    expect(cubeNum(6)).toEqual(125);
  });

  it("multiplyNum(5, 6) -> 30", function() {
    expect(multiplyNum(5, 6)).toEqual(30);
  });
  it("multiplyNum(6, 7) -> 30", function() {
    expect(multiplyNum(6, 7)).toEqual(30);
  });

  it("exponentiateNum(5, 5) -> 3125", function() {
    expect(exponentiateNum(5, 5)).toEqual(3125);
  });
  it("exponentiateNum(6, 5) -> 3125", function() {
    expect(exponentiateNum(6, 5)).toEqual(3125);
  });
});

describe("functionFactory()", function() {
  it("functionFactory(0,2) -> [function, function, function]", function() {
    functionFactory(0,2).forEach(function(fun, i) {
      expect(fun()).toEqual(i);
    });
  });
  it("negative numbers functionFactory(-5, 15)", function() {
    functionFactory(-5, 15).forEach(function(fun, i) {
      expect(fun()).toEqual(i-5);
    });
  });
});
