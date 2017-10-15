// Question 1
var number = 10;
function increaseNumber() {
  number = number + 10;
}
function decreaseNumber() {
  number = number - 5;
}
increaseNumber();
console.log(number);

// Question 2
function setAddress() {
  var address = "329 12th Street, San Francisco, CA 94103";
}
function printAddress() {
  console.log(address);
}
setAddress();
printAddress();

// Question 3
var number = 10;
function setNumber() {
  var number = 329;
   console.log(number);
}
setNumber();

// Question 1
var number = 10;
function setNumber() {
  var number = 329;
}
setNumber();
console.log(number);
// Question 1
function say() {
    var text="hello";
    function innerFunction(){
      console.log(text);
    }
    innerFunction()
}
say();
// Question 1
function say() {
    function innerFunction(){
      var text="goodbye";
    }
    innerFunction()
    console.log(text);
}
say();
// Question 1
text = "hello";
function say() {
    function innerFunction(){
      var text="goodbye";
    }
    innerFunction()
    console.log(text);
}
say();
// Question 1
var text = "hello";
function say() {
    function innerFunction(){
      var text="goodbye";
    }
    innerFunction()
    console.log(text);
}
say();

var myVar = 10;
function setVar() {
  var myVar = 329;
}
setVar();
console.log(myVar);

var number = 10;
function setVar() {
  number = 329;
}
setVar();
console.log(number);

function funB() {
	console.log(myVar);
}
function funA() {
	var myVar = 2;
	funB();
}

var myVar = 1;
funA();
