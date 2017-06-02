"use strict";

//In this exercise, we're going to look into recursion
window.recursion = {};


//A recursive function is one that calls or returns itself (usually, changing parameters)
//These functions consist of a base case, where the function finally stops calling itself
//And a recursive case where the function will call itself again with different parameters


//Example 1
//This function sums the first n numbers from 1 to n (number), inclusive
recursion.sum = function (number) {
  //Base case
  if (number === 1) {
    return 1;
  }

  //Recursive case
  return recursion.sum(number - 1) + number;
}


//As such, a function will continue calling itself until the base case is reached
//Then the function returns cascade back to the original call so that it may return too
//This original call couldn't until then because it had been waiting on the function it called (itself) to return first

//You could think of this as a stack of plates, each new plate on top representing a new function call made
//You cannot get to the original plate until you first take off (finish) all the ones on top of it


//Exercise 1
//Write a function that computes the factorial of a given integer
//Please note that factorial 0 is 1
//ex. factorial(4) -> 4! -> 4 * 3 * 2 * 1 -> 24
recursion.factorial = function (number) {
  if (number <= 1)
    return 1;
  return recursion.factorial(number - 1) * number;
}


//Exercise 2
//Write a function that computes the nth integer of the fibonacci sequence
//ex. fibonacci(0) -> 0
//ex. fibonacci(1) -> 1
//ex. fibonacci(2) -> 0 + 1 -> 1
//ex. fibonacci(3) -> 1 + 1 -> 2
//ex. fibonacci(4) -> 1 + 2 -> 3
recursion.fibonacci = function (number) {
  switch (number) {
    case number < 1:
      return 0;
    default:
      var answer = 1;
      var lastAnswer = 0;
      var tmp;

      var rec = function (number) {
        if (number <= 1) {
          return;
        }
        rec(number - 1);
        tmp = answer;
        answer = lastAnswer + answer;
        lastAnswer = tmp;
      }

      rec(number);
      return answer;
  }
}
