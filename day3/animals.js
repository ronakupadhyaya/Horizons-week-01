"use strict";
//
// IMPORTANT -- PLEASE READ BEFORE YOU BEGIN
//
// Wrap the following code in IIFEs (immediately-invoked
// function expression) such that window.lion
// equals 'lion' and window.tiger equals
// 'tiger'. Keep in mind that we can
// use IIFEs to create new namespaces.
//
// Do not edit, reorder or delete any of the existing code.
//
/*
getAnimal = (function makeGetAnimal() {
  var counter = 0;
  var animals = ['lion', 'tiger'];
  return function() {
    var currentAnimal = animals[counter];
    counter += 1;
    return currentAnimal;
  }
}());
*/
(function() {
  function getAnimal() {
    return 'lion';
  }

  window.lion = getAnimal();
}())

function getAnimal() {
  return 'tiger';
}

window.tiger = getAnimal();
