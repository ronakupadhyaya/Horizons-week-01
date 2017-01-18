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

function getAnimal() {
  return 'lion';
}

window.lion = getAnimal();

function getAnimal() {
  return 'tiger';
}

window.tiger = getAnimal();

// (function () {
//      // your code here
// })();

//vs

// var foo = (function () {
//      // your code here
// });
// foo();
