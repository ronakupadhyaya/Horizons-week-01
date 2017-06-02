"use strict"

window.freecode = {}

freecode.testFun = function() {
  console.log("we in business, baby");
}

// prototypes
// padder, addPadder
// argumentLogger (log all args ever passed)

// [ 1, 2, 3 ].pad() ----> [ 'a', 1, 2, 3, 'a' ]
// [1,2,3].echo() --> log  [1,2,3]

freecode.addPadder = function(paditem) {
    // special
  Array.prototype.pad = function() {
    this.push(paditem);
    this.unshift(paditem);
    return this
  }
}


// this
// default
// implicit
// default

freecode.logThis = function () {
  var arrayArgs = Array.prototype.slice.call(arguments)
  console.log(this, arg);
}



// memoize
