// _.once(fn)--> should return a function that can only be run once
// after(6,fn) --> should return a function that will start to run after the 6th
// call(on the 7th call )
//throttle(fn,ms)--->should return a function that can only be run every ms
//milliseconds

//once
//1. once is a function that returns a new function
//2. once takes one argument which is a function
//3. the returned function should only be able to run once
// if you do once(someFunction) it will return just the definition
//of the inner function
  // once(fn) === once(fn) ---> is false, b/c these are different references
  // apply is the
var once = function(fn) {
  var called= false // going to keep track of if we ran the function
  var returnedValue; //stores the value to return after the first call

  return function (){ //the function name is optional
    called= !called //update called
    returnedValue=fn.apply(null,arguments) // call the function and store value
    return returnedValue
  }
  return returnedValue; //return stored value w/o running fn
}

var square = function(x){
  return x * x;
}

var onceSquared = once(square)
//onceSquared
  function(){
    square.apply(null,arguments);
    called=!called
  }
}

//onceSquared(6) puts 6 in the function of square, b/c onceSquared takes
//1 argument

//after
//1. after is a function that returns a new function
//2. after takes two arguments, first is a number and second is a function
//3. the returned function should only be able to run after num times
  // where num is the number passed as the first argument

var after= function(num,fn){
  var counter = 0
  return function(){
    counter = counter+1
    if(counter>num){
    return fn.apply(null,arguments);
    }
  }
}

//throttle
//1. throttle is a function that returns a new function
//2. after takes two arguments, first is a function and second is a number
  // representing ms 1000 milliseconds=1 second
//3. the returned function should only be allowed to run
  // once per milliseconds

  var throttle= function(fn,ms){
    var startTime = 0
    return function(){
      var currentTime=new Date().getTime()
      if(currentTime-startTime>ms){
      startTime= currentTime;
      return fn.apply(null,arguments);
      }
    }
  }
