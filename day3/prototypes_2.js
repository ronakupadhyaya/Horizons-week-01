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
  var arr = this
  var test = []
  if (arr.length !== array2.length) {return false}
  for (var x =0; x<arr.length; x++) {
    for (var i =0; i<arr.length; i++) {
      if(arr[x] === array2[i]) {test.push(1)}
    }
  }
  if (test.length === arr.length) {return true}
  else {return false}
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
  var lol = [];
  var sos = [];
  var obj = this;
  for (var key in obj) {
    var tempArr = [];
    tempArr.push(key)
    tempArr.push(obj[key])
    lol.push(tempArr)
  };
  for (var key in array2) {
    var tempArr = [];
    tempArr.push(key)
    tempArr.push(array2[key])
    sos.push(tempArr)
  };
  var test = [];
  if (lol.length !== sos.length) {return false};
  for (var x =0; x<lol.length; x++) {
    for (var i =0; i<sos.length; i++) {
      var equality = function () {
        for (var y = 0; y<2; y++) {
          if (lol[x][y] === sos[i][y] && lol[x][y] === sos[i][y]) {return true}
          else {return false}
        }
      };
      if(equality()) {test.push(1)};
    };
  };
  if (test.length === lol.length) {return true}
  else {return false};
}


















// var arrKey = Object.keys(array2)
// var arrKey2 = this
