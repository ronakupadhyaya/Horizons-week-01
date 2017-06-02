"use strict";

window.prototypes = {};

// Part 3: Iteration.

// *To go to part 4: -> week01/day3/prototypes_2.html

// In this exercise, you will be implementing functions that will allow you to
// iterate through objects keys.

// Exercise 1 prototypes.allKeys()
// Write a function that receives an object and returns an array of all the keys
// in that object and on all the objects up its protoype chain.
// In the macbook example:

// var macBook = {
//   ram: "8gb",
//   processor: "i3",
// }
// var macBookPro = {
//   processor: "i5",
//   color: "Space gray"
// }
// var touchBarMacbook = {
//   extras: "touchBar"
// };
//
// macBookPro.__proto__ = macBook;
// touchBarMacbook.__proto__ = macBookPro;

// allKeys(touchBarMacbook) should return ["extras", "processor", "color", "ram"])
// allKeys(macBookPro) should return ["processor", "color", "ram"])
// allKeys(macBook) should return ["processor", "ram"])

prototypes.allKeys = function(obj){
  var keyArr = [];
  for (var key in obj) {
    keyArr.push(key);
  }
  return keyArr;
}

// Exercise 2 prototypes.keys()
// Write a function that receives an object and returns an array of all the keys
// in that object ONLY. It should't return properties of objects up its protoype
// chain. In the macbook example:


// keys(macBook)) -> ["ram", "processor"];
// keys(macBookPro) -> ["processor", "color"];
prototypes.keys = function(obj){
 var arr = [];
 for (var key in obj) {
   if (obj.hasOwnProperty(key)) {
     arr.push(key);
   }
 }
 return arr;
 }



//   var finArr = [];
//   var objKeys = prototype.allKeys(obj);
//   var protoKeys = prototype.allKeys(obj.__proto__);
//   for (var i = 0; i < objKeys.length; i++) {
//     for (var j = 0; j < protoKeys.length; j++) {
//       if (objKeys[i] === protoKeys[j]) {
//         finArr.splice(objKeys[i], objKeys[i]);
//         i = 0;
//         j--;
//       }
//     }
//   }
//   return objKeys;
// }
