"use strict";

// using a closure create a
// function that returns a new
// version of any supplied function
// that keeps track of every set of
// arguments the function is called with
// this new function should return the history of
// the arguments (arrays of arguments)
// ex.
// var newFn = argumentLogger(fn)
// newFn(4,3,9);
// newFn(9);
// newFn();
// console.log(newFn.argumentLog) -> [[4,3,9],[9],[]]
// newFn('',0,null)
// console.log(newFn.argumentLog) -> [[4,3,9],[9],[],['',0,null]]
function argumentLogger(fn) {
  var argumentLog = [];
  return function inner(){
    argumentLog.push(arguments);
    return argumentLog;
  }
}



describe("argumentLogger()", function() {
  it("newFn(4,3,9) should return [[4,3,9]]", function() {
    var newFn = argumentLogger(function() {
      return;
    })
    expect(Array.prototype.slice.call(newFn(4, 3, 9)[0])).toEqual([4, 3, 9]);
  });
  it("newFn(4,5,6); newFn(4,5) -> [[4,5,6],[4,5]]", function() {
    var newFn = argumentLogger(function() {
      return;
    })
    newFn(4, 5, 6);
    var args = newFn(4, 5);
    expect(Array.prototype.slice.call(args[0])).toEqual([4, 5, 6]);
    expect(Array.prototype.slice.call(args[1])).toEqual([4, 5]);
  });
});