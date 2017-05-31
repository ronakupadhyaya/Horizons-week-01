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
  //Throw exception if the expression is empty
  if (expression.length === 0)
    throw "The expression is empty";
  var expArr = expression.split(" ");
  //console.log(expArr);
  //console.log(expArr[0]);
  //console.log(parseInt(expArr[0]));
  //console.log(isNaN(parseInt(expArr[0])));

  //Throw exception if first/last elts are not numbers
  if (isNaN(parseInt(expArr[0])))
    throw "The first element is not a number";

  if (isNaN(parseInt(expArr[expArr.length-1])))
    throw "The last element is not a number";

  //Separate numbers and operators
  var numberCount = [];
  var operatorCount = [];
  for (var i = 0; i < expArr.length; i++) {
    if(isNaN(parseFloat(expArr[i])))
      operatorCount.push(expArr[i]);
    if(!isNaN(parseFloat(expArr[i])))
      //console.log(parseFloat(expArr[i]));
      numberCount.push(parseFloat(expArr[i]));
  }

  //# of numbers should always be # of operators + 1
  if (operatorCount.length !== numberCount.length - 1)
    throw "Ratio of operators to numbers is not correct";

  //console.log(numberCount);
  //console.log(typeof operatorCount[0]);

  //Return first number if expression is only one elt long
  if (numberCount.length === 1)
    return numberCount[0];

  // Multiplication and division
  // numberCount = [1,3,2,5]
  // operatorCounter = ['+', '/', '-']
  /*
  var numberCount2 = [];
  var operatorCount2 = [];
  for (var i = 0; i < operatorCount.length; i++) {

    if(i === 0 && (operatorCount[i] === "+" || operatorCount[i] === '-')) {
      numberCount2.push(numberCount[i]);
      operatorCount2.push(operatorCount[i]);
    }
    if (operatorCount[i] === "*") {
      console.log(numberCount[i]);
      console.log(numberCount[i+1]);
      numberCount2.push(numberCount[i] * numberCount[i+1])
      console.log(numberCount2);
    }
    if (operatorCount[i] === "/")
      numberCount2.push(numberCount[i] / numberCount[i+1])

    if (i === operatorCount.length-1 && (operatorCount[i] === "+" || operatorCount[i] === '-')) {
      numberCount2.push(numberCount[i+1]);
      operatorCount2.push(operatorCount[i]);
    }
  }

  console.log(numberCount2);
  console.log(operatorCount2);
*/

//multiplication and division
  //var index = operatorCount.indexOf("*");



/*
  //Addition and subtraction
  var num = numberCount[0];
  for (var i = 0; i < numberCount.length; i++) {
    if (operatorCount[i-1] === "+")
      num += numberCount[i];
    if (operatorCount[i-1] === "-")
      num -= numberCount[i];
  }
  */

/*
  for (var i = 0; i < numberCount.length; i++) {
    if (operatorCount[i] === "+")
      num += numberCount[i];
    if (operatorCount[i] === "-")
      num -= numberCount[i];
    //if (operatorCount[i-1] === "*")
      //num *= numberCount[i];
    //if (operatorCount[i-1] === "/")
      //num /= numberCount[i];
    console.log(num);
  }
*/

//combining the two arrays -->
  var allNums = [];
  for (var i = 0; i < numberCount.length; i++){
    allNums.push(numberCount[i]);
    if (operatorCount[i] !== undefined)
      allNums.push(operatorCount[i]);
  }
  //console.log(allNums);


  //find first instance of mult or division
  while (allNums.indexOf("*") !== -1 && allNums.indexOf("/") !== -1) {
    var index = allNums.indexOf("*");
    if (allNums.indexOf("*") < allNums.indexOf("/")) {
      allNums.splice(index-1, 3, allNums[index-1] * allNums[index+1]);
    } else {
      allNums.splice(index-1, 3, allNums[index-1] / allNums[index+1]);
    }
  }

  while (allNums.indexOf("*") !== -1 ) {
    var index = allNums.indexOf("*");
    //console.log(allNums[index-1]*allNums[index+1]);
    allNums.splice(index-1, 3, allNums[index-1] * allNums[index+1]);
  }

  while (allNums.indexOf("/") !== -1) {
    var index = allNums.indexOf("/");
    //console.log(allNums[index-1]*allNums[index+1]);
    allNums.splice(index-1, 3, allNums[index-1] / allNums[index+1]);
  }

  while (allNums.indexOf("+") !== -1 && allNums.indexOf("-") !== -1) {
    var index = allNums.indexOf("+");
    if (allNums.indexOf("+") < allNums.indexOf("-")) {
      allNums.splice(index-1, 3, allNums[index-1] + allNums[index+1]);
    } else {
      allNums.splice(index-1, 3, allNums[index-1]-allNums[index+1]);
    }
  }

  while (allNums.indexOf("+") !== -1) {
    var index = allNums.indexOf("+");
    allNums.splice(index-1, 3, allNums[index-1] + allNums[index+1]);
  }

  while (allNums.indexOf("-") !== -1) {
    var index = allNums.indexOf("-");
    allNums.splice(index-1, 3, allNums[index-1]-allNums[index+1]);
  }

  //console.log(allNums);

  return allNums[0];

};
