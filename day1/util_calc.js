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
  

  //check to see if expression is empty
  if (expression.length == 0) { throw 'Error, empty expression';};

 

  //ensure proper format.
  var partsBefore = expression.split(" ");


  //take care of square roots
  var parts = util.evaluateSqrts(partsBefore);
  console.log("Post Eval: " + parts);
  //onsole.log(parts2);
  console.log(parts);
  //parts = parts2;

  if (parts.length%2 == 0) {
    throw "Error, too many operands/operators";
  }
  for (var i = 0; i < parts.length; i++) {
    //console.log("Begin Loop i=" + i);
    
    if (i%2 == 0) {//even index -> numbers
      var currentElement = parseFloat(parts[i]);
      //console.log("Num: " + currentElement);
      if (isNaN(currentElement)) { 
        // console.log("Error thrown for: " + parts[i]);
        throw "Error, missing number";
      }

    } else {//odd index -> operator
      //console.log("Op: " + parts[i]);
      if ("*/+-".indexOf(parts[i]) == -1) { 
        // console.log("Error thrown for: " + parts[i]);
        throw "Error, missing operator"
      }
    }
  }
  //console.log("Result: " + util.calcHelper(expression));
  return util.calcHelper(util.arrayToString(parts));
};

util.calcHelper = function(arg) {
  console.log("Begin calcHelper: " + arg );
  //console.log("arg split: " + arg.split(" "));
  var parts = arg.split(" ");
  //Base case
  if (parts.length == 1) {
    return parseFloat(arg);
  }

  //Do One Operation
  if (parts.length == 3) {
    return util.calcHelper(util.doOperation(parts));
  }

  //Do Many Operations
  //Check for multiplication or division'
  // console.log("many operations part");
  var multdiv = parts.indexOf("*");
  var multdiv2 = parts.indexOf("/");
  if (multdiv == -1) {
    multdiv = parts.indexOf("/");
  } else if (multdiv2 != -1 && multdiv2 < multdiv) {
    multdiv = multdiv2;
  }
  if (multdiv != -1) {//there is mult/div to do
    // console.log("Start multdiv");
    // console.log(parts);
    var toDo = [];
    toDo.push(parts[multdiv - 1]);
    toDo.push((parts[multdiv]));
    toDo.push(parts[multdiv + 1]);
    parts[multdiv] = util.doOperation(toDo);
    parts[multdiv - 1] = "";
    parts[multdiv + 1] = "";
    // console.log("After: " + util.arrayToString(parts));
    return util.calcHelper(util.arrayToString(parts));
  } else {
    //there is no mult/div to do, so just go from left to right. 
    // console.log(parts);
    var toDo = [];
    toDo.push(parts[0]);
    toDo.push((parts[1]));
    toDo.push(parts[2]);
    parts[1] = util.doOperation(toDo);
    parts[0] = "";
    parts[2] = "";
    // console.log("After: " + util.arrayToString(parts));
    return util.calcHelper(util.arrayToString(parts));
  }
}


util.doOperation = function(parts) {
  var operand = parts[1];
    var result = 0;
    switch(operand) {
      case "+":
        result = parseFloat(parts[0])+parseFloat(parts[2]);
        break;
      case "-":
        result = parseFloat(parts[0])-parseFloat(parts[2]);
        break;
      case "*":
        result = parseFloat(parts[0])*parseFloat(parts[2]);
        break;
      case "/":
        result = parseFloat(parts[0])/parseFloat(parts[2]);
        break;
      default:
        console.log("Whelp something broke: " + parts);
        break;
    }

    return String(result);
}

util.arrayToString = function(parts) {
  var toReturn = "" + parts[0];
  for (var i = 1; i < parts.length; i++) {
    if (parts[i] != "") {
      toReturn += " " + parts[i];
    }
    
  }
  return toReturn.trim();
}

util.evaluateSqrts = function (parts) {
  console.log("Begin Evaluating Roots: " + parts);
  var index = parts.indexOf("sqrt");
  while (index != -1) {
    console.log("Evaluate Square Root @index: " + index);
    parts[index] = Math.sqrt(parseInt(parts[index + 1]));
    parts[index + 1] = "";
    index = parts.indexOf("sqrt");
    console.log("Post Eval: " + parts);
  }
  var toReturn = util.removeBlanks(parts);
  console.log(toReturn);
  return toReturn;
}

util.removeBlanks = function(parts) {
  var toReturn = [];
  console.log("Remove Blanks: " + parts);
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] != "") {
      toReturn.push(parts[i]);
    }
  }
  console.log("blanks removed: " + toReturn);
  return toReturn;
}



