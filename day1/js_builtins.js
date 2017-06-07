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
  // YOUR CODE HERE
  for(var i = 0; i < str.length; i++){
    if (str[i] != " ") {
      break;
    }
  }

  for (var j = str.length - 1; j >= 0; j--) {
    if (str[j] != " "){
      break;
    }
  }
  var newStr = str.slice(i, j + 1);
  return newStr;
=======
  var found1 = false;
  var found2 = false
  while(!found1) {
    if(str[0] !== " ") {
      found1 = true;
    } else {
      str = str.slice(1)
    }
  }
  while(!found2) {
    if(str[str.length-1] !== " ") {
      found2 = true;
    } else {
      str = str.slice(0,str.length-1)
    }
  }
  return str
>>>>>>> brianfakhoury
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
<<<<<<< HEAD

  if(searchString.length == 0) {
    return true;
  }
  for(var i = 0; i < sourceString.length; i++) {
    var verify = 0;
    if(sourceString[i] == searchString[0]) {
      for(var j = 0; j < searchString.length; j++) {
        if(sourceString[i+j] == searchString[j]) {
          verify++;
        }
        else {
          continue;
        }
      }
      if (verify == searchString.length) {
        return true;
      }
}
=======
  for (var i = 0; i < sourceString.length - (searchString.length - 1); i++) {
  	var currChar = sourceString[i];
  	if (currChar === searchString[0]) {
  		for (var j = 0; j < searchString.length; j++) {
  			if (searchString[j] !== sourceString[i + j]) {
  				return false;
  			}
  		}
  		return true;
  	}
>>>>>>> brianfakhoury
  }
  return false;
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
  // YOUR CODE HERE
  var splitString = str.split(" ");
  var num = parseInt(splitString[0]);
  return num;
=======
  var list = str.split()
  var num = parseInt(list[0])
  return num
>>>>>>> brianfakhoury
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
  // YOUR CODE HERE
  var newArr = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    newArr.push(arr[i]);
  }
  return newArr;
=======
  var returnArray = [];
  for (var i = arr.length-1; i >= 0 ; i--) {
    returnArray.push(arr[i])
  }
  return returnArray
>>>>>>> brianfakhoury
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
  // YOUR CODE HERE
  if (a.length != b.length) {
    return false;
  }
  for(var i = 0; i < a.length; i++) {
    if ( a[i] !== b[i]) {
      return false;
    }
  }
  return true;
=======
  if (a.length === b.length) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true
  }
  return false
>>>>>>> brianfakhoury
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
<<<<<<< HEAD
  // YOUR CODE HERE
  var newArr = builtins.reverse(arr);
  return builtins.isEqual(arr, newArr);

=======
  var midway = Math.floor(arr.length/2)
  for(var i = 0; i <= midway; i++) {
    if(arr[i] !== arr[arr.length-i-1]) {
      return false
    }
  }
  return true
>>>>>>> brianfakhoury
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
  // YOUR CODE HERE
  return arr.sort(function (a, b) {
    return a - b;
  });
=======
  var currIndex = 0;
  var indexOfSmall = 0;
  while (currIndex < arr.length) {
  	for (var i = currIndex + 1; i < arr.length; i++) {
  		if (arr[i] < arr[indexOfSmall]) {
  			indexOfSmall = i;
  		}
  	}
  	var temp = arr[currIndex];
  	arr[currIndex] = arr[indexOfSmall];
  	arr[indexOfSmall] = temp;
  	currIndex++;
  	indexOfSmall = currIndex;
  }
  return arr;
>>>>>>> brianfakhoury
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
  // YOUR CODE HERE
return  arr.sort(function (a, b) {
    return a.length - b.length;
  });
}
=======
  var currIndex = 0;
  var indexOfSmall = 0;
  while (currIndex < arr.length) {
  	for (var i = currIndex + 1; i < arr.length; i++) {
  		if (arr[i].length < arr[indexOfSmall].length) {
  			indexOfSmall = i;
  		}
  	}
  	var temp = arr[currIndex];
  	arr[currIndex] = arr[indexOfSmall];
  	arr[indexOfSmall] = temp;
  	currIndex++;
  	indexOfSmall = currIndex;
  }
  return arr;
};
>>>>>>> brianfakhoury

// ----------------------------------------------------------------------------

// Bonus Exercise! Flatten a 2D array.

// Write a function that takes an array of arrays (two-dimensional array) and
// flattens its contents into a one-dimensional array.

// ex. builtins.flatten([[1, 2, 3], [4, 5], [6]]) -> [1, 2, 3, 4, 5, 6]
// ex. builtins.flatten([[], [''], []]) -> ['']
// ex. builtins.flatten([]) -> []

builtins.flatten = function(arr) {
  var returnArray = []
  for(var i = 0; i < arr.length; i++) {
    for (var x of arr[i]) {
      returnArray.push(x)
    }
  }
  return returnArray
};
