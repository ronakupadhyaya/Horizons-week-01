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
  var count = 0
  for (var i = 0; i < array2.length; i++) {
    if (this.includes(array2[i])) count++
  }
  if (count === array2.length) return true
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
 var obkeys = Object.keys(this)
 var objkeys = Object.keys(array2)
 var obvalues = Object.values(this)
 var objvalues = Object.values(array2)
 // var answer = 0
 // if(obkeys.hasEqualContent(objkeys) &&
 //    obvalues.hasEqualContent(objvalues) &&
 //    obkeys.length === objkeys.length) {
 //   answer++
 // }
 // var count = 0;
 // for (var i = 0; i < obvalues.length; i++) {
 //   if(array2[objkeys[i]] === this[obkeys[i]] &&
 //     objkeys[i] === obkeys[i]) {
 //       count++
 //     }
 // }
 // if(count === 3) return true
 //  return false
// var count = 0
// for (var key in array2) {
//   if obkeys.includes()
// }


if(_.isEqual(this,array2)) return true
return false 





}
