"use strict";

window.scope = {};

// XXX

// Exercise NNN. Global variables
// XXX
var globalArtist = "Kanye";
scope.globalVariables = function() {
  return globalArtist === 'Kanye'; // XXX
};

// Exercise NNN. Changing global variables
// Note XXX
scope.changeGlobalArtist = function(artist) {
  globalArtist = artist;
};

scope.changingGlobalVariables = function() {
  changeGlobalArtist('Justin Bieber');
  return globalArtist === 'Justin Bieber'; // XXX
};

// Exercise NNN. Local variables
// XXX
scope.localVariables = function() {
  var globalArtist;
  globalArtist = 'Beyonce';
  return globalArtist === 'Beyonce'; // XXX
};

// XXX
scope.localVariablesWithGlobalNames = function() {
  return globalArtist === 'Kanye'; // XXX
};

// Exercise NNN. Creating local variables
// See "use strict" XXX
// XXX
scope.creatingLocalVariables = function() {
  // There's a keyword missing at the beginning of the next line.
  var localArtist = 'Kevin Hart'; //XXX
  return true;
};

// Exercise NNN. Functions inside functions
// XXX
scope.functionsInsideFunctions = function() {
  var localArtist = 'Kevin Hart';

  function innerFunction() {
    return localArtist === 'Kevin Hart'; // XXX
  }

  return innerFunction();
};

// Exercise NNN. Variables inside functions inside functions
// XXX
scope.variablesInsideFunctionsInsideFunctions = function() {
  var localArtist = 'Kevin Hart';

  function innerFunction() {
    var localArtist = 'Will Smith';
    return localArtist === 'Will Smith'; // XXX
  }

  return localArtist === 'Kevin Hart' && innerFunction();
};
