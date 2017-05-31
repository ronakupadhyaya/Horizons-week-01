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
  //Part 1
  var numbersAndOpps = expression.split(' ');
  var amountOpperators = 0;
  var amountNumbers = 0;
  var binaryArray = [];

  if(expression.length === 0){
    throw "Error, empty expression"
  }


  for(var i = 0; i < numbersAndOpps.length; i++){
    if(!(isNaN(parseInt(numbersAndOpps[i])))) {
      amountNumbers += 1
      binaryArray.push(1)

    }else{
      amountOpperators += 1
      binaryArray.push(0)
    }
  }
  //console.log('expression: ' + expression + ' amt num: ' + amountNumbers + ' amt op: ' +amountOpperators)
    if(amountOpperators === 0 && numbersAndOpps.length > 1){
      throw "Error Missing operator"
    }
    if(amountNumbers === 0){
      throw "Error, No Numbers"
    }
    if(amountOpperators >= amountNumbers){
      throw "Too Many operators!"
    }

    if(amountNumbers > amountOpperators + 1){
      throw "Too Many Numbers!"
    }

    if(binaryArray.length % 2 !== 0){
      for(var i = 0; i < binaryArray.length; i += 2){
        if(binaryArray[i] !== 1){
          throw "Error, operator in wrong spots"
        }
      }
    }
  // console.log("amt ops " + amountOpperators);
  // console.log("amt num " + amountNumbers);
  // if(typeof numbersAndOpps[0] === 'number' && typeof numbersAndOpps[n] === 'number')
// var counter = 0;
// var mdVal = 1;
// var arr = [];
// for(var i = 0; i < numbersAndOpps.length; i++){
//   // if((numbersAndOpps[i] === "/" || numbersAndOpps[i] === "*") && counter === 0){
//   //   counter += 1;
//   // }
//   if (numbersAndOpps[i] === "+" || numbersAndOpps[i] === "-") {
//
//   }
//   if (numbersAndOpps[i] === "/") {
//     if (counter === 0) {
//       mdVal = numbersAndOpps[i - 1];
//       counter += 1;
//     }
//     mdVal = mdVal / numbersAndOpps[i + 1];
//   }
//   if (numbersAndOpps[i] === "*") {
//     if (counter === 0) {
//       mdVal = numbersAndOpps[i - 1];
//       counter += 1;
//     }
//     mdVal = mdVal * numbersAndOpps[i + 1];
//   }
// }
for(var i = 0; i < numbersAndOpps.length ; i++){
  if(numbersAndOpps[i] === '/'){
    numbersAndOpps[i - 1] = numbersAndOpps[i - 1] / numbersAndOpps[i + 1]
    numbersAndOpps.splice(i, 2);
    i -= 1
  }
  if(numbersAndOpps[i] === '*'){
    numbersAndOpps[i - 1] = numbersAndOpps[i - 1] * numbersAndOpps[i + 1]
    numbersAndOpps.splice(i , 2);
    i -= 1

  }
  console.log(numbersAndOpps)
}

var val = parseFloat(numbersAndOpps[0]);
  for(var i = 0; i < numbersAndOpps.length; i++){
    console.log(numbersAndOpps.length);

    if(numbersAndOpps[i] === '+'){
      val = val + parseFloat(numbersAndOpps[i + 1]);
      console.log(parseFloat(numbersAndOpps[i + 1]));
      console.log(val)
    }
    if(numbersAndOpps[i] === '-'){
      val = val - parseFloat(numbersAndOpps[i + 1]);
    }
  }
  return val
}
