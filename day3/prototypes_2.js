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
 // YOUR CODE HERE
 var array1 = this; var result = true;
 if(array1.length === array2.length){
 	 array2.forEach(function(item){
          if(array1.indexOf(item)=== -1){
          	result = false;
 	      }	   
     });   
 }
 else {result = false;}
 return result;
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

Object.prototype.hasEqualContent = function(obj2){
 // YOUR CODE HERE
 var obj1 = this;
 var arr1 = Object.keys(obj1);
 var arr2 = Object.keys(obj2);
 var result = true;
 if(arr1.hasEqualContent(arr2)){
 	arr1.forEach(function(item){
 		if(obj1[item] !== obj2[item]){
 			result = false;
 		}
 	}
 		)
 	}
 else{
 	result = false;
 }
 return result;
}
