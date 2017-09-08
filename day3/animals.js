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

//IIFE's are useful bc they are functions
//Sometimes I want to use code multiple times,
//But sometimes I want to use functions to use own variables
//and IIFE's are faster way to do it

(function() {
function getAnimal() {
  return 'lion';
};

window.lion = getAnimal();
})();


function getAnimal() {
  return 'tiger';
};

window.tiger = getAnimal();
