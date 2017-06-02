// In this exercise you will create your own EventEmitter class
// that will listen for & emit events. These events can be used
// to keep track of actions/changes made by a user.
// EventListener can "broadcast" an event to multiple
// listeners at a time. When a message arrives via
// emit() all callback functions that are registered
// for that event type with on() are called.
//
// !HINT! We recommend implementing the EventEmitter constructor, .on() and
// .emit() together !HINT!
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
// The EventEmitter should contain an object called "listeners"
// (under this.listeners). This object maps event types to arrays.
// Each array contains functions that should be called when an event
// of that type is sent via this.emit().
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
}

// Takes a string "eventName" and a callback function "fn"
// adds a listener to the listeners property in EventEmitter
// Adds the listener function to the end of the listeners
// array (in the listeners property) for the event named eventName.
//
// Example.
// var emitter = new EventEmitter();
// function log() { console.log('called'); }
// emitter.on('someEvent', log);
// emitter.listeners // -> {someEvent: [log]}
// emitter.emit('someEvent') // -> prints 'called'
// emitter.emit('someEvent') // -> prints 'called'
// emitter.emit('someEvent') // -> prints 'called'
EventEmitter.prototype.on = function(eventName, fn) {
  // we will receive an input of and eventName and fn, which needs
  // to be sorted into the listeners{}. First the eventName must be
  // searched in the listeners{}, and if it does not exsist then
  // we must create the key for the eventName & push the fn into the value
  // array. If the eventName key does exist, then ONLY the fn must be pushed
  // into the value-array.


  // 1. SEARCH: First the eventName must be  searched in the listeners{},
  //     -> if it does not exsist then
  //            CREATE the key for the eventName
  //            PUSH the fn into the value array
  //      -> If the eventName key does exist, then
  //            PUSH fn into value array


  if (!this.listeners.hasOwnProperty(eventName)) {
    // CREATE, PUSH
    //this.listeners[eventName] = [];
    //this.listeners[eventName].push(fn);

    this.listeners[eventName] = [fn];


  } else { // event exists
    // TODO: PUSH fn into array
    this.listeners[eventName].push(fn)
  }
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
  // start by searching for the eventName. Then it looks for the listeners in
  //the eventName and calls them all in order. pass arguments to each
  //listener. if there is no eventName, do nothing
  if (this.listeners.hasOwnProperty(eventName)) {
    // pass arg through an array of functions
    // console.log(eventName, arg)
    // console.log(this.listeners[eventName].length)
    for (var i = 0; i < this.listeners[eventName].length; i++) {
      var print = this.listeners[eventName][i](arg)
      // console.log(print)
    }
  } else {
    throw new Error("EventNameError")
  }
}

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
  // SEARCH for eventName and if found then remove the fn from the array
  if (this.listeners.hasOwnProperty(eventName)) {
    for (var i = 0; i < this.listeners[eventName].length; i++) {
      if (this.listeners[eventName][i] === fn) {
        this.listeners[eventName].splice(this.listeners[eventName][i] - 1, 1)
      }
    }
  }
}

// *Bonus*: Takes is a string "eventName" and a callback function "fn"
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
  // YOUR CODE HERE
}
