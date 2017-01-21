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

util.calc = function(expression) {
  // YOUR CODE HERE

  var arr = expression.split(' ');
  for (var z = 0; z < arr.length; z++){
    if(arr[z] === 'sqrt'){
      arr[z+1] = Math.sqrt(parseFloat(arr[z+1]));
      arr.splice(z,1);
    }

  }

  if (expression.length === 0){
    throw 'error';
  }

  for (var i = 0; i <arr.length; i+=2){
    if(arr[i]=== '+' || arr[i]=== '-' || arr[i]=== '/' || arr[i]=== '*') {
      //console.log(i, arr[i]);
      throw 'error';
    } else {
      arr[i] = parseFloat(arr[i]);
    }
  }

  for (var j = 1; j < arr.length; j+=2){
    if( arr[j]!== '+' && arr[j]!== '-' && arr[j]!== '/' && arr[j]!== '*'  ) {
      //console.log(j, arr[j]);
      throw 'error';
    }
  }

  if(typeof arr[arr.length-1]  !== 'number') {
    throw 'error';
  }

  console.log(arr);
  var m =1;

  while(arr.length>1 && m <arr.length){
    var flag1 = false;
    if(arr[m] === '*'){
      arr[m+1]= arr[m-1] * arr[m+1];
      arr.splice(m-1,2);
      flag1 = true;
    }else if(arr[m] === '/'){
      arr[m+1]= arr[m-1] / arr[m+1];
      arr.splice(m-1,2);
      flag1 = true;
    }
    if(flag1 === false)
      m+=2;
  }

  var k =1;
  var flag = false;
  while(arr.length>1){
    if(arr[k] === '+'){
      arr[k+1]= arr[k-1] + arr[k+1];
      arr.splice(k-1,2);
      flag = true;
    }else if(arr[k] === '-'){
      arr[k+1]= arr[k-1] - arr[k+1];
      arr.splice(k-1,2);
      flag = true;
    }
    if(flag === false)
      k+=2;
  }


  return arr[0];
};

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
<<<<<<< HEAD
util.calc = function(expression) {
  var newString = expression.split(" ");
  var arrayOp= ["+","-", "/", "*"];
  var opcounter = 0;
  var numcounter = 0

  for(var j = 0; j < newString.length; j++){
    if(arrayOp.includes(newString[j])){
      opcounter += 1;
    } else {
      numcounter += 1;
    }
  }

console.log(opcounter);
console.log(numcounter);
if (numcounter > 1 && opcounter == 0){
  throw "error, missing operator"
}

  if(opcounter >= numcounter){
    throw "error: too many operators!"
  }

  if(numcounter - 1 > opcounter){
    throw "error: too many numbers!"
  } else if (numcounter - 1 < opcounter)
    throw "error! Not enough numbers"

  if (expression === ""){
    throw "error: empty expression!"
  }

  for(var i = 0; i < newString.length; i += 2){
      if(arrayOp.includes(newString[i])){
        throw "error: operator in the wrong spot!"
      }
  }

  return eval(expression);
}


//   var arrayOp= ["+","-", "/", "*"];
//  var newString = expression.split(" ");
//  console.log(newString);
//  for(var i = 0; i < newString.length; i += 2){
//    if (arrayOp.includes(newString[i]){
//      throw "error";
//    }
// }
// };
=======
>>>>>>> dnajafi
