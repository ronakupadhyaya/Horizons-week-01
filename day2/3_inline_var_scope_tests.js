"use strict";

var functions = [
  "globalVariables",
  "changingGlobalVariables",
  "localVariables",
  "localVariablesWithGlobalNames",
  "uninitializedVariables",
  "creatingLocalVariables",
  "functionsInsideFunctions",
  "variablesInsideFunctionsInsideFunctions"
];


functions.forEach(function(fnName) {
  var fn = scope[fnName];
  describe('Exercise: ' + fnName, function() {
    it('should be true', function() {
      expect(fn()).toBe(true);
    });
  });
});
