'use strict';

window.builtins = {};

// In this exercise, we'll be recreating some common JavaScript built-in
// functions such as search() and trim() using the skills we already know.

// For a reference to all JavaScript built-in objects and functions,
// check out this MDN reference:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects

// ----------------------------------------------------------------------------

// Exercise 1. trim() using loops and conditionals

// Write a function that takes a string and returns the same string without
// leading and trailing spaces.

// ex. builtins.trim('  Horizons  ') -> 'Horizons'
// ex. builtins.trim('Hello World!    ') -> 'Hello World!'


builtins.trim = function(string) {
  while (string[0] === " ") {
    string=string.substring(1,string.length)
  }
  while (string[string.length-1] === " ") {
    string = string.substring(0, string.length-1)
  }
  return string
}

// ----------------------------------------------------------------------------

// Exercise 2. search() using indexOf()

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
  var locationIndex = sourceString.indexOf(searchString)
  if (locationIndex !== -1){
    return true
  } else {
    return false
  }
}
  // find where in sourceString we see first letter of searchString
  /*var firstIndex = findIndex(searchString[0])
  for (var i = 0; i<sourceString.length;i++)
    if (firstIndex !== searchString[i]){
      return false
    }
    else {
      for (var j = searchString[i]; j<searchString.length, j++){
        if searchString[i]

      }
    }*/


  //if item at index is equal to


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
//COME BACK to this
builtins.parseQuantity = function(str) {
  //
for (var i = 0; i<str.length; i++){
  if (parseInt(str[i]) !== NaN){
    return parseInt(str[i])
  }
}
}
  // YOUR CODE HERE

// ----------------------------------------------------------------------------

// Exercise 4. Rewriting reverse() using loops

// Write a function that takes an array and returns the array in reversed order
// (by indices).

// ex. builtins.reverse([1, 2, 3]) -> [3, 2, 1]
// ex. builtins.reverse(['dogs', 'cats', 'moose']) -> ['moose', 'cats', 'dogs']
// ex. builtins.reverse([]) -> []
// ex. builtins.reverse([123]) -> [123]

builtins.reverse = function(arr) {
  var newArray = []
  for (var i = arr.length-1; i >=0; i--){
    newArray.push(arr[i])
  }
  return newArray
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
  if (a.length !== b.length){
    return false
  } else {
  for (var i = 0; i<a.length; i++)
    if (a[i] !== b[i]) {
      return false
    }
  }
return true  // YOUR CODE HERE
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
  var reverseArray = []
  for (var i = arr.length-1; i>=0; i--){
    reverseArray.push(arr[i])
  }
    for (var j=0; j<arr.length; j++) {
      if (reverseArray[j] !== arr [j]) {
        return false
      } else {
        return true
      }
    }
  }

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
  arr.sort(function compareNumbers(a, b) {
    return a - b;
  })
return arr  // YOUR CODE HERE
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
  arr.sort(function (a,b) {
    return a.length>b.length
  })
return arr
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
  var newArray = []
  for (var i = 0; i<arr.length; i++){
    for (var j = 0; j<arr[i].length; j++){
      newArray.push(arr[i][j])
    }
  }
  return newArray
};
