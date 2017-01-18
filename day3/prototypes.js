"use strict";

window.prototypes = {};

// In this exercise, you will be implementing functions that will allow you to
// iterate through objects keys.

// Part 3. Iterating over own.


prototypes.allKeys = function(obj){
  var arr = [];
  for (var key in obj){
    arr.push(key)
  }
  return arr;
}

prototypes.keys = function(obj){
  var arr = [];
  for (var key in obj){
    if(obj.hasOwnProperty(key)){
      arr.push(key)
    }
  }
  return arr;
}
