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
  //split expression into array
  if (expression == ''){
    throw 'Empty expression';
  }
  var expArray = expression.split(" ");
  var testArray = [];
  var operators = "+-/*%";
  var sqrt = 'sqrt';
  var numArray = [];
  var opArray = [];
  var tempGreatestOp;
  var tempGreatestOpIndex =0;
  var temp = 0;
  //check if array is empty
  if(expArray.length == 0){
    throw "Error!";
  }
  //changes string of numbers to numbers and places all elements into testArray
  for(var i = 0; i < expArray.length; i++) {
    if (operators.indexOf(expArray[i]) < 0) {
      testArray.push(parseFloat(expArray[i]));
    } else{
      testArray.push(expArray[i]);
    }
  }
  if(typeof testArray[0] == "string"){
    throw "Error! First item is nota number!";
  }
  if(typeof testArray[testArray.length -1] == "string"){
    throw "Error! Last item is not a number!";
  }
  for(var i = 1; i< testArray.length-1; i++) {
    //test if first number is not an operator
    if(typeof testArray[i] == "string" && !( typeof testArray[i-1] == "number" && typeof testArray[i+1] == "number")) {
      throw "Error! There was a repeated operator";
    } else if(typeof testArray[i] == "number" && !( typeof testArray[i-1] == "string" && typeof testArray[i+1] == "string")) {
      throw "Error! There was a repeated number!";
    }
  }
  // check that it is number or op and assign it to correct array
  for (var i = 0;i<testArray.length;i++){
    if(typeof testArray[i] == 'number'){
      numArray.push(testArray[i]);
    }
    if(typeof testArray[i] == 'string'){
      opArray.push(testArray[i]);
    }
  }
  if(opArray.length == 0 && numArray.length > 1){
    throw "Error. No num or op";
  }
  if(numArray.length ==1){
    return numArray[0];
  }
  while(opArray.length > 0){
    for(var j = 0; j < opArray.length; j++){
      if((opArray.join('')).indexOf("*") > -1 || (opArray.join('')).indexOf("/") > -1){
        if(opArray[j] === '*' || opArray[j] === "/"){
          tempGreatestOp = opArray[j];
          tempGreatestOpIndex = j;
          break; // conitnue or break
        } else if (opArray[j] === '+' || opArray[j] === '-'){
          tempGreatestOp = opArray [j];
          tempGreatestOpIndex = j;
        }
      } else {
        tempGreatestOp = opArray[j];
        tempGreatestOpIndex = j;
        break;
      }
      debugger;
    }
    debugger;
    if(tempGreatestOp === '*'){
      temp = numArray[tempGreatestOpIndex]*numArray[tempGreatestOpIndex+1];
      numArray[tempGreatestOpIndex] = temp;
      numArray.splice(tempGreatestOpIndex+1,1)
      opArray.splice(tempGreatestOpIndex,1);
    } else if(tempGreatestOp === '/'){
      temp = numArray[tempGreatestOpIndex]/numArray[tempGreatestOpIndex+1];
      numArray[tempGreatestOpIndex] = temp;
      numArray.splice(tempGreatestOpIndex+1,1)
      opArray.splice(tempGreatestOpIndex,1);
    } else if (tempGreatestOp === '+'){
      temp = numArray[tempGreatestOpIndex]+numArray[tempGreatestOpIndex+1];
      numArray[tempGreatestOpIndex] = temp;
      numArray.splice(tempGreatestOpIndex+1,1)
      opArray.splice(tempGreatestOpIndex,1);
    } else if (tempGreatestOp === '-'){
      temp = numArray[tempGreatestOpIndex]-numArray[tempGreatestOpIndex+1];
      numArray[tempGreatestOpIndex] = temp;
      numArray.splice(tempGreatestOpIndex+1,1)
      opArray.splice(tempGreatestOpIndex,1);
    }
    temp = null;
    tempGreatestOpIndex = null;
    tempGreatestOp = null;
  }
  return numArray[0];
}


  //check position of operator (operator between two numbers)

  //check if two numbers are next to each other
