"use strict";

////////////////////////////////////////////////////////////////////////////////
// IMPLEMENTATION //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

window.scope = {};

// Exercise 1. scope.defineGlobalVariables(obj<object>)
// This function that takes no arguments but instead prints a globally-defined variable
//
// hint. see http://www.w3schools.com/js/js_scope.asp
var artist = "Kanye";
scope.getValueOfThing = function() {
  var returnVal = artist;
  artist = "Jay-Z";
  return returnVal;
};

// Exercise 2. scope.setGlobal(v)
// This function takes an argument, sets it to a global variable 'k', and then  returns the global variable.
//
// hint. "use_strict"
// hint. http://www.w3schools.com/js/js_strict.asp
scope.setGlobal = function(v) {
  // "use strict";
  k = v;
  return k;
};

////////////////////////////////////////////////////////////////////////////////
// TESTS ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

describe("scope.getValueOfThing()", function() {
  it("scope.getValueOfThing() -> 'Kanye'", function() {
    // TODO: What do you expect the return value of scope.getValueOfThing to be when it's called?
    // Replace `null` with what you think it is.
    expect(scope.getValueOfThing()).toBe(null);
  });
  
  it("scope.getValueOfThing() -> 'Jay-Z'", function() {
    // TODO: What do you expect the return value of scope.getValueOfThing to be when it's called the SECOND time around?
    // Replace `null` with what you think it is.
    expect(scope.getValueOfThing()).toBe(null);
  });
  
});

describe("scope.setGlobal(v)", function() {
  it("scope.setGlobal('good') -> 'good'", function() {
    // TODO: What's wrong with this test and/or function? Can you point it out?
    // What happens if you comment out the "use_strict" keyword at the start of this file?
    expect(scope.setGlobal('good')).toBe('good');
  });
});
