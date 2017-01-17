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
//PART 1
  var checkArray = expression.split(" ");

  var newArray = [];
  var numberArray = [];
  var operatorArray = [];
  var parseArray = function () {
    for (var x = 0; x<checkArray.length; x++) {
        var push = parseFloat(checkArray[x]);
        newArray.push(push);
    }
  }
  parseArray();
  var checkEven = function () {
    var test = true
    for (var x = 0; x<checkArray.length; x+=2) {
      numberArray.push(checkArray[x]);
      if (isNaN(checkArray[x])) {
        test = false;
      }
    }
  //  console.log(numberArray.length);
    return test;
  }

  var checkOdd = function () {
    var test = true;

    for (var x = 1; x<checkArray.length; x+=2) {
      operatorArray.push(checkArray[x])
      if (!isNaN(checkArray[x])) {
        test = false;
      }
    }
    return test

  }

  if (typeof newArray[0] !== "number" || isNaN(newArray[0] )) {
    throw "Error, empty expression"
  }
  else if (!checkOdd() || !checkEven()) {
    throw "Error, operators at the wrong spot"
  }
  else if (typeof newArray[newArray.length-1] !== "number") {
    throw "Error, too many operators"
  }

  else if(isNaN(newArray[newArray.length-1])){
    throw "Error"
  }



  var answer = 0;

  var calcAnswer = function () {
    answer = parseFloat(numberArray[0]);
    for (var c = 0; c<operatorArray.length ; c++) {
      if (operatorArray[c] === "+") {

        answer = answer + parseFloat(numberArray[c+1]);
      }
      else if (operatorArray[c] === "-") {

        answer = answer - parseFloat(numberArray[c+1]);
      }
    }
    console.log(answer)
    return answer
  }
  return calcAnswer();



}

//PART 2







    /*switch(newArray[i]){
      case "+":
        newArray[i] = +;
        break;
      case "-":
        newArray[i] = -;
      case "*":
        newArray[i] = *;
      case "/":
        newArray[i] = /*/
