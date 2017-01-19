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
  var compressedString = '';
  var curChar = string[0];
  var curCounter = 1;

  if (string.length === 0) return '';

  for (var i=1; i<string.length; i++) {
    if (string[i] === curChar) {
      console.log(string[i]);
      curCounter++;
    } else {
      compressedString += curCounter === 1 ? curChar : curChar + curCounter;
      curChar = string[i];
      curCounter = 1;
    }
  }

  // add the last item
  compressedString += curCounter === 1 ? curChar : curChar + curCounter;

  return compressedString;
}
