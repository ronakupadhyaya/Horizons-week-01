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
(function(){
function getAnimal() {
  return 'lion'};

window.lion = getAnimal()})();

//console.log("window.lion: ",window.lion)

function getAnimal() {
  return 'tiger';
}

window.tiger = getAnimal();
//
