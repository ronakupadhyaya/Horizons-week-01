"use strict";

window.prototypes = {};

// Part 3. Adding methods to collections

// You are going to implement a function that compares if two arrays have the same
// things, without necessarily having the same order.

// [3, 2, 1].hasEqualContent([1, 2, 3] -> true
// [1, 2, 3].hasEqualContent([1, 2, 3]) -> true
// [].hasEqualContent([]) -> true]
// [1, 3, 4].hasEqualContent([1, 3, 4, 5] -> false
// [1, 2, 4].hasEqualContent([1, 3, 4]) -> false

// Hint: the fisrt thing you have to figure out is how to get the first array
// inside the function. Then you can compare it to array2.

Array.prototype.hasEqualContent = function(array2){
 var returnValue = true; 
 if(this.length !== array2.length) {
 	returnValue = false;
 }
 else(this.forEach(function(n){
 	console.log(array2.indexOf(n));
 	if(array2.indexOf(n) === -1) {
 		returnValue = false;
 	}}))
 return returnValue; 
}

// You are going to implement a function that compares if two Objects have the same
// key-value pairs.

// {a:1, b:2, c:3}.hasEqualContent({a:1, b:2, c:3} -> true)
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3, b:2}) -> [] true
// {}.hasEqualContent({}) -> true"
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3}) -> [] false
// {a:3, b:1, c:2}.hasEqualContent({a:1, b:2, c:3}) -> [] false

// Hint: use the Array.prototype.hasEqualContent to compare the content of an object,
// without having to account for the order of elements.

Object.prototype.hasEqualContent = function(array2){
	var arrayObj1 = _.pairs(this);
	var arrayObj2 = _.pairs(array2);
	var counter = 0; 
	if(arrayObj1.length !== arrayObj2.length) {
		return false;
	}
	else (arrayObj1.forEach(function(n){
		arrayObj2.forEach(function(m){
			if(m.hasEqualContent(n)){
				counter++; 
			}
		})
	}))
		if(counter === arrayObj1.length){return true;}
		else if (counter !== arrayObj1.length){ return false;}
}