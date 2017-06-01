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
//
// function getAnimal() {
//   return 'lion';
// }
//
// window.lion = getAnimal();
//
// (function getAnimal() {
//   return 'tiger';
// })()
//
// window.tiger = getAnimal();



(function () {
	 function getAnimal() {
 		return 'lion';
	 }

	  window.lion = getAnimal();

})();


(function() {
	 function getAnimal() {
  		return 'tiger';
	   }

	    window.tiger = getAnimal();
})();

// does this mean that GetAnimal is a function that's redefined later on
// and that's why you needed to invoke it immediately
// why do we need to run the second function immediately
