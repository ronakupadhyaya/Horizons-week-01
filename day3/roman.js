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
  var arr = string.split('');

  for (var k = 0; k < arr.length; k++) {
    if (arr[k] === 'M')
      arr[k] = 1000;
    else if (arr[k] === 'D')
      arr[k] = 500;
    else if (arr[k] === 'C')
      arr[k] = 100;
    else if (arr[k] === 'L')
      arr[k] = 50;
    else if (arr[k] === 'X')
      arr[k] = 10;
    else if (arr[k] === 'V')
      arr[k] = 5;
    else
      arr[k] = 1;
  }

  for (var k = 0; k < arr.length - 1; k++) {
    if (arr[k] < arr[k + 1])
      arr.splice(k, 2, arr[k + 1] - arr[k])
  }

  arr = arr.reduce(function(a, b) {
    return a + b;
  })
  return arr;
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
  var holder = number;
  var answer = '';

  debugger;

  var ms = Math.floor(holder / 1000)
  while (ms > 0) {
    answer += 'M';
    ms--;
  }
  number %= 1000;
  holder = number;

  if (Math.floor(holder / 900) > 0)
    answer += 'CM'
  number %= 900;
  holder = number;

  var ds = Math.floor(holder / 500)
  if (ds < 2) {
    while (ds > 0) {
      answer += 'D';
      ds--;
    }
  } else {
    answer += 'DM';
  }
  number %= 500;
  holder = number;

  var cs = Math.floor(holder / 100)
  if (cs < 4) {
    while (cs > 0) {
      answer += 'C'
      cs--;
    }
  } else {
    answer += 'CD';
  }
  number %= 100;
  holder = number;

  if (Math.floor(holder / 90) > 0)
    answer += 'XC'
  number %= 90;
  holder = number;

  var ls = Math.floor(holder / 50)
  if (ls < 2) {
    while (ls > 0) {
      answer += 'L';
      ls--;
    }
  } else {
    answer += 'LC';
  }
  number %= 50;
  holder = number;

  var xs = Math.floor(holder / 10)
  if (xs < 4) {
    while (xs > 0) {
      answer += 'X';
      xs--;
    }
  } else {
    answer += 'XL';
  }
  number %= 10;
  holder = number;

  if (Math.floor(holder / 9) > 0)
    answer += 'IX'
  number %= 9;
  holder = number;

  var vs = Math.floor(holder / 5)
  if (vs < 2) {
    while (vs > 0) {
      answer += 'V';
      vs--;
    }
  } else {
    answer += 'VX'
  }
  number %= 5;
  holder = number;

  var is = Math.floor(holder / 1)
  if (is < 4) {
    while (is > 0) {
      answer += 'I';
      is--;
    }
  } else {
    answer += 'IV';
  }
  number %= 1;
  holder = number;

  return answer;
};