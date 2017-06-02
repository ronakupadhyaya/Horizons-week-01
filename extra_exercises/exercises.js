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
//what variables are "closed over"
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



