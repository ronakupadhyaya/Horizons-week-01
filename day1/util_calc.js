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
   var exp = expression.split(' ');
   var ctrnone = 0;
   var ctrnum = 0;
   var ctrsqrt = 0;
       for(var i = 0; i < exp.length; i++) {
           if (exp[0] == [""]) {
               throw "error";
           }
           if (exp[i] == "sqrt") {
               ctrsqrt ++;
           }
           else if (isNaN(parseInt(exp[i]))) {
               ctrnone ++;
           }
           else if (parseInt(exp[i]) != NaN) {
               ctrnum ++;
           }
           if (ctrsqrt > 0) {
           }
           else if (i%2 == 0 && isNaN(parseInt(exp[i]))) {
               throw "error";
           }
       }

       if (!(ctrnone + 1 == ctrnum)) {
           throw "error";
       }

  while(exp.indexOf("sqrt") > -1 || exp.indexOf("*") > -1 || exp.indexOf("/") > -1|| exp.indexOf("+") > -1 || exp.indexOf("-") > -1) {
      var mult = exp.indexOf("*")
      var div = exp.indexOf("/")
      var add = exp.indexOf("+")
      var sub = exp.indexOf("-")
      var sqr = exp.indexOf("sqrt")
      var newValue;
      var op;
      if (sqr > -1) {
          newValue = Math.sqrt(exp[sqr+1]);
          exp.splice(sqr, 2, newValue.toString());
      }
      else if (mult > -1 || div > -1) {
          if(mult > -1) {
              newValue = exp[mult-1] * exp[mult+1];
              op = mult;
          }
          if (div > -1) {
              newValue = exp[div-1] / exp[div+1];
              op = div;
          }
          exp.splice(op-1,3,newValue.toString());
      }
      else if (sub > -1 || add > -1) {
          if (add > -1) {
              newValue = parseFloat(exp[add-1]) + parseFloat(exp[add+1]);
              op = add;
          }
          if (sub > -1) {
              newValue = parseFloat(exp[sub-1]) - parseFloat(exp[sub+1]);
              op = sub;
          }
          exp.splice(op-1,3,newValue.toString());
      };
  };
  return parseFloat(exp.pop());

};
