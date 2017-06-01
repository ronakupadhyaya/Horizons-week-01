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
 var length = this.length;

 for (var i = 0; i < length; i++) {
   var found = false;
   for (var j = 0; j < array2.length; j++) {
     if (this[i] === array2[j]) {
       found = true;
     }
   }
   if (! found) {
     return false
   }
 }


 for (var i = 0; i < array2.length; i++) {
   var found = false;
   for (var j = 0; j < length; j++) {
     if (this[j] === array2[i]) {
       found = true;
     }
   }
   if (! found) {
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
 var arr1 = _.pairs(this);
 var arr2 = _.pairs(object2);
 for (var i = 0; i < arr1.length; i++) {
   var found = false;
   for (var j = 0; j < arr2.length; j++) {
     if (arr1[i].hasEqualContent(arr2[j])) {
       found = true;
     }
   }
   if (! found) {
     return false
   }
 }


 for (var i = 0; i < arr2.length; i++) {
   var found = false;
   for (var j = 0; j < arr1.length; j++) {
     if (arr2[i].hasEqualContent(arr1[j])) {
       found = true;
     }
   }
   if (! found) {
     return false
   }
 }
 return true;
}
