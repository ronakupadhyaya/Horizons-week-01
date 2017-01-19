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
 var count = 0;
 for (var i = 0; i < this.length; i++){
   for (var j = 0; j < array2.length; j++){
     if (this[i]===array2[j]){
       count++
       }
     }
   }
return (count === this.length && count === array2.length);
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
 //  var thisKey = [];
 //  var thisVal = [];
 //  Object.keys(this).forEach(function(key){
 //    thisKey.push(key);
 //    thisVal.push(this.key);
 //  })
 // this.k// YOUR CODE HERE
var array1Keys = Object.keys(this)
var array2Keys = Object.keys(array2)
var array1Values = Object.values(this)
var array2Values = Object.values(array2)
var length1 = array1Keys.length;
var length2 = array2Keys.length;
var count = 0;

for (var i = 0; i < length1; i++){
  for (var j = 0; j < length2; j++){
      if (array1Keys[i]===array2Keys[j] && array1Values[i]===array2Values[j]){
        count++
      }
  }
}
return (count === length1 && count === length2)


}
