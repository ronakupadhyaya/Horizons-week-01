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

Array.prototype.hasEqualContent = function(array2){ // comparing array2 to array which is "this"
 // YOUR CODE HERE
 /*return function(array1){
   if(array1.length !== array2.length){
     return false;
   }*/
 //return this.sort().toString() === array2.sort().toString();
// look at the way he writes code. best way to write true and false
 //this here refers to Array
// you're converting it to string first
// then sorting it first according to alphabetical order so they'll give u the same value
var sort1= this.sort(function(a, b){return a-b});
var sort2= array2.sort(function(a, b){return a-b});

return sort1 === sort2;

// this can't work. You need to loop thru it cuz array/ object is different

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
 // YOUR CODE HERE
}
