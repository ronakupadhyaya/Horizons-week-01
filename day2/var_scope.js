"use strict";

window.scope = {};

// Exercise: Variable Scoping
//
// JavaScript has rules around variable visibility that we call Variable Scoping Rules:
//
//    - if a variable is declared (with the 'var' keyword) outside any
//      functions it's a global variable and can be accessed by any function
//    - if a variable is declared (with the 'var' keyword) inside a function
//      the variable is only accessible inside that function and in other
//      functions inside it.
//    - If two variables share the same name, the most 'local' one is used. So if a
//      global and local variable both have the same name, the local variable is
//      used instead. This is called 'shadowing' and can lead to confusing bugs.
//
// Your task in this exercise is to fill in the places marked 'YOUR CODE HERE' with
// the appropriate values of the variables.

// Exercise NNN. Global variables
// This declares a global variable 'globalArtist' with the value 'Kanye'
var globalArtist = "Kanye";
scope.globalVariables = function() {
  // What's the value of 'globalArtist' here?
  return globalArtist === 'Kanye'; // XXX
};

// Exercise NNN. Changing global variables
// Global variables can be changed by any function, when this happens their
// value changes for everyone.  This makes global variables potentially
// dangerous. You never know when someone else is going to change their value.
//
// This is a function that changes 'globalArtist' to a new value.
scope.changeGlobalArtist = function(artist) {
  globalArtist = artist;
};

scope.changingGlobalVariables = function() {
  changeGlobalArtist('Justin Bieber');
  // What's the value of 'globalArtist' after the other function has changed it?
  return globalArtist === 'Justin Bieber'; // XXX
};

// Exercise NNN. Local variables
// Local variables are variables declared inside functions.
//
// If a local variable shares the same name as a global variable, the local
// variable will be used instead. This can lead to confusing bugs, so you should
// avoid using the same name for both a local and a global variable.
scope.localVariables = function() {
  // Declare a local variable
  var globalArtist;
  // Change the value of the variable
  globalArtist = 'Beyonce';
  // What's its value?
  return globalArtist === 'Beyonce'; // XXX
};

// Changing local variables does not affect the value of global variables.
scope.localVariablesWithGlobalNames = function() {
  // What's the global value of 'globalArtist' now?
  return globalArtist === 'Kanye'; // XXX
};

// Exercise NNN. Creating local variables
// Creating local variables requires the 'var' keyword.
// If you try to assign to a variable without first declaring it wth 'var',
// JavaScript generate an error. This is great for catching errors caused by
// forgetting to declare a variable.
//
// Note: JavaScript does not generate these errors if it's not in strict mode.
// We make sure JavaScript is in strict mode by putting "use strict"; at the
// top of this file.
scope.creatingLocalVariables = function() {
  // There's a keyword missing in the next line
  var localArtist = 'Kevin Hart'; //XXX
  return true;
};

// Exercise NNN. Functions inside functions
// Functions inside functions can access variables from the functions outside
// them.
scope.functionsInsideFunctions = function() {
  var localArtist = 'Kevin Hart';

  function innerFunction() {
    return localArtist === 'Kevin Hart'; // XXX
  }

  return innerFunction();
};

// Exercise NNN. Variables inside functions inside functions
// If you declare a local variable inside an inner function it's not visible in
// the outer function. If two local variables share the same name, the
// innermost local variable is used.
scope.variablesInsideFunctionsInsideFunctions = function() {
  var localArtist = 'Kevin Hart';

  function innerFunction() {
    var localArtist = 'Will Smith';
    // What's 'localArtist' in the inner function?
    return localArtist === 'Will Smith'; // XXX
  }

  // What's 'localArtist' in the other function?
  return localArtist === 'Kevin Hart' && innerFunction();
};
