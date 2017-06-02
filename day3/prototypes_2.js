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

// Hint: the first thing you have to figure out is how to get the first array
// inside the function. Then you can compare it to array2.

Array.prototype.hasEqualContent = function(array2){
 // YOUR CODE HERE
 if (this.length !== array2.length) {
 return false;
}
var result = []
for (var i = 0; i < this.length; i++) {
 for (var j = 0; j < array2.length; j++) {
   if (this[i] === array2[j]) {
     result.push(this[i])
   }
 }
}
if (result.length === this.length) {
 return true;
}
else {
 return false;
}
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

Object.prototype.hasEqualContent = function(object2){

   for (var i in this) {
     if ( object2.hasOwnProperty(i) &&
     this[i] === object2[i] &&
     Object.keys(this).length === Object.keys(object2).length) {
       return true;
     } else if (Object.keys(object2).length === 0 && Object.keys(this).length === 0) {
       return true;
     } else {
       return false;
     }
   }

 }
