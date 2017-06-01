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
var myEnum = {
  'M': 1000,
  'D': 500,
  'C': 100,
  'L': 50,
  'X': 10,
  'V': 5,
  'I': 1
}

roman.parse = function(string) {
  var sum = 0;
  for (var i = 0; i < string.length; i++) {
    if (i != string.length - 1) {
      if (myEnum[string.charAt(i)] < myEnum[string.charAt(i + 1)]) {
        sum += myEnum[string.charAt(i+1)] - myEnum[string.charAt(i)];
        i++;
      } else {
        sum += myEnum[string.charAt(i)];
      }
    } else {
      sum += myEnum[string.charAt(i)];
    }
  }
  return sum;
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
function addToString(count, letter, string) {
  for (var i = 0; i < count; i++) {
    string += letter;
  }
  return string;
}

roman.toString = function(number) {
  //debugger;
  var stringNum = number + "";
  var nums = [];
  for (var i = stringNum.length - 1; i >= 0; i--) {
    nums.push(Number(stringNum.charAt(i)));
  }
  var romNum = "";
  for (var j = nums.length - 1; j >= 0; j--) {
    if (j >= 3) {
      romNum = addToString(nums[j], 'M', romNum);
    } else if (j === 2) {
      if (nums[j] === 4) {
        romNum = addToString(1, 'CD', romNum);
      } else if (nums[j] === 9) {
        romNum = addToString(1, 'CM', romNum);
      } else if (nums[j] >= 5) {
        romNum = addToString(1, 'D', romNum);
        romNum = addToString(nums[j] - 5, 'C', romNum);
      } else {
        romNum = addToString(nums[j], 'C', romNum);
      }
    } else if (j === 1) {
      if (nums[j] === 4) {
        romNum = addToString(1, 'XL', romNum);
      } else if (nums[j] === 9) {
        romNum = addToString(1, 'XC', romNum);
      } else if (nums[j] >= 5) {
        romNum = addToString(1, 'L', romNum);
        romNum = addToString(nums[j] - 5, 'X', romNum);
      } else {
        romNum = addToString(nums[j], 'X', romNum);
      }
    } else {
      if (nums[j] === 4) {
        romNum = addToString(1, 'IV', romNum);
      } else if (nums[j] === 9) {
        romNum = addToString(1, 'IX', romNum);
      } else if (nums[j] >= 5) {
        romNum = addToString(1, 'V', romNum);
        romNum = addToString(nums[j] - 5, 'I', romNum);
      } else {
        romNum = addToString(nums[j], 'I', romNum);
      }
    }
    
  }
  return romNum;
  

};










