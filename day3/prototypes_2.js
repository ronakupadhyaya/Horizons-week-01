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
  if (this.length !== array2.length) {
    return false;
  }

  var check = true;
  this.forEach(function(item) {
    if (array2.indexOf(item) === -1) {
      console.log(array2, item);
      check = false;
    }
  });
  return check;
};

// You are going to implement a function that compares if two Objects have the same
// key-value pairs.

// {a:1, b:2, c:3}.hasEqualContent({a:1, b:2, c:3} -> true)
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3, b:2}) -> [] true
// {}.hasEqualContent({}) -> true"
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3}) -> [] false
// {a:3, b:1, c:2}.hasEqualContent({a:1, b:2, c:3}) -> [] false

// Hint: use the Array.prototype.hasEqualContent to compare the content of an object,
// without having to account for the order of elements.
//
// Object.prototype.hasEqualContent = function(array2){
//   var pairs1 = Object.entries(this);
//   var pairs2 = Object.entries(array2);
//
//   var pairsBet1 = [];
//   var pairsBet2 = [];
//
//   pairs1.forEach(function(item) {
//     pairsBet1.push((item[0] + item[1]));
//   });
//
//   pairs2.forEach(function(item) {
//     pairsBet2.push((item[0] +item[1]));
//   });
//
//
//   return pairsBet1.hasEqualContent(pairsBet2);
//
// };

Object.prototype.hasEqualContent = function(array2) {
  var obj = this;
  var pairs1 = Object.keys(obj);
  var pairs2 = Object.keys(array2);

  if (!(pairs1.hasEqualContent(pairs2))) {
    return false;
  }

  var check = true;
  pairs1.forEach(function(item) {
    check = obj[item] === array2[item];
  });

  return check;

};
