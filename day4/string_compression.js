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
  var current = 0;
  var prev = 0;
  var ret = "";
  while (current < string.length) {
    var prev = current;
    current = nextDiffLetter(current, string);
    console.log(prev, current);
    var math = current - prev;
    console.log(string[prev] + math);
    if (math > 1) {
      ret += string[prev] + math;
    } else {
      ret += string[prev];
    }

  }
  return ret;
  
  function nextDiffLetter(currentIndex, string) {
    var current = currentIndex;
    var counter = 0;
    while (string[currentIndex] === string[current]) {
      current++;
      counter++;
    }
    return currentIndex + counter;
  }
}
