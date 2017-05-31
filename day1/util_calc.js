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
// Errors
  var splitString = expression.split(" ");
  var operators = ['*', '/', '+', '-'];
  if (expression ===""){
    throw "Error, empty expression";
  } else if (splitString[0] == "+"
  || splitString[0]=="-"
  || splitString[0]=="*"
  || splitString[0] =="/"
  || splitString[splitString.length-1] == "+"
  || splitString[splitString.length-1]== "-"
  || splitString[splitString.length-1] == "*"
  || splitString[splitString.length-1] =="/") {
    throw "Error, operator at wrong spot";
  }

  var operatorCount = 0;

  for (var i=0; i<splitString.length; i++) {
    for (var j=0; j<operators.length; j++) {
      if (splitString[i] === operators[j]) {
        operatorCount += 1;
      }
    }
  }

  var numberCount = splitString.length - operatorCount;

  if (operatorCount == 0 && splitString.length !==1) {
    throw "Error, no operator";
  }

if (operatorCount !== numberCount -1) {
  throw "Error, too many operators"
}



  //for (var i=1; i<splitString.length-1; i+=2) {
  //  if (splitString[i] !== "+"
  //  ||splitString[i] !== "-"
  //  ||splitString[i] !=="*"
  //  ||splitString[i] !== "/") {
  //    throw "Error, too many numbers";
  //  }
  //}


// create array of only numbers
  var numbers = [];
  for (var i=0; i<splitString.length; i++) {
    numbers[i] = parseFloat(splitString[i]);
  }



/*
  for (var i=0; i<splitString.length; i++) {
    if(splitString[i] === "*") {
    total *= numbers[i+1];
    }
    else if(splitString[i] === "/") {
      total /= numbers[i+1];
    }
    else if (splitString[i] === "+") {
      total += numbers[i+1];
    }
    else if (splitString[i] === "-") {
      total -= numbers[i+1];
    }

  }
  return total;
*/

if (splitString.length === 1) {
  var total = numbers[0];
}

while (splitString.length>1) {

  for (var i=0; i<splitString.length; i++) {
    if (splitString[i]==="/") {
      var product = numbers[i-1]/numbers[i+1];
      splitString.splice(i-1,3, product);
      numbers.splice(i-1, 3, product);
    }
  }

  for (var i=0; i<splitString.length; i++) {
    if (splitString[i] === "*") {
      var product = numbers[i-1]*numbers[i+1];
      splitString.splice(i-1, 3, product)
      numbers.splice(i-1, 3, product);
    }
  }


  for (var i=0; i<splitString.length; i++) {
    if (splitString[i] === "-") {
      var total = parseFloat(numbers[i-1]) - parseFloat(numbers[i+1]);
      splitString.splice(i-1, 3, total);
      numbers.splice(i-1, 3, total);
    }
  }
  console.log(total);
  console.log(splitString);
  console.log(numbers);

  for (var i=0; i<splitString.length; i++) {
    if (splitString[i] === "+") {
      var total = numbers[i-1] + numbers[i+1];
      splitString.splice(i-1, 3, total);
      numbers.splice(i-1, 3, total);
    }
  }
  console.log(total);
  console.log(splitString);
  console.log(numbers);
}
  return numbers[0];// YOUR CODE HERE

};
