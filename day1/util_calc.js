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
util.validate = function(expression) {
  if (expression.length == 0) {
    throw "Empty expression";
  }

  if (expression[0] != "sqrt" &&
    (isNaN(parseFloat(expression[0])) ||
    isNaN(parseFloat(expression[expression.length - 1])))){
    throw "Error no number at beginning";
  }

  var operator = false;
  var number = false;
  var root = false;

  for (var i = 0; i < expression.length; i++) {
    if (expression[i] == "+" || expression[i] == "-" ||
    expression[i] == "*" || expression[i] == "/") {
      if (operator) {
        throw "Operator in wrong place";
      } else {
        operator = true;
        number = false;
        root = false;
      }
    } else if (expression[i] == "sqrt") {
      if (root) {
        throw "root in wrong place";
      } else {
        root = true;
        operator = false;
        number = false;
      }
    } else {
      if (number) {
        throw "Number in wrong place";
      } else {
        operator = false;
        number = true;
        root = false;
      }
    }
  }
}

// Part 2. Implement support for addition and subtraction.
//
// ex. util.calc('1') -> 1
// ex. util.calc('-12') -> -12
// ex. util.calc('3 + 2') -> 5
// ex. util.calc('3 + 8 + 2 + 1    ') -> 14
// ex. util.calc('2 - 1 + 5 + 6') -> 12
// ex. util.calc('-1 + 3 - 2 + 5') -> 5

util.performBinaryOp = function(expression,operands){
  //takes array of numbers and operators

  //look to perform addition first
  if(expression.length==1){
    return expression;
  }
  while(true){//} && opIndex!=-1){
    //console.log("wefiwejf");
    var operand, opIndex;
    if (operands == "plusminus") {
      var firstIndex = expression.indexOf("+");
      var secondIndex = expression.indexOf("-");
      if(firstIndex==-1 && secondIndex==-1){
        break;
      } else if(firstIndex==-1){
        operand = "-";
        opIndex = secondIndex;
      } else if(secondIndex==-1){
        operand = "+";
        opIndex = firstIndex;
      } else if(firstIndex<secondIndex){
        operand = "+";
        opIndex = firstIndex;
      }else{
        operand = "-";
        opIndex = secondIndex;
      }
      //var operandId = Math.min(firstIndex,secondIndex);

    } else {
      var firstIndex = expression.indexOf("*");
      var secondIndex = expression.indexOf("/");
      if(firstIndex==-1 && secondIndex==-1){
        break;
      } else if(firstIndex==-1){
        operand = "/";
        opIndex = secondIndex;
      } else if(secondIndex==-1){
        operand = "*";
        opIndex = firstIndex;
      } else if(firstIndex<secondIndex){
        operand = "*";
        opIndex = firstIndex;
      }else{
        operand = "/";
        opIndex = secondIndex;
      }
    }

    if(opIndex!=-1){
      var firstNum = parseFloat(expression[opIndex-1]);
      var secondNum = parseFloat(expression[opIndex+1]);
      if(operand=="+"){
        var newValue = firstNum + secondNum;
      }else if(operand=="-"){
        var newValue = firstNum - secondNum;
      }else if(operand=="*"){
        var newValue = firstNum * secondNum;
      } else if(operand=="/"){
        var newValue = firstNum / secondNum;
      }

      //remove original numbers and change the operand index to hold the new value
      //expression[opIndex-1] =" ";
      //expression[opIndex+1] = " ";
      //expression[opIndex] = newValue;
      var newArr = [];
      newArr = newArr.concat(expression.slice(0,opIndex-1));
      //console.log(newArr);
      newArr.push(newValue);
      //console.log(newArr);
      //console.log(expression.slice(opIndex+2));
      newArr = newArr.concat(expression.slice(opIndex+2));
      expression = newArr;
    } else{
      break;
    }
  }

  return expression;
}

util.squareroot = function(expression){
  while(true){
    var idx = expression.indexOf("sqrt");
    if(idx!=-1){
      var newValue = Math.sqrt(expression[idx + 1]);
      var newArr = [];
      newArr = newArr.concat(expression.slice(0,idx-1));
      newArr.push(newValue);
      newArr = newArr.concat(expression.slice(idx+1));
      expression = newArr;
    } else {
      break;
    }
  }
  return expression;
}

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
  var arr = expression.split(" ");
  util.validate(arr);
  arr = util.squareroot(arr);
  arr = util.performBinaryOp(arr,"multdiv");
  arr = util.performBinaryOp(arr,"plusminus");


  return parseFloat(arr[0]);
  //assuming valid expression

};
