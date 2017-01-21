"use strict";

// In this exercise we're going to play around with exceptions.
window.exception = {};

// Write a function that takes a function and calls it.
// If the given function throws an exception catch that exception
// and return true otherwise return false;
//
// function safeFunction() { }
// function unsafeFunction() {
//  throw 'error';
// }
// ex. exception.safeCall(safeFunction) -> false
// ex. exception.safeCall(unsafeFunction) -> true
exception.safeCall = function(fun) {
<<<<<<< HEAD
  try {
    fun();
  } catch (e) {
    return true;
  }
  return false;
=======

  try{
    fun();
  }catch(e){
    return true;

  }
  return false;

>>>>>>> dnajafi
}


// Write a function that takes two functions fun1 and fun2 and calls them in
// that order.
// fun2 should be called even if fun1 throws an exception.
// This function should not catch any exceptions.
//
// function throws() {
//  throw 'error';
// }
// function logs() {
//  console.log('called');
// }
// ex. exception.callBoth(throws, logs) -> prints 'called' then error
exception.callBoth = function(fun1, fun2) {
<<<<<<< HEAD
  try {
    fun1();
  } catch (e) {
    fun2(); //if fun1 doesn't throw an exception, we would never run the fun2 here!
    throw e;

  } fun2();

=======

  try{
    fun1();
  }catch(e){
    fun2();
    throw e;
  }
  fun2();
>>>>>>> dnajafi
}





// Write a function that takes a function 'fun', calls it and catches the
// exception it throws ONLY IF the exception is a string that starts with a
// lower case 'a'.
//
// function throwA() {
//  throw 'abcde';
// }
// function throwZ() {
//  throw 'z';
// }
// ex. exception.catchOnlyWithA(throwA) -> nothing happens
// ex. exception.catchOnlyWithA(throwZ) -> Error: 'z'
exception.catchOnlyWithA = function(fun) {

<<<<<<< HEAD
  try {
    fun();
  } catch (e) {
    var eString = e.toString();
    if(eString[0] !=='a'){


    throw e;
  }
=======
  try{
    fun();
  }catch(e1){
    var eString = e1.toString();

    if(eString[0] !== 'a') throw e1;
>>>>>>> dnajafi

  }

}
//
// function error(){
//   throw error('')
// }
