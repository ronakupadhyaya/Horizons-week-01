"use strict";

// In this exercise we're going to play around with the "this" keyword.
// You should replace the parts that say YOUR CODE HERE.
window.dis = {}

// Let's just create an empty object to attach things to.
dis.object1 = {}
dis.object2 = {}

// This is a function that returns this.
function getThis() {
  return this;
}

// Let's put getThis on dis
dis.getThis = getThis;

dis.simpleGetThis = function() {
  //getThis just returns itself, what is itself? it is window.dis
  return dis.getThis() === window.dis;
};

dis.assignGetThis = function() {
  dis.object2.getThis = getThis;
  return dis.object2.getThis() === dis.object2;
};

dis.callGetThis = function() {
  return dis.getThis.call(dis.object1) === dis.object1;
}

// Let's bind getThis to object2
dis.boundGetThis = dis.getThis.bind(dis.object2);

dis.callBoundGetThis = function() {
  //bind has higher priority than call, so it pulls dis.object2 over object1
  return dis.boundGetThis.call(dis.object1) === dis.object2;
}
