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

(function (){
  function getAnimal() { // part 1
    return 'lion';
  }
  window.lion = getAnimal(); // part 1
}());
function getAnimal() { // part 2
  return 'tiger';
}
window.tiger = getAnimal(); // part 2
