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
  var arr = this;
  if (arr.length !== array2.length) {
    return false;
  }
  for (var i = 0; i < array2.length; i++) {
    if (arr.indexOf(array2[i]) !== -1) {
      array2.splice(i, 1);
      i--;
    }
  }
  return array2.length === 0;
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
  // var keyCheck = Array.prototype.hasEqualContent(Object.keys(obj1), Object.keys(obj2))
  // if(keyCheck){
  //   Object.keys(obj1).forEach(function(item){
  //     if(obj1[item] !== obj2[item]) {
  //       return false
  //     }
  //   })
  //   return true;
  // }else{
  //   return false;
  // }


  if (Object.keys(obj2).length !== Object.keys(this).length) {
    return false;
  }
  var arr2 = [];
  var arr1 = [];
  if (!Object.keys(obj2).hasEqualContent(Object.keys(this))) {
    return false;
  }
  var result = true;
  _.forEach(obj2, function(value, key) {
    arr2[0] = value;
    arr2[1] = key;
    {
      value: value,
      key
    }
    arr1[1] = key;
    arr1[0] = obj1[key];
    console.log(arr2);
    console.log(arr1);
    var truth = arr1.hasEqualContent(arr2);
    console.log(!truth);
    if (!truth) {
      return result = truth;
    }
    arr2 = [];
    arr1 = [];
  });
  return result;















}
