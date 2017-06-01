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

(function() {function getAnimal() {
  return 'lion';
}

window.lion = getAnimal();
})(); //we close off this part as its own separate function
//so that its own running would not affect the second function
//then, we can run the second function in a way that the two
//getAnimals in the same scope.

(function(){function getAnimal() {
  return 'tiger';
}

window.tiger = getAnimal();
})();
