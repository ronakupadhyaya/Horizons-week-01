"use strict";

window.roman = {};

// Write a function that takes a string that represents a roman numeral and
// returns its value as an integer.
//
// ex. roman.parse('XXVIII') -> 28
// ex. roman.parse('CCCXXVII') -> 327
// ex. roman.parse('CCCXLV') -> 345
// ex. roman.parse('CCCLIX') -> 359
// ex. roman.parse('CDV') -> 405
// ex. roman.parse('DCCIX') -> 709
// ex. roman.parse('DCCLII') -> 752
// ex. roman.parse('MCCIX') -> 1209
// ex. roman.parse('MCCLXXXVIII') -> 1288
// ex. roman.parse('MDXXI') -> 1521
// ex. roman.parse('MDLXXXV') -> 1585
// ex. roman.parse('MDCXLIX') -> 1649
// ex. roman.parse('MDCCLXXII') -> 1772
// ex. roman.parse('MDCCCX') -> 1810
// ex. roman.parse('MCMLXXXII') -> 1982
// ex. roman.parse('MMLXVI') -> 2066
// ex. roman.parse('MMLXXXVII') -> 2087
// ex. roman.parse('MMCXXXVIII') -> 2138
// ex. roman.parse('MMDCLIV') -> 2654
// ex. roman.parse('MMCMXVIII') -> 2918
// ex. roman.parse('MMCMLXIII') -> 2963
// ex. roman.parse('MMMCXIII') -> 3113
// ex. roman.parse('MMMCCXLVIII') -> 3248
// ex. roman.parse('MMMCCCXXXIII') -> 3333
// ex. roman.parse('MMMDCCXXXV') -> 3735
// ex. roman.parse('MMMMCXXVII') -> 4127
// ex. roman.parse('MMMMDLVIII') -> 4558
// ex. roman.parse('MMMMDCXX') -> 4620
// ex. roman.parse('MMMMDCXXVI') -> 4626
// ex. roman.parse('MMMMDCCCLXIV') -> 4864
roman.parse = function(string) {
  var stringArr = [];
  var number = 0;
  stringArr = string.split("")
  for (var i = 0; i < stringArr.length; i++) {
      if (stringArr[i] === "M") {
          number = number + 1000;
      }
      else if (stringArr[i] === "D") {
          number = number + 500;
      }
      else if (stringArr[i] === "C") {
          if (stringArr[i+1] === "M") {
              number = number + 900;
              stringArr.splice(i+1, 1);
          }
          else if (stringArr[i+1] === "D") {
              number = number + 400;
              stringArr.splice(i+1, 1);
          }
          else {
              number = number + 100;
          }
      }
      else if (stringArr[i] === "L") {
          number = number + 50;
      }
      else if (stringArr[i] === "X") {
          if (stringArr[i+1] === "L") {
              number = number + 40;
              stringArr.splice(i+1, 1);
          }
          else if (stringArr[i+1] === "C") {
              number = number + 90;
              stringArr.splice(i+1, 1);
          }
          else {
              number = number + 10;
          }
      }
      else if (stringArr[i] === "V") {
          number = number + 5;
      }
      else if (stringArr[i] === "I") {
          if (stringArr[i+1] === "X") {
              number = number + 9;
              stringArr.splice(i+1, 1);
          }
          else if (stringArr[i+1] === "V") {
              number = number + 4;
              stringArr.splice(i+1, 1);
          }
          else {
              number = number + 1
          }
      }
  }
  return number;

};

// Write a function that takes an integer and converts it to a roman numeral.
//
// ex. roman.toString(28) -> 'XXVIII'
// ex. roman.toString(327) -> 'CCCXXVII'
// ex. roman.toString(345) -> 'CCCXLV'
// ex. roman.toString(359) -> 'CCCLIX'
// ex. roman.toString(405) -> 'CDV'
// ex. roman.toString(709) -> 'DCCIX'
// ex. roman.toString(752) -> 'DCCLII'
// ex. roman.toString(1209) -> 'MCCIX'
// ex. roman.toString(1288) -> 'MCCLXXXVIII'
// ex. roman.toString(1521) -> 'MDXXI'
// ex. roman.toString(1585) -> 'MDLXXXV'
// ex. roman.toString(1649) -> 'MDCXLIX'
// ex. roman.toString(1772) -> 'MDCCLXXII'
// ex. roman.toString(1810) -> 'MDCCCX'
// ex. roman.toString(1982) -> 'MCMLXXXII'
// ex. roman.toString(2066) -> 'MMLXVI'
// ex. roman.toString(2087) -> 'MMLXXXVII'
// ex. roman.toString(2138) -> 'MMCXXXVIII'
// ex. roman.toString(2654) -> 'MMDCLIV'
// ex. roman.toString(2918) -> 'MMCMXVIII'
// ex. roman.toString(2963) -> 'MMCMLXIII'
// ex. roman.toString(3113) -> 'MMMCXIII'
// ex. roman.toString(3248) -> 'MMMCCXLVIII'
// ex. roman.toString(3333) -> 'MMMCCCXXXIII'
// ex. roman.toString(3735) -> 'MMMDCCXXXV'
// ex. roman.toString(4127) -> 'MMMMCXXVII'
// ex. roman.toString(4558) -> 'MMMMDLVIII'
// ex. roman.toString(4620) -> 'MMMMDCXX'
// ex. roman.toString(4626) -> 'MMMMDCXXVI'
// ex. roman.toString(4864) -> 'MMMMDCCCLXIV'
roman.toString = function(number) {
  var digit = 0;
  var array = []
  var number = number;
  var length;
  var ctr;
  var ones = number % 10;
  var tens = number % 100 - ones;
  var hundreds = number % 1000 - tens - ones;
  var thousands = number % 10000 - hundreds - tens - ones;
  var add = function(num) {
      length = num.toString().split("").length;
      if (length === 4) {
          ctr = num / 1000;
          while (ctr > 0) {
              array.push("M")
              ctr = ctr - 1;
          }
      }
      else if (length === 3) {
          ctr = num / 100;
          if (ctr === 9) {
              array.push("CM")
              ctr = 0;
          }
          else if (ctr >= 5) {
              array.push("D")
              ctr = ctr - 5;
          }
          else if (ctr === 4) {
              array.push("CD")
              ctr = 0;
          }
          while (ctr > 0) {
              array.push("C")
              ctr = ctr - 1;
          }
      }
      else if (length === 2) {
          ctr = num / 10;
          if (ctr >= 5) {
              array.push("L")
              ctr = ctr - 5;
          }
          else if (ctr === 4) {
              array.push("XL")
              ctr = 0;
          }
          while (ctr > 0) {
              array.push("X")
              ctr = ctr - 1;
          }
      }
      else if (length === 1) {
          ctr = num / 1;
          if (ctr === 9) {
              array.push("IX")
              ctr = 0;
          }
          else if (ctr >= 5) {
              array.push("V")
              ctr = ctr - 5;
          }
          else if (ctr === 4) {
              array.push("IV")
              ctr = 0;
          }
          while (ctr > 0) {
              array.push("I")
              ctr = ctr - 1;
          }
      }
  }
  add(thousands);
  add(hundreds);
  add(tens);
  add(ones);
  return array.join("");
};
