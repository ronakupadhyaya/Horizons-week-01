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

  for(var i = 0; i < string.length; i++){

    if(string[i] === 'M'){
      result += 1000;
    }

    if(string[i] === 'C'){
      if(string[i+1] && string[i+1] === 'M'){
        result += 900;
        i++;
        continue;
      } else if (string[i+1] && string[i + 1] === 'D'){
        result+= 400;
        i++;
        continue;
      } else {
        result += 100;
      }
    }

    if(string[i] === 'D'){
      result += 500;
    }

    if(string[i] === 'L'){
      if(string[i+1] && string[i + 1] === 'D'){
        result += 450;
        i++;
        continue;
      } else {
        result += 50;
      }
    }

    if(string[i] === 'X'){
      if(string[i+1] && string[i+1] === 'C'){
        result += 90;
        i++;
        continue;
      } else if(string[i+1] && string[i+1] === 'L'){
        result += 40;
        i++;
        continue;
      } else{
        result += 10;
      }
    }

    if(string[i] === 'V'){
      if(string[i+1] && string[i+1] === 'L'){
        result+=45;
        i++;
        continue;
      } else{
        result+=5;
      }
    }

    if(string[i] === 'I'){
      if(string[i+1] && string[i+1] === 'X'){
        result+=9;
        i++;
        continue;
      } else if(string[i+1] && string[i+1] === 'V'){
        result+=4;
        i++;
        continue;
      } else{
        result++;
      }
    }
}
  return result;
}

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
  var arr = [];

  while(number >= 1000){
    number = number - 1000;
    arr.push('M');
  }

  while(number >= 500){
    if(number >= 900){
      arr.push('C');
      arr.push('M');
      number = number - 900;
      continue;
    }

    number = number - 500;
    arr.push('D');

  }

  while(number >= 100){

    if(number >= 400){
      arr.push('C');
      arr.push('D');
      number = number - 400;
      continue;
    }

    number = number - 100;
    arr.push('C')
  }

  while(number >= 50){

    if(number === 40){
      arr.push('X');
      arr.push('L');
      number = number - 40;
      continue;
    }

      number = number - 50;
      arr.push('L');
  }

  while(number >= 10){

    if(number>=40){
      arr.push('X');
      arr.push('L');
      number = number - 40;
      continue;
    }

    number = number - 10;
    arr.push('X');
  }

  while(number >= 5){

    if(number === 9){
      arr.push('I');
      arr.push('X');
      number = number - 9;
      continue;
    }

    number = number - 5;
    arr.push('V');
  }

  while(number >= 1){
    if(number === 4){
      arr.push('I');
      arr.push('V');
      number = number - 4;
      continue;
      }

      number--;
      arr.push('I');
  }
  var str = arr.join('');
  return str;

};
