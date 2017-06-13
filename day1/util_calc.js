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

  var expArr = expression.split(' ');
  for(var i = 0; i<expArr.length; i++){
    if(expArr[i] == "sqrt"){
      var substitute = Math.sqrt(parseFloat(expArr[i+1]))
      expArr[i+1] = substitute;
      expArr.splice(i, 1)

    }
  }

  var numArr = [];
  var oprArr = [];
  for (var i=0; i<expArr.length; i++){
    if (i%2 == 0){
      numArr.push(expArr[i]);
    }
    if (i%2 == 1){
      oprArr.push(expArr[i]);
    }
  }
  if(expArr[expArr.length-1] == "+" ||
expArr[expArr.length-1] == "-" ||
expArr[expArr.length-1] == "*" ||
expArr[expArr.length-1] == "/"
){
  throw "error"
}

  for (var i=0; i<numArr.length; i++){
    if (numArr[i] === '+' ||
        numArr[i] === '-' ||
        numArr[i] === '*' ||
        numArr[i] === '/') {
          throw "Error";
        };
  }
  for (var i=0; i<oprArr.length; i++ ){
    if (!["+",'-','*','/'].includes(oprArr[i])) {
      throw "Error";
    }

//     (oprArr[i] === '+' ||
//         oprArr[i] === '-' ||
//         oprArr[i] === '*' ||
//         oprArr[i] === '/' ) {
//
//         };
// else{
//       throw "Error";
//     };
  }
  if(expression.length == 0){
    throw "Error"
  }

  // ex. util.calc('1') -> 1
  // ex. util.calc('-12') -> -12
  // ex. util.calc('3 + 2') -> 5
  // ex. util.calc('3 + 8 + 2 + 1    ') -> 14
  // ex. util.calc('2 - 1 + 5 + 6') -> 12
  // ex. util.calc('-1 + 3 - 2 + 5') -> 5
  var tempResult = parseFloat(numArr[0]);

  // var num = 1
  // var bool = false
  // var cool = false
  for(var i=0; i<expArr.length; i++){
    if(expArr[i] == "*"){
      var substitute = parseFloat(expArr[i-1]) * parseFloat(expArr[i+1])
      expArr[i+1] = substitute;
      console.log(substitute);
      expArr.splice(i-1, 2);
      i=0;
    }
    else if( expArr[i] == "/"){
      var substitute = parseFloat(expArr[i -1]) / parseFloat(expArr[i+1])
      expArr[i+1] = substitute;
      console.log(substitute)
      expArr.splice(i-1, 2);
      i=0;
    }
  }
  console.log(expArr);
var tempResult = parseFloat(expArr[0])
  for (var i=0; i<expArr.length; i++){
    if (expArr[i] == "+"){
      tempResult = tempResult + parseFloat(expArr[i+1]);
    }
    if (expArr[i] == "-"){
      tempResult = tempResult - parseFloat(expArr[i+1]);
    }
  }
  return tempResult;

};










  //   if(oprArr[i] === "*" && bool === false){
  //     num = num * parsefloat(numArr[i]) * parsefloat(numArr[i+1])
  //     bool = true
  //     console.log(num)
  //
  //     continue;
  //     }
  //   if(oprArr[i] === "*"){
  //     num = num * parsefloat(numArr[i+1])
  //     console.log(num)
  //     continue;
  //   }
  //   if(oprArr[i] === "/" && cool === false && num > 1){
  //     num = num / parsefloat(numArr[i+1])
  //     console.log(num)
  //
  //     continue;
  //
  //   }
  //   if(oprArr[i] === "/"){
  //     num = parsefloat(numArr[i]) / parsefloat(numArr[i])
  //     console.log(num)
  //
  //     continue;
  //
  //   }
  //   console.log(num)
  //   return num
  // }


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
