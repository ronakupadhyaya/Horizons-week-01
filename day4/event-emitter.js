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
  // YOUR CODE HERE
  this.listeners = {};
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
// emitter.emit('someEvent') // -> prints 'called'
// emitter.emit('someEvent') // -> prints 'called'
// emitter.emit('someEvent') // -> prints 'called'
EventEmitter.prototype.on = function(eventName, fn) {
  // YOUR CODE HERE
  if (this.listeners.hasOwnProperty(eventName)){
    this.listeners[eventName].push(fn);
  }else{
    this.listeners[eventName] = [fn];
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
var toRemove = false;
EventEmitter.prototype.emit = function(eventName, arg) {
  // YOUR CODE HERE
  if (onceCalled){
    console.log(!onceCalled);
    toRemove = true;

  }
  return this.listeners[eventName][0].call(this,arg);

/* for(var i = 0; i < this.listeners[eventName].length; i++){
    return this.listeners[eventName][i].call(this,arg);
  }*/

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
if(toRemove === true){
EventEmitter.prototype.removeListener = function(eventName, fn) {
  // YOUR CODE HERE
  if(this.listeners[eventName].indexOf(fn)!== -1 ){
    this.listeners[eventName].splice(this.listeners[eventName].indexOf(fn),1)
  }
}
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
var onceCalled =  false;
EventEmitter.prototype.once = function(eventName, fn) {
  // YOUR CODE HERE

  onceCalled = true;
}
