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
  // test for correct format
  var expArr = expression.split(" ");
  for(var i = 0; i < expArr.length; i++){
    if(expression.indexOf("sqrt") !== -1){
      break;
    }
    if(i % 2 === 0 && isNaN(expArr[i]) ||
       i % 2 === 1 && !isNaN(expArr[i]) ||
       expression.length === 0 ||
       isNaN(expArr[expArr.length-1])){
      throw "Error: The format is incorrect.";
    }
  }


  var value = 0;

  var x = expression.split(' ');
  var midArray = [];
  for (var i = 0; i < x.length; i++) {
    if(x[i] === 'sqrt') {
      x[i] = x[i].replace(x[i], "Math.sqrt(" + x[i+1] + ")");
      console.log(x[i]);
      midArray.push(x[i]);
      var temp = i+1;
    }
    else if(i === temp) {
      continue;
    }
    else {
      midArray.push(x[i]);
    }
  }
  var midArr = midArray.join(" ").split("- ").join("+ -").split(" ").join("").split("+");
  for(var i = 0; i < midArr.length; i++){
    value += eval(midArr[i]);
    if(isNaN(value)){
      console.log("This is the index: " + i);
    }
  }
  return value;
}
  /*var arr = y.join(' ').split("- ").join("+ -").split(" ").join("").split("+");

  for(var i = 0; i < arr.length; i++) {

      value += eval(arr[i]);

    }


  return value;

};

/*arr = arr[i].replace(
  arr[i].substring(arr[i].indexOf('sqrt'), numlength + 5),
  Math.sqrt(arr[i][arr[i].indexOf('sqrt') + 4, arr[i].indexOf('sqrt') + 4 + numlength]));
}*/





      //var altArr = arr.join().split("/").join("*").split("*")
      /*start = arr[i].indexOf('t');
      for(var j = start; j < arr[i].length; j++){
        count++;
        if(isNaN(arr[i][j])){
          break;
        }
      }
      arr[i].replace(arr[i].substring(arr[i].indexOf("s"), arr[i].indexOf("s")+3+count),
                     Math.sqrt(arr[i].substring(arr[i].indexOf("s")+3, arr[i].indexOf("s")+3+count)));*/



  // add and sub
  /*addSubArr = expression.split("- ").join("+ -").split(" ");
  var addVal = Number(addSubArr[0]);
  for(var i = 2; i < addSubArr.length; i+=2){
    addVal += Number(addSubArr[i]);
  }
  finalVal += addVal;

  // mult and div


  return finalVal;*/

  // mult
  /*var postMult = [], i = 0
  while(i < expArr.length-1){
    if(expArr[i] === "*"){
      postMult.push(expArr[i-1] * expArr[i+1]);
      i = i+1;
    }
    if(expArr[i-1] !== "*" && expArr[i+1] !== "*" && expArr[i] === "*"){
      continue;
    }
  }
  if(expArr[expArr.length-2] !== "*"){
    postMult.push(expArr[expArr.length-1]);
  }

  // div
  var postDiv = [];
  for(var i = 0; i < postMult.length-1; i++){
    if(postMult[i] === "/"){
      postDiv.push(postMult[i-1] * postMult[i+1]);
    }
    if(postMult[i-1] !== "/" && postMult[i+1] !== "/" && postMult[i] !== "/"){
      postDiv.push(postMult[i]);
    }
  }
  postDiv.push(postMult[postMult.length-1]);*/
