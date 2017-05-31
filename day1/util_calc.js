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
  // YOUR CODE HERE
  newexp = expression.split(" ")
  allnum = [];
  boolnan = [];

  for (var i = 0; i < newexp.length; i ++){
    allnum.push(parseInt(newexp[i]))
    boolnan.push(isNaN(newexp[i]))
  }
  for(var i = 0; i < newexp.length; i+=2){
    if(isNaN(parseInt(newexp[i])) == true){
      throw "operator at the wrong spot"
    }
  }
  if(isNaN(parseInt(newexp[newexp.length-1])) == true ){
    throw "too many operators"
  }

for ( var i = 0; i < newexp.length; i++){
  if (boolnan[i] == boolnan[i+1]){
    throw "too many"
  }
}

if (newexp.length == 1 ){
  return parseInt(newexp[0]);
}

  function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
    }
    return indexes;
  }

  var operandlocations = getAllIndexes(boolnan, true);

total = 0;
for (var i = 0; i < operandlocations.length; i++){


  if (newexp[operandlocations[i]] == '*'){
    newexp[operandlocations[i]-1] = (parseFloat(newexp[operandlocations[i]-1]) * parseFloat(newexp[operandlocations[i]+1]))
    newexp.splice((operandlocations[i]),2)
    i=i-1
  }
  else if (newexp[operandlocations[i]] == '/'){
  newexp[operandlocations[i]-1] = (parseFloat(newexp[operandlocations[i]-1]) / parseFloat(newexp[operandlocations[i]+1]))
  newexp.splice((operandlocations[i]),2)
  i=i-1
  }
}
var val = parseFloat(newexp[0])
console.log(val)
for (var i = 0; i < operandlocations.length; i++){
  if (newexp[operandlocations[i]] == '+'){
  val = newexp[operandlocations[i]] + parseFloat(newexp[operandlocations[i]+1])
    console.log(val)
    newexp[operandlocations[i]-1] = (parseFloat(newexp[operandlocations[i]-1]) + parseFloat(newexp[operandlocations[i]+1]))
newexp.splice((operandlocations[i]-1),3, tallied)

  }
  else if (newexp[operandlocations[i]] == '-'){
    tallied = (parseInt(newexp[operandlocations[i]-1]) - parseInt(newexp[operandlocations[i]+1]))
    total = total + tallied;
    newexp.splice((operandlocations[i]-1),3, tallied)
  }
}
return total;





};
