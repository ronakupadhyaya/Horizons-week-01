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

  this.sort(function(a, b) {
    return a-b;
  })

  if(this.length !== array2.length) {
    return false;
  }

  var counter = 0;

  for(var i = 0; i < this.length; i++) {
    if(this[i] === array2[i]) {
      counter++;
    }
  }

  if(counter === this.length) {
    return true;
  } else return false;
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
  var arr = Object.keys(this); // array of object's keys
  var arr2 = Object.keys(array2); // array of array2's keys
  var counter = 0;
  if(arr.length !== arr2.length) {
    return false
  }

  for (var i=0;i<arr.length;i++) {
    for (var x=0;x<arr.length;x++) {
      if(arr[i] === arr2[x]) {
        if(this[arr[i]] === array2[arr2[x]]) {
          counter++
        }
      }
    }
  }
  console.log(counter);
  return counter === arr.length ? true : false;

  //console.log(arr.prototype.hasEqualContent(arr2)); // doesn't work rn

}
