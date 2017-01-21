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
<<<<<<< HEAD
  var array = [];
  for (var i = 0; i < str.length; i++){
    if(str[i] !== " "){
      array.push(i);
    }
  }
var x = array.length
var first = array[0];
var last = array[x - 1];
var answer = str.slice(first,last + 1);
return answer;
}



=======
  // YOUR CODE HERE
  var startIndex = 0;
  var endIndex = 0;
  for(var i = 0; i < str.length; i++){
    if(str[i] !== ' '){
      startIndex = i;
      break;
    }
  }
  for(var j = str.length -1; j >= 0; j--){
    if(str[j] !== ' '){
      endIndex = j;
      break;
    }
  }
  return str.substring(startIndex, endIndex+1)
};
>>>>>>> dnajafi

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
<<<<<<< HEAD
  return sourceString.indexOf(searchString) !== -1;
=======
  // YOUR CODE HERE
  if(sourceString.indexOf(searchString) !== -1){
    return true;
  }
  return false;
>>>>>>> dnajafi
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
<<<<<<< HEAD
  var blah = str.split(" ");
  return parseInt(blah[0]);
=======
  // YOUR CODE HERE
  var num = str.split(" ");
  return parseInt(num[0]);
>>>>>>> dnajafi
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
<<<<<<< HEAD
  var newarray = [];
  for (var i = 0; i < arr.length; i ++){
  newarray[i] = arr[arr.length - (i + 1)];
}
  return newarray;
=======
  // YOUR CODE HERE
  var newArr = [];
  while(arr.length > 0){
    newArr.push(arr.pop());
  }
  return newArr;
>>>>>>> dnajafi
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
<<<<<<< HEAD
    if (a.length === b.length) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        } else {
          return true;
        }
      }
      return true;
    } else {
      return false;
    }
  };
=======
  // YOUR CODE HERE
  if(a.length !== b.length){
    return false;
  }
  for(var i = 0; i < a.length; i++){
    if(a[i] !== b[i]){
      return false;
    }
  }
  return true;
}
>>>>>>> dnajafi

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
<<<<<<< HEAD
var reverseA = builtins.reverse(arr);
return builtins.isEqual(reverseA,arr);
=======
  // YOUR CODE HERE
  var arr1 = arr.slice();
  var newArr = arr.reverse();
  console.log(newArr, arr);
  return builtins.isEqual(arr1, newArr);
>>>>>>> dnajafi
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
<<<<<<< HEAD
function compareNumbers(a, b) {
  return a - b;
}
arr.sort(compareNumbers)
return arr;
=======
  // YOUR CODE HERE
  function sortNumber(a,b){
    return a-b;
  }
  return arr.sort(sortNumber);
>>>>>>> dnajafi
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
<<<<<<< HEAD
  function compareLengths(a, b){
    return a.length - b.length;
  }
  arr.sort(compareLengths)
  return arr;
=======
  // YOUR CODE HERE
  return arr.sort(function(a,b){
    return a.length - b.length;
  })
>>>>>>> dnajafi
};

// ----------------------------------------------------------------------------

// Bonus Exercise! Flatten a 2D array.

// Write a function that takes an array of arrays (two-dimensional array) and
// flattens its contents into a one-dimensional array.

// ex. builtins.flatten([[1, 2, 3], [4, 5], [6]]) -> [1, 2, 3, 4, 5, 6]
// ex. builtins.flatten([[], [''], []]) -> ['']
// ex. builtins.flatten([]) -> []

builtins.flatten = function(arr) {
<<<<<<< HEAD
  var newarray = [];
  for (var i = 0; i < arr.length ; i++){
    for (var x = 0 ; x < arr[i].length; x++){
      newarray.push(arr[i][x]);
    }
  }
  return newarray;
=======
  // YOUR CODE HERE
  var newArr = [];
  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j< arr[i].length; j++){
      newArr.push(arr[i][j]);
    }
  }
  return newArr;
>>>>>>> dnajafi
};
