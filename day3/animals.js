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

var getAnimal = (function(){
  function returnLion(){
    return 'lion';
  }
  return returnLion;
}());

function getAnimal() {

  return 'lion';
};


window.lion = getAnimal();

var getAnimal = (function(){
  function returnTiger(){
    return 'tiger';
  }
  return returnTiger;
}());

function getAnimal() {
  return 'tiger';
}

window.tiger = getAnimal();
}
());
