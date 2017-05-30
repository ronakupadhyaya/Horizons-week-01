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
util.isNumberTF = function(expression){
  expression2 = expression.split(' ')
  var y=false

  for (var i=0;i<expression2.length;i++){
    var index=expression2[i].length-1;
    var index2=expression2[i][index];

      if (index2=='0'){
      y=true;
    }
    if (index2=='1'){
      y=true;
    }
    if (index2=='2'){
      y=true;
    }
    if (index2=='3'){
      y=true;
    }
    if (index2=='4'){
      y=true;
    }
    if (index2=='5'){
      y=true;
    }
    if (index2=='6'){
      y=true;
    }
    if (index2=='7'){
      y=true;
    }
    if (index2=='8'){
      y=true;
    }
    if (index2=='9'){
      y=true;
    }
  }
  return y;
}
util.isNumber = function(expression){
  expression2 = expression.split(' ')
  var y=0

  for (var i=0;i<expression2.length;i++){
    var index=expression2[i].length-1;
    var index2=expression2[i][index];

      if (index2=='0'){
      y+=1;
    }
    if (index2=='1'){
        y+=1;
    }
    if (index2=='2'){
        y+=1;
    }
    if (index2=='3'){
        y+=1;
    }
    if (index2=='4'){
        y+=1;
    }
    if (index2=='5'){
        y+=1;
    }
    if (index2=='6'){
        y+=1;
    }
    if (index2=='7'){
        y+=1;
    }
    if (index2=='8'){
        y+=1;
    }
    if (index2=='9'){
        y+=1;
    }
  }
  return y
}

util.isOperator=function(expression){
  expression2 = expression.split(' ')
  var x=0
  for (var i=0;i<expression2.length;i++){
    var index=expression2[i].length-1;
    var index2=expression2[i][index];
    if (index2=='+'){
      x+=1;
    }
    else if (index2=='-'){
      x+=1;
    }
    else if (index2=='/'){
      x+=1;
    }
    else if (index2=='*'){
      x+=1;
    }
  }
  return x
}

util.isPlus=function(expression){
  expression2 = expression.split(' ')
  for (var i=0;i<expression2.length;i++){
    var index=expression2[i].length-1;
    var index2=expression2[i][index];
    if (index2=='+'){
      return '+'
    }
}
}




util.calc = function(expression) {
  var operators='+-/*'
  // var x = 0
  var y=0
  var z =0
  if (expression===''){
    throw 'Error, empty expression'
  }
  if (util.isOperator(expression)===expression.length){
    throw 'Error mission operator'
  }

    if (!util.isNumberTF(expression)){
      throw 'Error no number'
    }

      if (expression[0]=='+'){
        throw 'Error operator wrong spot'
      }
      // else if (expression[0]=='-'){
      //   throw 'Error operator wrong spot'
      // }
      else if (expression[0]=='/'){
        throw 'Error operator wrong spot'
      }
      else if (expression[0]=='*'){
        throw 'Error operator wrong spot'
      }



    for (var i=0;i<expression.length;i++){

      if (util.isNumber(expression)!==(util.isOperator(expression)+1)){
        throw 'Error too many numbers/operators'
    }
  }


    // for (var i=0;i<expression.length;i++){
    //
    //   var b=expression[i];
    //   if (util.isNumberTF(b)){
    //     expression[i] = (parseInt(b));
    //   }
    // }
    // console.log(expression);
    //
    return eval(expression)

  };
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
