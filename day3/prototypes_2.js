"use strict";

window.prototypes = {};

// Part 3. Adding methods to collections

// You are going to implement a function that compares if two arrays have the same
// things, without necessarily having the same order.

// [3, 2, 1].hasEqualContent([1, 2, 3]) -> true
// [1, 2, 3].hasEqualContent([1, 2, 3]) -> true
// [].hasEqualContent([]) -> true
// [1, 3, 4].hasEqualContent([1, 3, 4, 5]) -> false
// [1, 2, 4].hasEqualContent([1, 3, 4]) -> false

// Hint: the first thing you have to figure out is how to get the first array
// inside the function. Then you can compare it to array2.

Array.prototype.hasEqualContent = function(array2) {
  var array1 = this.slice()
  this.forEach(function(element) {
  	if (array2.includes(element)) {
  		var array2Index = array2.indexOf(element)
  		var array1Index = array1.indexOf(element)
  		array2.splice(array2Index, 1)
  		array1.splice(array1Index, 1)
  	} else {
  		return false
  	} 	
  })
  if (array1.length || array2.length) {
	return false
  } 
  return true
}

// You are going to implement a function that compares if two Objects have the same
// key-value pairs.

// {a:1, b:2, c:3}.hasEqualContent({a:1, b:2, c:3}) -> true
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3, b:2}) -> true
// {}.hasEqualContent({}) -> true
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3}) -> false
// {a:3, b:1, c:2}.hasEqualContent({a:1, b:2, c:3}) -> false

// Hint: use the Array.prototype.hasEqualContent to compare the content of an object,
// without having to account for the order of elements.

Object.prototype.hasEqualContent = function(object2){
 // YOUR CODE HERE

 var object1 = Object.assign({}, this);
 var same = true;

 _.mapObject(object1, function(val, key) { 	
 	if (! object2[key] || val !== object2[key]) {
  		same = false;
  	}
 })

 _.mapObject(object2, function(val, key) {
  	if (! object1[key] || val !== object1[key]) {
  		same = false;
  	}
 })

 return same;
}
