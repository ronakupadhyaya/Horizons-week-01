"use strict";

// Write a function that counts down from the given
// number of seconds, prints time left one second at a time,
// and when countdown reaches zero prints 'Liftoff!'.
//
// When you're done your output should look like this:
// https://cl.ly/2g3o0s0W223U
//
// Use the provided log() function to display output!
function countDown(seconds) {
  // Example usage for log()
  // feel free to delete the next line:
  var b = setInterval(function() {
    log(seconds);
    seconds--;

    if (seconds <= 0){
      clearInterval(b);
      log('liftoff');
      return;
    }


  }, 1000);
}

// Call countDown(10) to test our code:
countDown(10);

// You don't need to change code below this line.
function log(msg) {
  $('#body').append($('<h2>').text(msg));
}
