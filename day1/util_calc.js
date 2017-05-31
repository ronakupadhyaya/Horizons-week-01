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

//23+
//[1, 2 +], [23, 4 3]

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
/*
util.calc = function(expression) {
// YOUR CODE HERE
if (expression === "") {
throw new Error('Empty expression');
}
var tokens = expression.split(' ');

var i = 0;
var product = num();
var tot = 0;

function next() {
return tokens[i++];
}

function num() {
var cur = next();
if (cur === 'sqrt') {
return Math.sqrt(num());
}

if (! isNumber(cur)) {
throw new Error('Expected number, got ' + cur);
}
return + cur;
}

function op() {
var cur = next();
if (['-', '+', '/', '*', 'sqrt'].indexOf(cur) < 0) {
throw new Error('Expected operator, got ' + cur);
}
return cur;
}

while (i < tokens.length) {
var oper = op();
if (oper === '+') {
tot += product;
product = num();
} else if (oper === '-') {
tot += product;
product = -num();
} else if (oper === '*') {
product *= num();
} else if (oper === '/') {
product /= num();
}
}

return tot + product;
};

function isNumber(n) {
return ! isNaN(n);
};
*/

util.calc = function(expression) {
  // YOUR CODE HERE


  if (expression === '') {
    throw "Error: Empty expression";
  }

  var expressionArr = [];
  expressionArr = expression.split(" ");
  var sqrt = "sqrt";
  var operators = ["+", "-", "*", "/", "sqrt"];


  var operatorCnt = 0;
  for (var i = 0; i < expressionArr.length; i++) {
    for (var j = 0; j < operators.length-1; j++) {
      if (expressionArr[i] === operators[j]) {
        operatorCnt ++;
      }
    }
  }
  if ( operatorCnt + 1 !== expressionArr.length-operatorCnt ) {
    throw "Error: operators and numbers mismatch";
  } else if (expressionArr.length === 1) {
    return parseInt(expressionArr.toString());
  }


  if (expressionArr[expressionArr.length-1] === "+" ||
  expressionArr[expressionArr.length-1] === "-" ||
  expressionArr[expressionArr.length-1] === "*" ||
  expressionArr[expressionArr.length-1] === "/") {
    throw "Error: wrong spot";
  }
  if (expressionArr[0] === "+" ||
  expressionArr[0] === "-" ||
  expressionArr[0] === "*" ||
  expressionArr[0] === "/") {
    throw "Error: wrong spot";
  }

  // PART2
  // ex. util.calc('1') -> 1
  // ex. util.calc('-12') -> -12
  // ex. util.calc('3 + 2') -> 5
  // ex. util.calc('3 + 8 + 2 + 1    ') -> 14
  // ex. util.calc('2 - 1 + 5 + 6') -> 12
  // ex. util.calc('-1 + 3 - 2 + 5') -> 5


  var num = [];

  var numbers = [];
  for (var i = 0; i < expressionArr.length; i++) {
    if (operators.indexOf(expressionArr[i]) === -1){
      numbers.push(expressionArr[i]);
    }
  }




  function operation (num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    var result;
    switch(operator) {
      case "+":
      result = num1 + num2;
      break;

      case "-":
      result = num1 - num2;
      break;

      case "*":

      result = num1 * num2;
      break;

      case "/":
      result = num1 / num2;
      // var rounded = Math.round ( result * 10)/10;
      // var fixed = rounded.toFixed(1);
      // result = fixed;
      break;

      default:
      result = num1;

    } return result;
  }

  var res = 0;
  console.log("------------------------------------");
  console.log("before m/d op: ", expressionArr);

  for (var i = 0; i < expressionArr.length-2; i+=2) {
    while (expressionArr[i+1] === "*" || expressionArr[i+1] === "/") {
      res = operation(expressionArr[i], expressionArr[i+2], expressionArr[i+1]);
      expressionArr.splice(i, 3, res);
      console.log("Exp array: ", expressionArr);
    }
    res = operation(expressionArr[i], expressionArr[i+2], expressionArr[i+1]);
    expressionArr.splice(i, 3, res);
  }

  // for (var i = 0; i < expressionArr.length-2; i+=2) {
  //   res = operation(expressionArr[i], expressionArr[i+2], expressionArr[i+1]);
  //   expressionArr.splice(i, 3, res);
  // }

  return res;


  // while (expressionArr.indexOf('*') > -1 || expressionArr.indexOf('/') > -1) {
  //   expressionArr.splice(expressionArr.indexOf('*')-1, 3,
  //   parseFloat(expressionArr[expressionArr.indexOf('*')-1]) *
  //   parseFloat(expressionArr[expressionArr.indexOf('*')+1]));
  //
  //   expressionArr.splice(expressionArr.indexOf('/')-1, 3,
  //   (parseInt(expressionArr[expressionArr.indexOf('/')-1]) /
  //   parseInt(expressionArr[expressionArr.indexOf('/')+1])).toFixed(1));
  // }
  // console.log("After m/d op: " + expressionArr);
  //
  // while (expressionArr.indexOf('+') > -1 || expressionArr.indexOf('-') > -1) {
  //   console.log(expressionArr.indexOf('+'));
  //   console.log(expressionArr.indexOf('-'));
  //   expressionArr.splice(expressionArr.indexOf('+')-1, 3,
  //   parseFloat(expressionArr[expressionArr.indexOf('+')-1]) +
  //   parseFloat(expressionArr[expressionArr.indexOf('+')+1]));
  //
  //   expressionArr.splice(expressionArr.indexOf('-')-1, 3,
  //   parseFloat(expressionArr[expressionArr.indexOf('-')-1]) -
  //   parseFloat(expressionArr[expressionArr.indexOf('-')+1]));
  // }
  //
  // console.log("After +/- op: " + expressionArr);
  // return parseFloat(expressionArr);

  // var res2 = 0;
  // for (var i = 0; i < expressionArr.length-2; i+=2) {
  //   res2 = operation(expressionArr[i], expressionArr[i+2], expressionArr[i+1]);
  //   expressionArr.splice(i, 3, res2);
  // }
  // console.log("After +/- op: " + expressionArr);
  // return res2;

/*
  var res = 0;
  // var priority = [];
  var flag1 = true;
  console.log("------------------------------------");
  console.log("before m/d op: " + expressionArr);
  for (var i = 0; i < expressionArr.length-2; i+=2) {
    if (flag1) {
      if (expressionArr[i+1] === "*" || expressionArr[i+1] === "/") {
        // priority.push(i+1);
        res = operation(expressionArr[i], expressionArr[i+2], expressionArr[i+1]);
        expressionArr.splice(i, 3, res);
        // expressionArr[i] = res;
        // expressionArr[i+2] = res;
        flag1 = false;
      }
    }
    if (!flag1) {
      res = operation(expressionArr[i], expressionArr[i+2], expressionArr[i+1]);
      expressionArr.splice(i, 3, res);
    }

  }

  console.log("After m/d op: " + expressionArr);
  // for (var i = 0; i < expressionArr.length-2; i+=2) {
  // for (var j = priority.length; j >= 0; j--) {
  //   if (priority[j]-2 === priority[j-1]) {
  //     // console.log("YAY equals");
  //     expressionArr[priority[j]-1] = expressionArr[priority[j]+1];
  //   }
  // }
  // console.log("priority update " + expressionArr);
  // }
  // console.log("priority: " + priority);
  var res2 = 0;
  var flag = true;
  for (var i = 0; i < expressionArr.length-2; i+=2) {
    // if (priority.indexOf(i+1) === -1) {
      // console.log(expressionArr[i] + " " + expressionArr[i+2] + " " + expressionArr[i+1]);
      if (flag) {
        res2 = operation(expressionArr[i], expressionArr[i+2], expressionArr[i+1]);
        expressionArr.splice(i, 3, res2);

        flag = false;
      }
      if (!flag){
        res2 = operation(expressionArr[i], expressionArr[i+2], expressionArr[i+1]);
        expressionArr.splice(i, 3, res2);
      }


      // expressionArr[i+2] = res2;
      // console.log("res2: " + res2);
    // }
  }


  console.log("After +/- op: " + expressionArr);

  return res2;
*/
  // var res2 = 0;
  // for (var i = 0; i < expressionArr.length-2; i+=2) {
  //   if (expressionArr[i+1] === "+" || expressionArr[i+1] === "-") {
  //     res2 = operation(expressionArr[i], expressionArr[i+2], expressionArr[i+1]);
  //     expressionArr[i+2] = res2;
  //   }
  // }
  // console.log("res: " + finalresult);
  // return res2;

};



//   for (var i = 0; i < operators.length; i++) {
//     for (var j = 0; j < expressionArr.length; j++) {
//       // if ()
//     }
//   }
//   console.log(numbers);
// };
