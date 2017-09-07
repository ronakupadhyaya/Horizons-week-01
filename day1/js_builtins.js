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

builtins.trim = function(str) {
  // YOUR CODE HERE
  var splitUp = str.split(' ');
  console.log('splitUp', splitUp);
  console.log('index', index);
  for (var i=0; i < splitUp.length + 5; i++) {
  	  var index = splitUp.indexOf('');
	  if (index > -1) {
	  	splitUp.splice(index, 1);
	  }
  }
  console.log('second split up', splitUp);
  var returnString = splitUp.join(' ');
  console.log('post join', returnString);
  return returnString; 
};

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
  // YOUR CODE HERE
  return sourceString.includes(searchString); 
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
  var splitArray = str.split(' ');
  console.log('splitArray', splitArray);
  return parseInt(splitArray[0]); 
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
  var reverseArray = [];
  console.log('got here');
  for (var i=arr.length-1; i>=0; i--) {
  	reverseArray.push(arr[i]); 
  	console.log('reverseArray', reverseArray);
  }
  return reverseArray;
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
  if (a.length != b.length) {
  	return false; 
  }
  for (var i=0; i<a.length; i++) {
  	console.log('gets inside loop');
  	if (a[i] === b[i]) {
  		console.log('comparing?')
  		continue; 
  	} else {
  		return false;
  	}
  }
  return true;
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
  // YOUR CODE HERE
  var bool = true; 
  for (var i=0; i<arr.length; i++) {
  	console.log(bool);
  	if (!(arr[i] === arr[arr.length - 1 - i])
  		|| !(typeof arr[i] === typeof arr[arr.length - 1 - i])
  		) {
  		console.log('noooo!');
  		bool = false;
  	}
  }
  return bool;
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

[2, 4, 5, 3, 6, 1]


builtins.sortByValue = function(arr) {
  // YOUR CODE HERE
  // debugger;
  // var replaceIndex = 0; 
  // for (var j=0; j<arr.length; j++) {
  // 	  var smallest = arr[j];
	 //  for (var i=0; i<arr.length; i++) {
	 //  	  if (smallest > arr[i]) {
	 //  	  	smallest = arr[i];
	 //  	  	replaceIndex = i;  
	 //  	  }
	 //   }
	 //   arr[replaceIndex] = arr[j]; 
	 //   arr[j] = smallest;
	 //   console.log(arr); 
  // }

  	var mergeSort = function(A, p, r) {
  		
  	}


  
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
};
