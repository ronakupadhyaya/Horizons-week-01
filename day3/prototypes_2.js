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

Array.prototype.hasEqualContent = function(array2){
  if (this.length !== array2.length) {
    return false;
  }
  this.sort()
  array2.sort()
  for (var i = 0; i < this.length; i++) {
    if (this[i] !== array2[i]) {
      return false
    }
  }
  return true;
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
 	var pairedobj1 = _.pairs(this)
 	var pairedobj2 = _.pairs(object2)
 	pairedobj1.sort()
 	pairedobj2.sort()
 	console.log(pairedobj1)
 	console.log("1: ", pairedobj1.length)

 	console.log("2: ", pairedobj2.length)
 	// pairedobj1.prototype.hasEqualContent(pairedobj2)
 	if (pairedobj1.length !== pairedobj2.length) {
 		return false;
 	}
 	console.log(pairedobj1[0])
 	for (var i = 0; i < pairedobj1.length; i++) {
    	if (_.isEqual(pairedobj1[i], pairedobj2[i])) {
     	 	console.log("**", pairedobj1[i], pairedobj2[i])
    		}
    	else {
    		return false
    	}
  	}
  return true;
}

	