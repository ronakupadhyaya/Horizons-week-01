// In this exercise you will create your own EventEmitter class
// that will listen for & emit events. These events can be used
// to keep track of actions/changes made by a user.
// EventListener can "broadcast" an event to multiple
// listeners at a time. When a message arrives via
// emit() all callback functions that are registered
// for that event type with on() are called.
//
// Once you correctly implement the EventEmitter object you
// will be able to use the messenger application. Note that if you
// send a message on one device, it will be available on all
// other devices.
//
// You need to give EventEmitter a property called listeners. it will
// be an object where the keys are names for the event, and values
// are arrays containing listener functions ("fn"). These functions will
// run when their corresponding event ("eventName") is emitted.
//
// Example.
// var emitter = new EventEmitter();
//
// function f1() {}
// function f2() {}
//
// emitter.on('someEventName', f1);
// emitter.on('someEventName', f2);
// emitter.on('otherEventName', f2);
// emitter.listeners // -> {someEventName: [f1,f2], otherEventName: [f1]}
function EventEmitter() {
  this.listeners = {};
<<<<<<< HEAD


=======
}
>>>>>>> dnajafi

}
// Takes is a string "eventName" and a callback function "fn"
// Adds a one time listener function for the event named
// eventName. The next time eventName is triggered, this
// listener is removed and then called.
//
// Example.
// var emitter = new EventEmitter();
// function log() { console.log('called'); }
// emitter.once('someEvent', log);
// emitter.emit('someEvent') // -> prints 'called'
// emitter.emit('someEvent') // -> prints nothing
// emitter.emit('someEvent') // -> prints nothing
EventEmitter.prototype.once = function(eventName, fn) {
<<<<<<< HEAD
  var called = false;
  var whatYouget = 0;
  var self = this;

  var something = function (){
    if(! called){
      fn();
      called = true;
    }
    self.removeListener(eventName,something);
  }
  this.on(eventName,something)
=======

  if(!(eventName in this.listeners)) this.listeners[eventName] = [];

  var called = false;
  var prevThis = this;


  function fun(){

    prevThis.removeListener(eventName, fun);

    if(!called) {
      called = true;
      fn.apply(this, arguments);
    }



  };

  fun.listener = fn;
  this.on(eventName, fun);
  return this;




>>>>>>> dnajafi
}
//
//   if(!called){
//     this.listeners[eventName].push(fn)
//     called = true;
//   }
//
//   self.removeListener(eventName,fn);
// }

// function toBeRemoved(){
//
// }
//
//   }
//   this.listeners[eventName].push(function toBeRemoved() {
//     if (! called) { // if f hasn't been called yet
//       fn(); // call f
//       called = true;
//
//       }
//
//     self.removeListener(eventName,);
//   })
// }
//
// Takes is a string "eventName" and a callback function "fn"
// add a listener to the listeners property in EventEmitter
// Adds the listener function to the end of the listeners
// array (in the listeners property) for the event named eventName.
//
// Example.
// var emitter = new EventEmitter();
// function log() { console.log('called'); }
// emitter.on('someEvent', log);
// emitter.emit('someEvent') // -> prints 'called'
// emitter.emit('someEvent') // -> prints 'called'
// emitter.emit('someEvent') // -> prints 'called'
EventEmitter.prototype.on = function(eventName, fn) {
<<<<<<< HEAD
  // this.listeners.eventName.push(fn);
// console.log(this.listeners.hasOwnProperty(eventName));
if (this.listeners.hasOwnProperty(eventName)){
  this.listeners[eventName].push(fn)
} else {
  this.listeners[eventName] = [];
  // console.log(this.listeners.eventName);
  this.listeners[eventName].push(fn);
}
=======
  // YOUR CODE HERE

  if(eventName in this.listeners) {
    this.listeners[eventName].push(fn);

  } else {
    this.listeners[eventName] = [];
    this.listeners[eventName].push(fn);
  }
>>>>>>> dnajafi
}

// Takes is a string "eventName" and a single argument arg
// It calls each of the listeners registered for the event
// named eventName, in the order they were registered, passing
// the supplied arguments to each.
//
// Example.
// var emitter = new EventEmitter();
// function log(arg) {
//  console.log('called', arg);
// }
// emitter.on('someEvent', log);
// emitter.emit('someEvent', 1) // -> prints 'called 1'
// emitter.emit('someEvent', 2) // -> prints 'called 2'
// emitter.emit('someEvent', 'x') // -> prints 'called x'
EventEmitter.prototype.emit = function(eventName, arg) {
<<<<<<< HEAD

    if(this.listeners[eventName].length === 0){
      return;
    }

    this.listeners[eventName].forEach(function(item){
      item(arg);
    })
  }

=======
  // YOUR CODE HERE
  var funcs = this.listeners[eventName];

  _.forEach(funcs, function(fun){
    fun(arg);
  });


}
>>>>>>> dnajafi

// Takes is a string "eventName" and a callback function "fn"
// Removes the specified listener from the listener array
// for the event named eventName.
//
// Example.
// var emitter = new EventEmitter();
// function log(arg) {
//  console.log('called', arg);
// }
// emitter.on('someEvent', log);
// emitter.emit('someEvent', 1) // -> prints 'called 1'
// emitter.removeListener('someEvent', log)
// emitter.emit('someEvent', 1) // -> prints nothing
EventEmitter.prototype.removeListener = function(eventName, fn) {
<<<<<<< HEAD
  var index = this.listeners[eventName].indexOf(fn);
  this.listeners[eventName].splice(index,1);
=======

  var funs = this.listeners[eventName];

  _.forEach(funs, function(item, index){

    if(item === fn){
      funs.splice(index, 1);
    }

  });
>>>>>>> dnajafi
}

// You do not need to look at code past this line, but you may
// if you would like to figure out how your EventEmitter is
// being used to update the message "msg" on all three devices at once.
function Observer(name, myEventEmitter) { // object that keeps track of changes
  this.name = name; this.myEventEmitter = myEventEmitter;
  this.myEventEmitter.on("send", this.onSend.bind(this));
}

// function that adds message to screen
Observer.prototype.onSend = function(m) {
  document.getElementById(this.name).innerHTML += m + `<br/>`;
}

var myEventEmitter = new EventEmitter();
// makes all devices observers
var observers = [
  new Observer('iphone', myEventEmitter),
  new Observer('ipad', myEventEmitter),
  new Observer('mac', myEventEmitter)
];

// function that takes in a string "type" (the type of device used to messege)
// and uses the EventEmitter object "myEventEmitter" to emit the messege "msg"
// to all observers
function submitMsg(type) {
  var msg = document.getElementById(type+"-input").value;
  if (!msg) return;
  myEventEmitter.emit('send', msg);
}
