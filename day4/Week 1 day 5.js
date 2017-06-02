//Binding refresher
//June 2, 2017

var obj = {
  name: "Ay",
  printThis: function () {
    console.log(this.name);
  }
}

var newPrintThis = obj.printThis.bind(obj);
//make sure this. is always referring to the obj


function Person(name) {
  this.name = name;
  this.printThis = function() {
    console.log(this.name);
  }.bind(this);
}


function getArgs() {
  var array = Array.prototype.slice.call(arguments);
  return array;
}


function sum() {
  return Array.prototype.slice.call(arguments).reduce(function(a,b) {
    return a+b;
  })
}
sum(1,2,3,4);    // ->10
partial(sum, 1, 2)(2, 3);    // -> sum(1, 2, 2, 3)
partial(sum, 1, 2)    // -> sum.bind(null, 1, 2)
function partial() {
  var fn = arguments[0];
  arguments[0] = null;
  return fn.bind.apply(fn, arguments);
}

//Friday lecture

typeof null // -> "object"
