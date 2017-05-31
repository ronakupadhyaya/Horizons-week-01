window.util = {};

// Calculator Exercise
//
// Write a function calc() that takes a string that represents an arithmetic
// operation (such as "3 + 2") and returns the numerical result of the
// operation.
//
// You can assume that each number or operator (i.e. + - / *) is separated by a single
// space.
//
// Part 1. If an invalid expression is given, throw an exception.
//
// ex. util.calc('') -> Error, empty expression
// ex. util.calc('1 2') -> Error, mission operator
// ex. util.calc('-') -> Error, no numbers
// ex. util.calc('1 2 +') -> Error, operator at the wrong spot
// ex. util.calc('+ 1 -18') -> Error, operator at the wrong spot
// ex. util.calc('1 + 55 -2') -> Error, too many numbers
// ex. util.calc('29 + + 1') -> Error, too many operators
// ex. util.calc('29 + 1 +') -> Error, too many operators
//
// Part 2. Implement support for addition and subtraction.
//
// ex. util.calc('1') -> 1
// ex. util.calc('-12') -> -12
// ex. util.calc('3 + 2') -> 5
// ex. util.calc('3 + 8 + 2 + 1    ') -> 14
// ex. util.calc('2 - 1 + 5 + 6') -> 12
// ex. util.calc('-1 + 3 - 2 + 5') -> 5
//
// Part 3. Implement support for multiplication and division.
// Note that the order of operations matters. Multiplication and division needs
// to be perfomed before addition and subtraction.
//
// ex. util.calc('1 * 3 / 5 + 2') -> 2.6
// ex. util.calc('1 + 3 / 2 - 5') -> -2.5
// ex. util.calc('5 * 6 + 8 / 9 * 4.5') -> 34
// ex. util.calc('1 / 0 + 1 * 0') -> Infinity
// ex. util.calc('1 / 0 * 0 + 1') -> NaN
//
// Bonus: Implement support for the square root operator.
// Implement support for the `sqrt` operator. `sqrt` is an operator that takes
// only one argument (i.e. a unary operator). `sqrt` applied before all other
// operators
// other operators and only operates on the value after it.
// There should be a single space before and after `sqrt`.
//
// Note: you can use the builtin Math.sqrt() function.
//
// ex. util.calc('sqrt 4') -> 2, same as Math.sqrt(4)
// ex. util.calc('sqrt 4 - 3') -> -1
// ex. util.calc('-1 * sqrt 4 - 3') -> -5
// ex. util.calc('sqrt 9 - 3 * 10') -> -27
// ex. util.calc('10 * sqrt 81') -> 90
util.calc = function(expression) {
  var numcount = 0;
  var opcount = 0;

  var arr = expression.split(" ");
  if(expression.length === 0){
    throw 'Error, empty expression';
  }

  //debugger;
  while(arr.indexOf("sqrt") != -1){
    var replace = Math.sqrt(arr[arr.indexOf("sqrt") + 1]);
    arr.splice(arr.indexOf("sqrt"), 2, replace);
  }

  for(var i = 0; i < arr.length; i++){
    var val = arr[i];
    if(val === '-'){
      opcount++;
    } else if(val === '+'){
      opcount++;
    }else if(val === '/'){
      opcount++;
    }else if(val === '*'){
      opcount++;
    } else if(parseInt(val) !== NaN){
      numcount++;
    }else{
      throw 'Error';
    }
  }

  for(var n = 0; n < arr.length; n += 2){
    var num = parseInt(arr[n]);
    if(isNaN(num)){
      throw 'Error';
    }
  }

  if(opcount === 0 && numcount > 1){
    throw 'Error, mission operator';
  }

  if(numcount === 0){
    throw 'Error, no numbers';
  }

  if(opcount + 1 !== numcount){
    throw 'Error';
  }

  //begin implementing actual functions here
  //debugger;
  var final = [];
  final.push(parseFloat(arr[0]));
  for(var j = 1; j < arr.length; j += 2){
    if(arr[j] === '*'){
      final.push(parseFloat(final.pop())*parseFloat(arr[j+1]));
    } else if (arr[j] === '/'){
      final.push(parseFloat(final.pop())/parseFloat(arr[j+1]));
    } else {
      final.push(arr[j]);
      final.push(parseFloat(arr[j+1]));
    }
  }

  var answer = 0;
  answer += final[0];
  for(var m = 2; m < final.length; m += 2){
    if(final[m-1] === '+'){
      answer += final[m];
    }else {
      answer -= final[m];
    }
  }
  return answer;
};
