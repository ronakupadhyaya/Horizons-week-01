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
  var numerals = {'I' : 1, 'V' : 5, 'X' : 10, 'L' : 50, 'C' : 100, 'D' : 500, 'M' : 1000};
  var exceptions = {'IV' : 4, 'IX' : 9, 'XL' : 40, 'XC' : 90, 'CD' : 400, 'CM' : 900};

  if(string.length === 1){
    return numerals[string];
  }

  var sum = 0;
  for(var i = 1; i <= string.length; i++){
    var currChar = string.charAt(i-1);
    var nextChar = string.charAt(i)
    if(nextChar && exceptions[currChar+nextChar]){
      sum += exceptions[currChar+nextChar];
      i++;
    } else if(i === string.length-1){
      sum += numerals[currChar];
      sum += numerals[nextChar];
      break;
    } else {
      sum += numerals[currChar];
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
roman.toString = function(number) {
  var strNum = number.toString();
  var ones = {"0" : "", "1" : "I", "2" : "II", "3" : "III", "4" : "IV", "5" : "V", "6" : "VI", "7" : "VII", "8" : "VIII", "9" : "IX"};
  var tens = {"0" : "", "1" : "X", "2" : "XX", "3" : "XXX", "4" : "XL", "5" : "L", "6" : "LX", "7" : "LXX", "8" : "LXXX", "9" : "XC"};
  var hundreds = {"0" : "", "1" : "C", "2" : "CC", "3" : "CCC", "4" : "CD", "5" : "D", "6" : "DC", "7" : "DCC", "8" : "DCCC", "9" : "CM"};
  var thousands = {"1" : "M", "2" : "MM", "3" : "MMM", "4" : "MMMM"};

  var onesDigit;
  var tensDigit;
  var hundredsDigit;
  var thousandsDigit;

  var numeral = "";
  debugger;
  if(strNum.length > 3){
    thousandsDigit = strNum[strNum.length-4];
    numeral += thousands[thousandsDigit];
  }
  if(strNum.length > 2){
    hundredsDigit = strNum[strNum.length-3];
    numeral += hundreds[hundredsDigit];
  }
  if(strNum.length > 1){
    tensDigit = strNum[strNum.length-2];
    numeral += tens[tensDigit];
  }
  if(strNum.length > 0){
    onesDigit = strNum[strNum.length-1];
    numeral += ones[onesDigit];
  }

  return numeral;
};
