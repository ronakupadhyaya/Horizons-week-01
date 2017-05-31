'use strict';

window.builtins = {};

// In this exercise, we'll be recreating some common JavaScript built-in
// functions such as contains() and trim() using the skills we already know.

// For a reference to all JavaScript built-in objects and functions,
// check out this MDN reference:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects

// ----------------------------------------------------------------------------

// Exercise 1. trim() using loops and conditionals

// Write a function that takes a string and returns the same string without
// leading and trailing spaces.

// ex. builtins.trim('  Horizons  ') -> 'Horizons'
// ex. builtins.trim('Hello World!    ') -> 'Hello World!'

builtins.trim = function(str) {
  // YOUR CODE HERE
  //for (var i = 0; i < str.length; i++) {
  //console.log(str);
  var firstIndex;
  var lastIndex;
  var bool = true;
  var bool2 = true;

  for (var i = 0; i < str.length; i++) {
    if(bool && str[i] !== " ") {
      firstIndex = i;
      bool = false;
      //console.log(firstIndex);
    }
  }
  for (var j = str.length - 1; j > 0; j--) {
    if(str[j] !== " " && bool2) {
      lastIndex = j;
      bool2 = false;
      //console.log(lastIndex);
    }
  }

  var newString = str.substring(firstIndex, lastIndex + 1);
//  console.log(newString);
  return newString;
};

// ----------------------------------------------------------------------------

// Exercise 2. contains() using indexOf()

// Write a function that takes a string to be searched and a string to
// search for, returning true or false as to whether or not the latter
// was found in the source string.

// ex. builtins.search('Horizons', 'o') -> true
// ex. builtins.search('Horizons', 'oz') -> false
// ex. builtins.search('rizo', 'Horizons') -> false
// ex. builtins.search('', 'Horizons') -> false
// ex. builtins.search('Horizons', '') -> true
// ex. builtins.search('Horizons', 'h') -> false

builtins.search = function(sourceString, searchString) {
  // YOUR CODE HERE
  var contains = false;
  for (var i = 0; i < sourceString.length; i++){
    var tempString = sourceString.substring(i, i + searchString.length)
    if (tempString === searchString) {
      contains = true;
    }
  }
  return contains;
};

// ----------------------------------------------------------------------------

// Exercise 3. Parsing the first number of a string

// Write a function that takes a string of format 'n [nouns]' and returns
// the parsed number of n. Hint: use parseInt(n) to convert 'n' (a string)
// to n (a number).

// ex. builtins.parseQuantity('1 tool') -> 1
// ex. builtins.parseQuantity('8 buckets') -> 8
// ex. builtins.parseQuantity('0 computers') -> 0

// Hint: Use split() to separate each part of the input string by spaces
// (or any other separator). See:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split

builtins.parseQuantity = function(str) {
  // YOUR CODE HERE
  var bool = true;
  var number = 0;
  for (var i = 0; i < str.length; i++) {
    if (bool && parseInt(str[i])) {
      bool = false;
     number = parseInt(str[i]);
    }
  }
  return number;
};

// ----------------------------------------------------------------------------

// Exercise 4. Rewriting reverse() using loops

// Write a function that takes an array and returns the array in reversed order
// (by indices).

// ex. builtins.reverse([1, 2, 3]) -> [3, 2, 1]
// ex. builtins.reverse(['dogs', 'cats', 'moose']) -> ['moose', 'cats', 'dogs']
// ex. builtins.reverse([]) -> []
// ex. builtins.reverse([123]) -> [123]

builtins.reverse = function(arr) {
  // YOUR CODE HERE
  var newArray = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  return newArray;
};

// ----------------------------------------------------------------------------

// Exercise 5. Checking equality between arrays

// Write a function that takes array a and array b and checks if they
// have the same contents (in order).

// ex. builtins.isEqual([1, 2, 3], [1, 2, 3]) -> true
// ex. builtins.isEqual(['1', '2', '3'], [1, 2, 3]) -> false
// ex. builtins.isEqual([3, 2, 1], [1, 2, 3]) -> false
// ex. builtins.isEqual([], [1, 2, 3]) -> false
// ex. builtins.isEqual([1, 2, 3], []) -> false
// ex. builtins.isEqual([], []) -> true

builtins.isEqual = function(a, b) {
  // YOUR CODE HERE
  var equal = true;
  if(a.length !== b.length) {
    return false;
  }
  for (var i = 0; i < a.length; i++) {
    if( a[i] !== b[i]) {
      equal = false;
    }
  }
  return equal;
};

// ----------------------------------------------------------------------------

// Exercise 6. Checking if an array is a palindrome (forward order is the same
// as reversed order).

// Write a function that takes an array a and checks if the order of its contents
// in reverse is identical to the original order of the contents.

// ex. builtins.isPalindrome([1, 2, 3, 2, 1]) -> true
// ex. builtins.isPalindrome([1, 2, 3, 4, 5]) -> false
// ex. builtins.isPalindrome(['1', '2', '3', 2, 1]) -> false
// ex. builtins.isPalindrome('racecar'.split('')) -> true

builtins.isPalindrome = function(arr) {
  // YOUR CODE HER
  var rightArray = [];
  var leftArray = [];
  var middleIndex = Math.round(arr.length / 2);
    leftArray = arr.slice(0, middleIndex);
    rightArray = arr.slice(middleIndex - 1, arr.length);

  var newArray = builtins.reverse(rightArray);
  //console.log(leftArray);
  //console.log(rightArray);
  //console.log(newArray);

  if (builtins.isEqual(leftArray, newArray)) {
    return true;
  }
  return false;
};

// ----------------------------------------------------------------------------

// Exercise 7. Sorting an array of numbers in ascending order.

// Write a function that takes an array of numbers and returns the
// array sorted by ascending numerical value.

// ex. builtins.sortByValue([10, 1, 5, 4]) -> [1, 4, 5, 10]
// ex. builtins.sortByValue([1, 2, 3]) -> [1, 2, 3]
// ex. builtins.sortByValue([0, -6, -6]) -> [-6, -6, 0]

// Hint: Use the built-in Array sort() function with a compare function
// to sort by numerical value instead of by Unicode point value (the default
// behavior). See:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

builtins.sortByValue = function(arr) {
  // YOUR CODE HERE
  var newArray = arr.sort(function(a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    if (a === b) {
      return 0;
    }
  });
  return newArray;
};

// ----------------------------------------------------------------------------

// Exercise 8. Sorting a 2D array based on the length of its subarrays.

// Write a function that sorts an array of arrays (two-dimensional array)
// based on the lengths of the subarrays (in ascending order).

// ex. builtins.sortByLength([[1, 2, 3], [4, 5], [6]]) -> [[6], [4, 5], [1, 2, 3]]
// ex. builtins.sortByLength([[], [''], []]) -> [[], [], ['']]

// Hint: Use the same Array sort() function - but think about what you're
// comparing this time!

builtins.sortByLength = function(arr) {
  // YOUR CODE HERE
  var newArray = arr.sort(function(a, b) {
    if (a.length > b.length) {
      return 1;
    }
    if (a.length < b.length) {
      return -1;
    }
    if (a.length === b.length) {
      return 0;
    }
  });

  return newArray;

};

// ----------------------------------------------------------------------------

// Bonus Exercise! Flatten a 2D array.

// Write a function that takes an array of arrays (two-dimensional array) and
// flattens its contents into a one-dimensional array.

// ex. builtins.flatten([[1, 2, 3], [4, 5], [6]]) -> [1, 2, 3, 4, 5, 6]
// ex. builtins.flatten([[], [''], []]) -> ['']
// ex. builtins.flatten([]) -> []

builtins.flatten = function(arr) {
  // YOUR CODE HERE
  var newArray = [];
  var newCounter = 0;
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      newArray[newCounter] = arr[i][j];
      newCounter++;
    }
  }
  return newArray;

};
