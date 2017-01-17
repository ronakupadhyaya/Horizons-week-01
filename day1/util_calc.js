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


// Part 2. Implement support for addition and subtraction.
//
// ex. util.calc('1') -> 1
// ex. util.calc('-12') -> -12
// ex. util.calc('3 + 2') -> 5
// ex. util.calc('3 + 8 + 2 + 1    ') -> 14
// ex. util.calc('2 - 1 + 5 + 6') -> 12
// ex. util.calc('-1 + 3 - 2 + 5') -> 5




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
  if(expression.length===0) throw "empty expression"
  expression = expression.split(" ");
  var operators = ['+','-','*','/'];
  for(var j=0; j<operators.length;j++){
    if(expression.indexOf(operators[j])===0) throw "Error, operator at the wrong spot"
    if(operators[j]===(expression[expression.length-1])) throw "Error, operator at the wrong spot"
}

  debugger;
  for(var i=0; i< expression.length; i++){
    //  var checkIfExist = operators.indexOf(expression[i])===-1;
    //  if((checkIfExist&&(i<expression.length-1)&&(operators.indexOf(expression[i+1])===-1)) throw "Error, No operator"
    //  if((operators.indexOf(expression[i])>0)&&(i<expression.length-1)&&(operators.indexOf(expression[i+1])>0)) throw "Error, To many operator"
     var isNum = isNaN(expression[i]);
     console.log(isNum);
     if ((i%2===1)&&(!isNum)) throw "Error Doesnt matter";
     if ((i%2===0)&&(isNum)) throw "Error Doesnt matter";

  }

  for(var k=0; k< expression.length; k++){
    var indexMult = expression.indexOf('*');
    if(indexMult>=0){
      var value = parseFloat(expression[indexMult-1]) * parseFloat(expression[indexMult+1]);
      expression[indexMult]= value;
      expression.splice(indexMult-1, indexMult);
      expression.splice(indexMult, indexMult);
      continue;
    }
    var indexdiv = expression.indexOf('/');
    if(indexdiv>=0){
      var value = parseFloat(expression[indexdiv-1]) / parseFloat(expression[indexdiv+1]);
      expression[indexdiv]= value;
      expression.splice(indexdiv-1,indexdiv);
      expression.splice(indexdiv,indexdiv);
      continue;
    }
    var indexadd = expression.indexOf('+');
    if(indexadd>=0){
      var value = parseFloat(expression[indexadd-1]) + parseFloat(expression[indexadd+1]);
      expression[indexadd]= value;
      expression.splice(indexadd-1,indexadd);
      expression.splice(indexadd,indexadd);
      continue;
    }
    var indexsub = expression.indexOf('-');
    if(indexsub>=0){
      var value = parseFloat(expression[indexsub-1]) - parseFloat(expression[indexsub+1]);
      expression[indexsub]= value;
      expression.slice(indexsub-1,indexsub);
      expression.slice(indexsub,indexsub);
      continue;
    }
  }
  return expression[0];
};
