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
  var value = 0;
  for (var i = 0; i < string.length; i++) {
    var char = string[i];
    if (char === "I") {
      if (string[i+1] === "V") {
        value += 4;
        i++;
      } else if (string[i+1] === "X") {
        value += 9;
        i++;
      } else {
        value += 1;
      }
    } else if (char === "V") {
      value += 5;
    } else if (char === "X") {
      if (string[i+1] === "L") {
        value += 40;
        i++;
      } else if (string[i+1] === "C") {
        value += 90;
        i++;
      } else {
        value += 10;
      }
    } else if (char === "L") {
      value += 50;
    } else if (char === "C") {
      if (string[i+1] === "D") {
        value += 400;
        i++;
      } else if (string[i+1] === "M") {
        value += 900;
        i++;
      } else {
        value += 100;
      }
    } else if (char === "D") {
      value += 500;
    } else if (char === "M") {
      value += 1000;
    }
  }
  return value;
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
  var str = [];
  while (number > 0) {
    if (number >= 1000) {
      str.push("M");
      number -= 1000;
    } else if (number >= 900) {
      str.push("CM");
      number -= 900;
    } else if (number >= 500) {
      str.push("D");
      number -= 500;
    } else if (number >= 400) {
      str.push("CD");
      number -= 400;
    } else if (number >= 100) {
      str.push("C");
      number -= 100;
    } else if (number >= 90) {
      str.push("XC");
      number -= 90;
    } else if (number >= 50) {
      str.push("L");
      number -= 50;
    } else if (number >= 40) {
      str.push("XL");
      number -= 40;
    } else if (number >= 10) {
      str.push("X");
      number -= 10;
    } else if (number >= 9) {
      str.push("IX");
      number -= 9;
    } else if (number >= 5) {
      str.push("V");
      number -= 5;
    } else if (number >= 4) {
      str.push("IV");
      number -= 4;
    } else {
      str.push("I");
      number -= 1;
    }
  }
  return str.join("");
};
