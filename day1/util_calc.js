"use strict";
  //what does that do?
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

// ex. util.calc('3 + 8 + 2 + 1    ') -> 14

if (expression===""){
  throw "Error, empty expression";
}

var splat = [];
splat = expression.split(" ");

for(var i=0; i<splat.length; i++) {
  if (splat[i] === "sqrt") {
    splat[i+1] = "" + Math.sqrt(splat[i+1]);
    splat.splice(i,1);
    i--;
  }
}
console.log(splat);

var total = 0;
var operations = ['+','-','*','/'];

var numNums=0;
var numOps=0;
for (var i = 0; i<splat.length; i++) {
  if (!(isNaN(splat[i]))) {
    numNums++;
    splat[i] = parseFloat(splat[i]);
    if (!(isNaN(splat[i+1]))) {
      throw "Error, too many numbers";
    }
  }
  else if (operations.includes(splat[i])) {
    numOps++;
    if (operations.includes(splat[i+1])) {
      throw "Error, too many operators";
    }
  }
}
if (numNums===0){
  throw "Error, no numbers";
}
if (numOps>=numNums){
  throw "Error, too many operators";
}


for (var i = 0; i < splat.length; i++) {
  if (splat[i] === '*' || splat[i] === '/') {
    if (splat[i] === '*') {
      splat[i-1] = splat[i-1] * splat[i+1];
      splat.splice(i,2);
      i -= 2;
    }
    else if (splat[i] === '/') {
      splat[i-1] = splat[i-1] / splat[i+1];
      splat.splice(i,2);
      i -= 2;
    }
  }
  console.log(splat);
}

for (var i = 0; i < splat.length; i++) {
  if (splat[i] === '+') {
    splat[i-1] = splat[i-1] + splat[i+1];
    splat.splice(i,2);
    i -= 2;
  }
  else if (splat[i] === '-') {
    splat[i-1] = splat[i-1] - splat[i+1];
    splat.splice(i,2);
    i -= 2;
  }
  console.log(splat);
}

if (splat.length === 1) {
  return splat[0];
}

// var splat=[];
//   //stores numbers

//   for(var i=0; i<expression.length; i++){



    // if(typeof parseInt(expression[i]) === "number" && typeof parseInt(expression[i]) !== NaN){
    //   splat.push(expression[i]);
      
      // var numPush=[];
      // var count=i;

          // while(typeof parseInt(expression[count])==="number"&&count<expression.length && 
          //     typeof parseInt(expression[i])!==NaN){
          //   numPush.push(expression[count]);
          //   count++;
          //   debugger;

          // }
          // splat.push(parseInt(numPush.join()));
   // }
  // })
};
