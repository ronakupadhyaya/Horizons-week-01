"use strict";

// Write a function that takes a string and returns a compressed version.
// Compression should be performed as follows:
// - If a letter occurs more than once in a row, it should be replaced with
//   [letter][number of repeats]
// - If a letter occurs only once in a row, then it's not modified or
//   compressed.
//
// ex. compressString('') -> ''
// ex. compressString('a') -> 'a'
// ex. compressString('aa') -> 'a2'
// ex. compressString('aaaaaaaaa') -> 'a9'
// ex. compressString('abcaaabbb') -> 'abca3b3'
// ex. compressString('abcd') -> 'abcd'
// ex. compressString('aaabaaaaccaaaaba') -> 'a3ba4c2a4ba'
//
// Adapted from:
// https://www.hackerrank.com/challenges/string-compression
function compressString(string) {
  // YOUR CODE HERE
  var strArr = string.split('')
  var count = 1;
  var returnArr = [];
  var lastLetter;
  var returnStr = "";
  strArr.forEach(function(letter) {
    if (letter === lastLetter) {
      count++
      returnStr.splice(returnStr.length-1,1,count);
      console.log(returnArr)
    } else {
      lastLetter = letter;
      count = 1
      returnStr.push(letter);
      returnStr.push(count);
      console.log(returnArr)
    }
    console.log(returnArr)
  })
  /*
  for (var key in countObj) {
    if (countObj[key] === 1) {
      returnStr += key;
    } else {
      returnStr += key;
      returnStr += countObj[key];
    }
  }
  */
  returnArr.forEach(function(ele) {
    if (ele !== 1) {
      returnStr += ele;
    }
  })
  console.log(returnStr)
  return returnStr.join('');
}
