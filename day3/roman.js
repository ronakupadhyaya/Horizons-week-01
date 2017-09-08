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

var map = {
	M: 1000,
	D: 500,
	C: 100,
	L: 50,
	X: 10,
	V: 5, 
	I: 1
};

var letters = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
var values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

function toInt(s){
	if (s.length > 1)
		throw "Error, you may only pass 1 letter at a time";
	else
		return parseInt(map[s]);
}

roman.parse = function(string) {
  // YOUR CODE HERE
  var int = 0;
  for (var i = 0; i < string.length; i++){
  	var addValue = toInt(string[i]);
  	if (i !== string.length-1){
	  	if (toInt(string[i+1]) > toInt(string[i])){
	  		addValue = (toInt(string[i+1]) - toInt(string[i]));
	  		i++;
	  	}
  	}
  	int += addValue;
  }
  return int;
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
  var s = '';
  var i = 0;
  var currVal;
  while (number > 0){
  	currVal = values[i];
  	if (number >= currVal){
  		number -= currVal;
  		s += letters[i];
  	}
  	else if (i != letters.length-1)
  		i++;
  	else
  		return s;
  }
  return s;
};
