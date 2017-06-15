// Wed 6/14 notes

function func1() {
  console.log("hello")
}

function func2() {
  return "hello"
}

func1() --> logs "hello"
func2() --> prints "hello"

function func3() {
  console.log("Welcome to day3")
}

*********

//wrap functions in parens and put a pair at the end
//==> will run function immediately

(function func4() {
  console.log("trust the process")
})()
// ==> will log it right away
// can't reuse that function

*********

p = 11 //note: no "var"
window.p // -> 11
this.p // -> 11

var x;
console.log(x); // -> undefined
console.log(y); // -> ReferenceError

function myFunc() {
  var x = 7;
  var y = 9;
  return x;
}
console.log(x); // ReferenceError

*******************************************

// Calling a function after it's defined is safe
var myFunc = function() {
  return 'ttp'
}
myFunc()

// -----------

// not safe because it is a variable
myFunc2()
var myFunc2 = function() {
  return 21
}

// safe because it's defined as a function
myFunc3()
function myFunc3() {
  return "Sam"
}

********************************************
// scope

function fun1() {
  var otherVar = 7; // not global
    function fun2() {
      var anotherVar = 2; // not global
        console.log(firstVar);
    }

  fun2();
}

fun1()
var firstVar = 1;
// will log undefined because it knows firstVar
// exists, but doesn't know the specific value

var firstVar = 1;
fun1()
// will log

// * you can reuse local names as global names *

// VARIABLES HERE WONT BE CAPTURED WHEN OUTER
// IS INVOKED
function outer(/* */) {
  // ALL VARIABLES HERE WILL BE CAPTURED
  // SINCE THEY ARE CLOSED OVER BY
  // THE CLOSURE OUTER-INNER
  return function inner() {
    // VARIABLES HERE WONT BE CAPTURED WHEN OUTER
    // IS INVOKED
  }
  // ???
}

var myVar = 9; // not captured
function outer() {
  var myVar1 = 5; // ALL VARIABLES HERE WILL BE CAPTURED
  var myVar2 = 15;// SINCE THEY ARE CLOSED OVER
  console.log("inside outer")
  return function inner() {
    myVar1 = myVar1 + 1; // not captured
    console.log("inside inner")
    console.log(myVar3)
  }
}

var innerFunc = outer() // will log "inside outer"
innerFunc() // will log "inside inner" and 6
// note: innerFunc accessed to variables inside outer
outer()() //==> calls inner()


var newFunc = outer()
// ==> will initialize myVar1 back to 5

*******************

function runCounter(func) {
  var runCount = 0;
  return function inner() {
    runCount = runCount + 1;
    func.apply(null, arguments);
    return runCount;
  }
}

var square = function (x) {
  return x * x
}


var countedSquare = runCounter(square)
countedSquare(x) // runs printer, sets runCount to 1

**********************

function runCounter(func/* will be captured */) {
  var runCount = 0; // will be captured
  return function inner() {
    runCount = runCount + 1;
    func();
    return runCount;
  }
}

function square(x) { return x * x;}
function cube(x) { return x * x * x;}
var countedSquareFunction = runCounter(square);
var countedCubeFunction = runCounter(cube

*************************
// this keyword

var firstName = 'Moose';
var lastName = 'Paksoy';
var rickyProfile5 = {
  firstName: 'Ricky',
  lastName: 'Sharma',
  getFullName: function() {
    return firstName + lastName;
    //accesses VARIABLES, not keys
    //should use this.firstName
  }
};
rickyProfile5.getFullName()

// implicit binding, refers to object when function
// is called on object

/*--------------------------*/

function func() {
    console.log(this.myVar);
}
var myVar = 1;

func(); // prints 1 because this defaults to window
        // if there it is not called on an object

//default binding

/*------------------------------*/

function myFunc() {
    console.log( this.prop );
}

var prop = 10

var obj1 = {
    prop: 2,
    myFunc: myFunc // sets myFunc as method
};

obj1.myFunc(); ==> 2
// implicit binding because myFunc is called on obj1
myFunc(); ==> 10
// default binding bc this refers to window

/*---------------------------------*/

function myFunc() {
    console.log( this.prop );
}

var obj1 = {
    prop: 2,
    myFunc: myFunc
};

var obj2 = {
    prop: 1,
    obj1: obj1
};

obj2.obj1.myFunc(); ==> 2
// myFunc() is called on obj1

/*-----------------------------------*/

// explicit binding...
function greet(greeting, punctuation) {
  var prefix = greeting || 'Hi';
  var endMark = punctuation || '!';
  var firstWord = prefix + endMark;
  var text = firstWord + ' ' + this.name + ' you are a great ' + this.occupation + '.';
  return text;
}

var abhi = { name: 'Abhi', occupation: 'Model' };
var darwish = { name: 'Darwish', occupation: 'Ninja' };

console.log(greet.call(abhi, 'Hello', '.'));
console.log(greet.call(darwish, 'Hey', ','));
// arguments are separated by commas

console.log(greet.apply(abhi, ['Hello', '.']));
console.log(greet.apply(darwish, ['Hey', ',']));
// arguments are in an array

***************************************

functionFactory() notes

var functionFactory = function(num1, num2) {
  var functionArray = [];
  for (var i = num1; i <= num2; i++) {
    functionArray.push(function() {
      return i
    }
  }

  return functionArray
}

typeof functionFactory(0, 2)
