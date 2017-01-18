"use strict";

window.prototypes = {};

// Part 3: Iteration.

// In this exercise, you will be implementing functions that will allow you to
// iterate through objects keys.

// Exercise 1 prototypes.allKeys()
// Write a function that receives an object and returns an array of all the keys
// in that object and on all the objects up its protoype chain.
// In the macbook example:

// allKeys(macBookPro) should return ["processor", "color", "extras", "ram"])
// allKeys(macBook) should return ["processor", "color", "ram"])

prototypes.allKeys = function(obj){
  var arr = [];
  for (var key in obj){
    arr.push(key)
  }
  return arr;
}

// Exercise 2 prototypes.keys()
// Write a function that receives an object and returns an array of all the keys
// in that object ONLY. It should't return properties of objects up its protoype
// chain. In the macbook example:

// keys(macBookPro) should return ["processor", "color", "extras"])

prototypes.keys = function(obj){
  var arr = [];
  for (var key in obj){
    if(obj.hasOwnProperty(key)){
      arr.push(key)
    }
  }
  return arr;
}
