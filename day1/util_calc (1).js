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

util.evaluateSquareRoots = function(expression){
  var rootIndex = expression.indexOf('sqrt');
  if(rootIndex == expression.length){
    throw "Error, improper expression";
  }
  var numIndex = rootIndex + 1;
  var num = parseFloat(expression[numIndex]);
  if(isNaN(num)){
    throw "Error, improper expression";
  }
  var reduced = [Math.sqrt(num).toString()];
  if(expression.length === 2){
    expression = reduced;
  }
  else{
    var first = expression.slice(0,rootIndex);
    var second = expression.slice(numIndex+1,expression.length);
    expression = first.concat(reduced);
    expression = expression.concat(second);
  }
  return expression;
};

util.checkExpression = function(expression){
  if(expression === ""){
    throw "Error, empty expression";
  }
  var arr = expression.split(" ");
  while(arr.indexOf('sqrt')!=-1){
    arr = util.evaluateSquareRoots(arr);
  }
  if(isNaN(parseInt(arr[0])) ||isNaN(parseInt(arr[arr.length-1]))){
    throw "Error, operator at the wrong spot";
  }
  var isOperator = isNaN(parseInt(arr[0]));
  for(var i = 1; i<arr.length;i++){
    if (isNaN(parseInt(arr[i]))===isOperator){
      throw "Error, improper expression";
    }
    else{
      isOperator = !isOperator;
    }
  }
  return arr;
};

util.findNextOperator = function(expression){

  var length = expression.length;
  index1 = -1;
  index2 = -1;
  index1 = expression.indexOf("*");
  index2 = expression.indexOf("/");
  if(index1 > 0 && index2 < 0){
    return index1;
  }
  else if (index1 < 0 && index2 > 0){
    return index2;
  }
  else if (index1>0 && index2 > 0){
    if(index1 < index2){
      return index1;
    }
    else{
      return index2;
    }
  }

  index1 = -1;
  index2 = -1;
  index1 = expression.indexOf("+");
  index2 = expression.indexOf("-");
  if(index1 > 0 && index2 < 0){
    return index1;
  }
  else if (index1 < 0 && index2 > 0){
    return index2;
  }
  else if (index1>0 && index2 > 0){
    if(index1 < index2){
      return index1;
    }
    else{
      return index2;
    }
  }
  return -1;
};

util.calculate = function(a,b,operation){
  a = parseFloat(a);
  b = parseFloat(b);
  if(operation === "+"){
    return a + b;
  }
  if(operation === "-"){
    return a - b;
  }
  if(operation === "*"){
    return a * b;
  }
  if(operation === "/"){
    return a / b;
  }
};

util.calc = function(expression) {
  // PART 1
  expression = util.checkExpression(expression);
  // PART 2
  //debugger;
  var nextOperator = util.findNextOperator(expression);
  while(nextOperator!=-1){
    var operator = expression[nextOperator];
    var a = expression[nextOperator - 1];
    var b = expression[nextOperator + 1];
    var reduced = [util.calculate(a,b,operator).toString()];
    if(expression.length === 3){
      expression = reduced;
    }
    else{
      var first = expression.slice(0,nextOperator-1);
      var second = expression.slice(nextOperator+2,expression.length);
      expression = first.concat(reduced);
      expression = expression.concat(second);
    }
    nextOperator = util.findNextOperator(expression);
  }
  return parseFloat(expression[0]);
};
