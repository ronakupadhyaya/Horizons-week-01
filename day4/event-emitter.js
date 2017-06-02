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
// emitter.listeners // -> {someEventName: [f1,f2], otherEventName: [f2]}
function EventEmitter() {
  this.listeners = {
    //keys are names for event
    //values are array of functions
  };
}

// Takes is a string "eventName" and a callback function "fn"
// add a listener to the listeners property in EventEmitter
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
  if (this.listeners.hasOwnProperty(eventName))
    this.listeners[eventName].push(fn);
  else
    this.listeners[eventName] = [fn];
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
  if (this.listeners.hasOwnProperty(eventName)) {
    var fns = this.listeners[eventName];
    _.forEach(fns, function(fn) {
      return fn(arg);
    });
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
  if (this.listeners.hasOwnProperty(eventName))
    this.listeners[eventName].pop(fn);
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
