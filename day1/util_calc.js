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

util.findMulDiv = function(array){
  for(var i = 0; i < array.length; i++){
    if(array[i] === '*' || array[i] === '/'){
      return [i,array[i]];
    }
  }
  return null;
}

util.checkerrors=function(num,op){
  if(num.length>op.length+1)
    throw "Error too many numbers";
  else if(op.length>=num.length)
    throw "Error too many operators";

}

util.checkop=function(x){
  if(x==='*' || x==='-' || x==='+' || x==='/')
    return false;
  return true;
}

util.calc = function(expression) {
  // YOUR CODE HERE

  //handle empty expression
  if(expression==='')
    throw "Error, empty expression";
  var num=[];
  var op=[];

  //parse expression into num and ops
  while(true){
    if(expression.indexOf(' ')===-1){
      num.push(parseInt(expression));
      break;
    }
    var number=expression.substr(0,expression.indexOf(' '));
    if(number.indexOf('s')!==-1){
      number=expression.substr(5,expression.indexOf(' '));
      n=Math.sqrt(parseInt(number));
      num.push(n);
      expression=expression.substr(expression.indexOf(' ')+1);
    }else num.push(parseInt(number));
    expression=expression.substr(expression.indexOf(' ')+1);
  //  if(util.checkop(expression[0])) throw "Error missing operator";
    op.push(expression[0]);
    expression=expression.substr(expression.indexOf(' ')+1);
  }

  //util.checkerrors(num,op);

  //check couple errors
  if(num.length===1 ){
    if(op.length===0){
      return num[0];
    }else return op[0]+num[0];
  }

  //loop until you have handled all of the multiplication and divisions

  while(true){
    var index=util.findMulDiv(op);
    if(index===null) break;
    var k=index[0];
    if(index[1]==='*'){
      num.splice(k,2,num[k]*num[k+1]);
    }else if(index[1]==='/'){
      num.splice(k,2,num[k]/num[k+1]);
    }
    op.splice(k,1);
  }

  //addition and subtraction
  var result=num[0];
  num.splice(0,1);
  while(op.length!==0){
    if(op[0]==='+'){
      result=result+num[0];
    }else if(op[0]==='-'){
      result=result-num[0];
    }
    num.splice(0,1);
    op.splice(0,1);
  }

  return result;
}
