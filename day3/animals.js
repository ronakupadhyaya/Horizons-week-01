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

//debugger;

function getAnimal() {return 'lion';}

window.lion = getAnimal();

(function(){

  function getAnimal() {return 'tiger';}
  
  window.tiger = getAnimal();

})();

/*

function getAnimal(){return 'lion';}
function getTiger(){return 'tiger';}
window.lion = getAnimal();
window.tiger = getAnimal();

*/
