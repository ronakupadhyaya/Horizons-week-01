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
  // YOUR CODE HERE
  var result = 0;
  for (var i = 0; i < string.length; i++) {
    if (string[i] === 'I' && i !== string.length - 1 && string[i + 1] !== 'V' && string[i + 1] !== 'X' || string[i] === 'I' && i === string.length - 1) {
      result += 1;
    } else if (string[i] === 'V' && i !== 0 && string[i - 1] !== 'I' || string[i] === 'V' && i === 0) {
      result += 5;
    } else if (string[i] === 'I' && i !== string.length - 1 && string[i + 1] === 'V') {
      result += 4;
    } else if (string[i] === 'I' && i !== string.length - 1 && string[i + 1] === 'X') {
      result += 9;
    } else if (string[i] === 'X' && i !== string.length - 1 && string[i + 1] !== 'L' && string[i + 1] !== 'C' || string[i] === 'X' && i === string.length - 1 && string[i - 1] !== 'I') {
      result += 10;
    } else if (string[i] === 'X' && i !== string.length - 1 && string[i + 1] === 'L') {
      result += 40;
    } else if (string[i] === 'X' && i !== string.length - 1 && string[i + 1] === 'C') {
      result += 90;
    } else if (string[i] === 'C' && i !== string.length -1 && i !== 0 && string[i - 1] !== 'X' && string[i + 1] !== 'D' && string[i + 1] !== 'M') {
      result += 100;
    } else if (string[i] === 'C' && i === 0 && string[i + 1] !== 'D' && string[i + 1] !== 'M') {
      result += 100;
    } else if (string[i] === 'C' && i === string.length - 1 && string[i - 1] !== 'X') {
      result += 100;
    } else if (string[i] === 'C' && i !== string.length - 1 && string[i + 1] === 'D') {
      result += 400;
    } else if (string[i] === 'C' && i !== string.length - 1 && string[i + 1] === 'M') {
      result += 900;
    } else if (string[i] === 'L' && i !== 0 && string[i - 1] !== 'X' || string[i] === 'L' && i === 0) {
      result += 50;
    } else if (string[i] === 'D' && i !== 0 && string[i - 1] !== 'C' || string[i] === 'D' && i === 0) {
      result += 500;
    } else if (string[i] === 'M' && i !== 0 && string[i - 1] !== 'C' || string[i] === 'M' && i === 0) {
      result += 1000;
    }
  }
  return result;
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
  // YOUR CODE HERE
  var result = "";
  while (number >= 0) {
    if (number % 1000 >= 0) {
      number = number % 1000;
      result += 'M';
    } else if (number % 900 >= 0) {
      number = number % 900;
      result += 'CM';
    } else if (number % 500 >= 0) {
      number = number % 500;
      result += 'D';
    } else if (number % 400 >= 0) {
      number = number % 400;
      result += 'CD';
    } else if (number % 100 >= 0) {
      number = number % 100;
      result += 'C';
    } else if (number % 90 >= 0) {
      number = number % 90;
      result += 'XC';
    } else if (number % 50 >= 0) {
      number = number % 50;
      result += 'L';
    } else if (number % 40 >= 0) {
      number = number % 40;
      result += 'XL';
    } else if (number % 10 >= 0) {
      number = number % 10;
      result += 'X';
    } else if (number % 9 >= 0) {
      number = number % 9;
      result += 'IX';
    } else if (number % 5 >= 0) {
      number = number % 5;
      result += 'V';
    } else if (number % 4 >= 0) {
      number = number % 4;
      result += 'IV';
    } else if (number % 1 >= 0) {
      number = number % 1;
      result += 'I';
    }
  }
  return result;
};
