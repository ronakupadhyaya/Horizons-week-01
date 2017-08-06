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
// ex. util.calc('1 2') -> Error, missing operator
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
  // YOUR CODE HERE
  if(expression === ''){
    throw exception("Hey");
  }

  var arr = expression.split(' ');
  // console.log(arr);

  for(var i = 0; i < arr.length; i++){
    if (arr[i] == 'sqrt') {
      if (isNaN(arr[i+1])) throw exception("Howdy");
      else {
        var ans = Math.sqrt(arr[i+1]);
        arr[i] = ans;
        arr.splice(i+1, 1);
      }
    }
  };

  if(arr.length % 2 === 0){
    throw exception("Hi");
  }


// console.log("check 1");
  for(var i = 0; i < arr.length; i++){

    var even = parseInt(arr[i]);
    if(i%2 === 0 && isNaN(even)){
      throw exception("Hello");
    }
    else if(i%2 !== 0 && !isNaN(even)){
      throw exception("Hola");
    }
  }


var number;
  for(var i = 1; i < arr.length; i++){
    if(i%2 !==0){
      if(arr[i] === '*'){
        number = parseFloat(arr[i+1]) * parseFloat(arr[i-1]);
        arr[i - 1] = number;
        arr.splice(i, 2);
        i--;
      } else if(arr[i] ==='/'){
         number = parseFloat(arr[i-1]) / parseFloat(arr[i+1]);
         arr[i - 1] = number;
         arr.splice(i, 2);
         i--;
      }
    }
  }

  console.log(arr);

var result = parseFloat(arr[0]);
  for(var i = 1; i < arr.length; i++){
    if(i%2 !==0){
      if(arr[i] === '+'){
        result += parseFloat(arr[i+1]);
      } else if(arr[i] ==='-'){
        result -= parseFloat(arr[i+1]);
      }
    }
  }

  return result;

};
