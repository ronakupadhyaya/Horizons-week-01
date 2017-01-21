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

// (var tree = function getAnimal() {
//   return 'lion';
//   window.lion = getAnimal();
// })();

// var tree = function getAnimal(){
//   return 'lion';
//   window.lion = getAnimal();
// }
//
// console.log(tree);
window.lion = (function getAnimal(){
  return 'lion';
<<<<<<< HEAD
})();

window.tiger = (function getAnimal(){
  return 'tiger';
})();
// (function getAnimal() {
//   return 'lion';
// })
//
// (function(i){
//   return function(){
//     return i;
//   }
// }(i));
// window.lion = getAnimal();
=======
}
window.lion = getAnimal();
>>>>>>> dnajafi


(function(){

  function getAnimal() {
    return 'tiger';
  }

  window.tiger = getAnimal();
}())
