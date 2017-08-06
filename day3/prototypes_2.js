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
 // YOUR CODE HERE
 var arr = this;
 arr.sort();
 array2.sort();
 if(arr.length === array2.length){
   var retVal = true;
 for(var i = 0; i < arr.length; i++){
   if(arr[i] !== array2[i]){
     retVal = false;
   }
 }
 return retVal;
 }
 else{ return false}
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
 var array1 = (Object.keys(this)).sort();
 var array2 = (Object.keys(object2)).sort();
 console.log(array1);
 console.log(array2);

if(array1.length === array2.length){
  var retVal = true;
 for(var i = 0; i < array1.length; i++){
   if(this[array1[i]] !== object2[array2[i]]){
     retVal = false;
   }
 }
 return retVal;
} else { return false};

}
