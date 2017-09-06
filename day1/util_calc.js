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
function findMultipleOrDivision(array){
    var specialArr = [];
    array.forEach(function(currentValue, index, arr){
      if(currentValue === '/' || currentValue ==='*'){
        specialArr.push(index);
      }
    })
    return specialArr;
  }


util.calc = function(expression) {
  // YOUR CODE HERE
    debugger;
  var operators = {
      '+': function(a, b) { return a + b },
      '-': function(a, b) { return a - b },
      '*': function(a, b) { return a * b},
      '/': function(a, b){return a / b},
      'sqrt': function(a){ return Math.sqrt(a)}
  };
  var initArray = expression.split(' ');

  if(initArray[0] === ''){
    throw("Error, empty expression");
  }
  if(initArray.length ===1){
    if(isNaN(parseFloat(initArray[0]))){
      throw("Error, no numbers");
    }
  }
  if(initArray.length > 1){
    if(initArray.indexOf('+') === -1 && initArray.indexOf('-') === -1 && initArray.indexOf('*') === -1 && initArray.indexOf('/') === -1 && initArray.indexOf('sqrt') === -1){
      throw("Error, missing operator");
    }
    if(initArray[0] !== 'sqrt'){
      if(isNaN(parseFloat(initArray[0])) || isNaN(parseFloat(initArray[initArray.length-1]))){
        throw("Error, operator at the wrong spot");
      }
    }

    for(var i =0; i < initArray.length; i++){
      if(initArray[i] !== 'sqrt' && initArray[i+1] !=='sqrt'){
        if(isNaN(parseFloat(initArray[i])) && isNaN(parseFloat(initArray[i+1]))){
          throw("Error, too many operators");
        }
        if(!isNaN(parseFloat(initArray[i])) && !isNaN(parseFloat(initArray[i+1]))){
          throw("Error, too many numbers");
        }
      }

    }
  }




  if(initArray.length === 1 && !isNaN(parseFloat(initArray[0])) ){

    return parseFloat(initArray[0]);
  }



  if(initArray.indexOf('sqrt') > -1){
    var sqrt = initArray.indexOf('sqrt');
    var specialVal = operators['sqrt'](initArray[sqrt+1]);
    initArray.splice(sqrt, 2, specialVal);
  }
  if(initArray.indexOf('*') > -1 || initArray.indexOf('/') > -1){

    var specialArr = findMultipleOrDivision(initArray);

    for(var j = 0; j < specialArr.length; j++){
      var specialVal = operators[initArray[specialArr[j]]](initArray[specialArr[j]-1],initArray[specialArr[j]+1]);
      if(isNaN(specialVal)){
        return NaN;
      }
      initArray.splice(specialArr[j]-1, 3, specialVal);

      specialArr = specialArr.map(function(value){
        return value -2;
      });
    }
    var initVal = parseFloat(initArray[0]);
    for(var i =0; i < initArray.length; i++){
      if(isNaN(parseFloat(initArray[i]))){
        initVal = operators[initArray[i]](initVal, parseFloat(initArray[i+1]));
        i++;
      }
    }
  }else{
    var initVal = parseFloat(initArray[0]);
    for(var i =0; i < initArray.length; i++){
      if(isNaN(parseFloat(initArray[i]))){

        initVal = operators[initArray[i]](initVal, parseFloat(initArray[i+1]));
        i++;
      }
    }
  }

  return initVal;
};
