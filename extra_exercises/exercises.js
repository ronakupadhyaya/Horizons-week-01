/*
Complete all of the functions that say 'WRITE CODE HERE'.
Wherever you see a '?', replace the '?' with your answer.
Sections are divided by topic.
I know it's easy to just run this code in the browser BUT 
make sure that you finish the problems in your head
BEFORE you check your answer. Otherwise you won't learn as 
much and you're here to learn!!!

Also - TOTALLY FINE IF YOU DON'T KNOW ALL ANSWERS. 
But, if you do, it's awesome!!!


*/



//==================================================
//=================CLOSURES=========================
//==================================================
var getCounter = function() {
  var count = 0;
  return function(){
    count = count + 1;
    return count
  }
}
//typeof getCounter --> ?
var counter = getCounter()
//typeof counter --> ?
//typeof getCounter() --> ?

var first = counter()
var second = counter()
var third = counter()

//first --> ?
//second --> ?
//third --> ?

var count = getCounter()()
//count --> ?

/***************************************/

var getUserMaker(name){
  return function(){
    return {
      "name": name,
      "email": name + '@gmail.com'
    }
  }
}

var niharMaker = getUserMaker('nihar')
//typeof niharMaker --> ?
//typeof niharMaker()
//what variables are "closed over" ?
var nihar = niharMaker()
//typeof nihar --> ?
//nihar.age --> ?
//typeof nihar.age --> ?
//nihar.name --> ?

var chloeMaker = getUserMaker('chloe')
var chloe = chloeMaker()
//typeof chloe --> ?
//chloe.email --> ?



//==================================================
//=================ARRAY STUFF======================
//==================================================


//Compute the sum of arr using normal iteration (using for(var i = 0 ....))
var sum1 = function(arr){
  var sum = 0;
  //write code here
}
//sum1(arr) --> ?

//compute the sum of arr using the builtin forEach function
var sum2 = function(arr){
  var sum = 0;
  //write code here
}
//sum2(arr) --> ?


/***************************************/


function getMax(arr){
  //WRITE CODE HERE
  //Use a forEach or standard for-loop to find the
  //maximum element in the array given as a parameter

  //Note that -Infinity represents the absolute 
  //smallest possible number in JavaScript
}
//getMax([-1,4,882,7]) --> ?


/***************************************/


function dank(arr) {
  //WRITE CODE HERE
  //Change the value of each element in arr to be "dank"
}
//dank(['hi',1,3,{}]) --> ?

/***************************************/


var change = function(arr, val){
  var returnArray = []
  //WRITE CODE HERE

  //Write a function "change" that takes an array (arr) 
  //and replaces every element in the array with val 
  //(the second parameter) using forEach
}


//==================================================
//======================OBJECTS=====================
//==================================================
var obj1 = {
  num: 7,
  fun: function(){
    console.log(this.num)
  }
}
var x1 = obj.fun
//typeof x1 --> ?
var y1 = obj.fun()
//typeof y1 --> ? 

/***************************************/

var obj2 = {
  num: 7,
  fun: function(){
    return this.num
  }
}
var x2 = obj2.fun
//typeof x2 --> ?
var y2 = obj2.fun()
//typeof y2 --> ?

/***************************************/


var obj3 = {
  num: 7,
  fun: function(){
    var innerFunction = function(){
      return this.num
    }
    return innerFunction
  }
}
var x3 = obj3.fun
//typeof x3 --> ?
var y3 = obj3.fun()
//typeof y3 --> ?
var z3 = y3()
//typeof z3 --> ?

//Why can we access this.num even though we are using 'this' in
//a function that is within another function 'fun' ?

/***************************************/


var obj4 = {
  num: 7,
  fun: function(){
    var thisObject = this
    var prop = {
      inner: function(){
        //WRITE CODE HERE
        //I want you to console.log the value of obj1.num
      }
    }
    return prop
  }
}
//obj1.fun().inner() --> ?


/***************************************/


var simpleObj = {
  name: 'nihar',
  email: 'nihar@gmail.com',
  address: 'ya right, like ill put my address here'
}
//simpleObj.name --> ?
//simpleObj["name"] --> ?
var email = "name"
//simpleObj.email --> ?
//simpleObj["email"] -->?
//simpleObj[email]-->?



//==================================================
//============CONSTRUCTORS AND OBJECTS==============
//==================================================

var Person = function(){
  this.firstname = 'Chip'
  this.lastname = 'Skylark'
}

//typeof Person --> ?
//typeof Person() --> ?

var p1 = new Person()
//p1.firstname --> ?

p1.firstname = 'nihar'
//p1.firstname --> ?

var p2 = new Person()
//p2.firstname --> ?

p2 = p1
//p2.firstname --> ?



var complexPerson = function(){
  this.firstname = 'Chip'
  this.lastname = 'Skylark'
  this.getFullName = function(){
    var fullName = this.firstname + ' ' + this.lastname
    return fullName
  }
}

var cPerson = new complexPerson()

//typeof cPerson --> ?
//typeof complexPerson --> ?
//typeof cPerson.getFullName --> ?
//typeof cPerson.getFullName() --> ?
//cPerson.getFullName() --> ?


var evenMoreComplexPerson = function(first, last){
  this.firstname = first
  this.lastname = last
  this.getFullName = function(){
    var fullName = this.firstname + ' ' + this.lastname
    return fullName
  }
}

var superCPerson = new evenMoreComplexPerson('chloe', 'moon')
//superCPerson.firstname --> ?
//superCPerson.getFullName() --> ?


//==================================================
//================BUT DO YOU GET IT THO=============
//==================================================


var enc = {
  firstFun: function fun(){
    this.num = 7
    var internalObj = {
      prop1: {
        secondFun: function(){
          //I need you to console.log the value of
          //the key 'num' on enc here.

          //Feel free to add variables anywhere you'd 
          //like but you cannot add new key-value
          //pairs in any object
        }
      }
    }
    this.internalObj = internalObj
    return this
  }
}

/***************************************/

var arr = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]

function logEm(direction, array){
  /*
  WRITE CODE HERE

  Given a string (direction), which is either 'FORWARD'
  or 'BACKWARD', log the elements of an array that looks
  like arr to the console in ascending or descending 
  order respectively.
  */
}

/***************************************/

var arr2 = [[1,2,3,4],[8,7,6,5],[9,10,11,12],[16,15,14,13]]

function logEm2(array){
  /*
  WRITE CODE HERE

  Given an that looks like arr2, log the elements of
  arr2 to the console in ascending order without 
  ever mutating the contents of arr2 (basically,
  you can't use array.reverse). I'm testing your
  for-loop skillz here
    */
}


/***************************************/

Array.prototype.forEach = function(f){
  /*
  WRITE CODE HERE

  re-write the forEach function so that items
  and indices are passed to f in descending
  order AND forEach will terminate if f
  returns true
  */
}

/***************************************/


function findDuplicates(arr){
  /*
  WRITE CODE HERE

  Given an array arr, return a new array that 
  has all duplicate values from arr removed.
  For example:
    findDuplicates([1,1,'a','a','a',4]) => [1,'a',4]
  */
}

/***************************************/


/*
 * PROBLEM BORROWED FROM CIS197 @ UPENN 
 *
 * For our final exercise, we're going to write a handy function that turns an input value into a
 * string. Specifically, this function will take a 'plain object' - one that has no function
 * properties - and turns it into a string like the one you'd see if you used console.log().
 *
 * There is a built-in way to do this in JavaScript; namely, JSON.stringify. However, we're going
 * to use a slightly different set of rules for our function, so you can't just call this method - sorry!
 *
 * Specifically, you should follow these rules to stringify your object:
 *
 * 1. NUMBERS and BOOLEANS are turned into strings directly (e.g. 2.5 -> 2.5, true -> true).
 * 2. STRINGS, as values, should have _single_ quotes around them. Don't worry about escaping
 *    characters like \n, \r, ', et cetera.
 * 3. An ARRAY should be stringified as a left square bracket ('['), followed by its stringified values separated
 *    by commas, followed by a right square bracket (']'). There should be a space following every comma, and there
 *    should be no comma following the final value.
 * 4. An OBJECT should be stringified as a left curly brace ('{'), followed by each of its key value pairs, followed
 *    by a right curly brace ('}'). A key-value pair should be stringified as the key (with no surrounding quotes),
 *    then a colon and a space, and then the stringified value. As with arrays, the key-value pairs should be
 *    separated by commas; there should be a space following every comma, and there
 *    should be no comma following the final value.
 * 5. NULL should be stringified as null, and UNDEFINED should be stringified as undefined (no quotes around either).
 * 6. If you ever encounter a function (as the original input value, as an array element, or as an object property),
 *    then you should throw a new Error('Illegal argument').
 *
 * HINT 1: Your function should work for ANY plain JavaScript object you pass it, including base types like
 * numbers/strings. This points towards a pretty slick recursive implementation...
 * HINT 2: Use Object.keys to get the keys of an object to iterate through.
 * HINT 3: You can use `typeof` to get the type of an object (as a string). Read the docs online
 * at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof.
 * HINT 4: typeof doesn't work for Arrays (it just gives you 'object'). Use Array.isArray to differentiate them.
 *
 * ==========================================================================
 */

function stringify(object){
  //WRITE CODE HERE
  //Feel free to make and use helper functions in this section of the exercises
}

//YAY! THIS IS THE END OF THE FILE! 



