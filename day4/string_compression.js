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


function compareLetters(letter1, letter2){

  if(letter1 === letter2){
    return true;
  }
  return false;
}

function compressString(string) {

  var letter = string[0];

  var masterArr = [];

  var currStr = '';

  for(var i=0; i<string.length; i++) {

    if(compareLetters(letter, string[i])) {
      currStr += string[i];
      continue
    }
    masterArr.push(currStr);
    currStr = '';
  }

  console.log(masterArr);




  // if(string.length === 0) return string;
  //
  // var masterString = '';
  //
  // var lastLetter = string[0];
  // var currentNum = 0;
  //
  // for(var i=0; i<string.length; i++){
  //
  //     if(compareLetters(lastLetter, string[i])) {
  //       console.log('hit');
  //       currentNum++;
  //     } else{
  //
  //       masterString += lastLetter;
  //       if(! currentNum === 1)
  //         masterString += currentNum;
  //
  //       lastLetter = string[i];
  //       currentNum = 1;
  //     }
  // }
  //
  // masterString += lastLetter;
  //
  // if(!(currentNum === 1)) {
  //   console.log('helo');
  //   masterString += currentNum;
  // }
  //
  // console.log(masterString);
  //
  // return masterString;


}
