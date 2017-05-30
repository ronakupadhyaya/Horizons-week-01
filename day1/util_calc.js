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
  var newExpression = expression.split(' ');

  if(newExpression.length < 3){

    if(newExpression.length === 1 && Number.isInteger(parseInt(newExpression[0])))  {
      return parseInt(newExpression[0]);
    }
    else if (newExpression.lastIndexOf('sqrt') !== -1){

      var  tmpIndex = newExpression.lastIndexOf('sqrt');
      var insertCalc= Math.sqrt(newExpression[tmpIndex+1]);
      newExpression.splice(tmpIndex, 2, insertCalc);
    }

    else{
      throw error;
    }
  }

  if(!Number.isInteger(parseInt(newExpression[newExpression.length-1])) ){
    throw error;
  }

  console.log(newExpression);
  var sum = parseInt(newExpression[0]);
  for(var i = 0; i<newExpression.length-1; i = i+2){


    console.log(Number.isInteger(parseInt(newExpression[i])));
    console.log(Number.isInteger(parseInt(newExpression[i+1])));

    while(newExpression.lastIndexOf('/') !== -1 || newExpression.lastIndexOf('*') !== -1 || newExpression.lastIndexOf('sqrt') !== -1){
      var run=1;
      if(newExpression[1] !== '+' && newExpression[1] !== '-' && run === 1){
        var division = true;

      }
      else{
        division = false;
      }
      run++;

      if(newExpression.lastIndexOf('sqrt') !== -1){
        index = newExpression.lastIndexOf('sqrt');
        var insertCalc= Math.sqrt(newExpression[index+1]);
        newExpression.splice(index, 2, insertCalc);
      }

      if(newExpression.lastIndexOf('/') !== -1){
        var index = newExpression.lastIndexOf('/');
        if(Number.isInteger(parseFloat(newExpression[index+1])) !== true || Number.isInteger(parseFloat(newExpression[index-1])) !== true){
          throw 'Error';
        }
        if(parseFloat(newExpression[index+1]) === 0){
          if(parseFloat(newExpression[index+3]) === 0){
            return NaN;
          }
          return Infinity;
        }

        var insertCalc= parseFloat(newExpression[index-1]) / parseFloat(newExpression[index+1]);

        newExpression.splice(index-1, 3, insertCalc);
      }

      if(newExpression.lastIndexOf('*') !== -1){
        index = newExpression.lastIndexOf('*');
        var insertCalc= parseFloat(newExpression[index-1]) * parseFloat(newExpression[index+1]);
        newExpression.splice(index-1, 3, insertCalc);
      }
    }
    if(division){
      sum =parseFloat(newExpression[0]);
    }


    if(Number.isInteger(parseInt(newExpression[i])) !== true || Number.isInteger(parseInt(newExpression[i+1])) === true ){
      throw 'Error';
    }


    else{
      if(newExpression[i+1] === '+'){
        sum = parseFloat(sum) + parseFloat(newExpression[i+2]);
      }

      if(newExpression[i+1] === '-'){
        sum = parseFloat(sum) - parseFloat(newExpression[i+2]);
      }
    }

  }
  return sum;

};
