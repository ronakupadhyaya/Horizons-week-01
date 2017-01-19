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

var yet = [];
Array.prototype.hasEqualContent = function(array2){
    var array1 = this
    // console.log(array1)
    // yet.call(Array)
    // console.log(yet)
    Array.prototype.sort(array1);
    console.log(array1)
    sort(array2);
    if (array1 === array2) {
      return true
    }
    return false
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
var obj = this
for obj in key
if //the array of keys is NOT equal to the keys in array 2 return false
//if true then find a way to

//  var plzhelp = []
//  var plzhelp2 = []
//  var obj = this
//  for (var key in obj) {
//    var tempArr = [];
//    tempArr.push(key)
//    tempArr.push(obj[key])
//    arr.push(tempArr)
//  }
//  for (var key in array2) {
//    var tempArr = [];
//    tempArr.push(key)
//    tempArr.push(obj[key])
//    arr2.push(tempArr)
//  }
//
//  if (plzhelp.length !== plzhelp2.length) {
//    return false
//  }
//  for (var i = 0; i < plzhelp.length; i++) {
//    for (var j = 0; j < plzhelp2.length; j++)
//    array == array
//  }
// }
