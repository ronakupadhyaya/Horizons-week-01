// In this exercise you will create your own EventEmitter class
// that will listen for & emit events. These events can be used
// to keep track of actions/changes made by a user.
//
// Once you correctly implement the EventEmitter object you
// will be able to use the messenger application. Note that if you
// send a message on one device, it will be available on all
// other devices.

function EventEmitter() {
  this.listeners = {};
}

EventEmitter.prototype.once = function(eventName, fn) {
  if (!(eventName in this.listeners)) this.listeners[eventName] = [];
  var called = false;
  var self = this;

  function inner() {
    self.removeListener(eventName, inner);

    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }

  inner.listener = fn;
  this.on(eventName, inner);
  return this;
}

// add a listener to the listeners property in EventEmitter
EventEmitter.prototype.on = function(eventName, fn) {
  if (!(eventName in this.listeners)) this.listeners[eventName] = [];
  this.listeners[eventName].push(fn);
}


EventEmitter.prototype.emit = function(eventName, arg) {
  var listeners = this.listeners[eventName];
  if (listeners && listeners.length) {
    listeners.forEach(function (l) {l(arg);});
  }

  return this;
}

EventEmitter.prototype.removeListener = function(eventName, fn) {
  this.listeners[eventName] = this.listeners[eventName].filter(function(listener) {
    return listener != fn;
  });

  return this;
}

function Observer(name, myEventEmitter) {
  this.name = name; this.myEventEmitter = myEventEmitter;
  this.myEventEmitter.on("send", this.onSend.bind(this));
}

Observer.prototype.onSend = function(m) {
  document.getElementById(this.name).innerHTML += m + `<br/>`;
}

var myEventEmitter = new EventEmitter();
var observers = [
  new Observer('iphone', myEventEmitter),
  new Observer('ipad', myEventEmitter),
  new Observer('mac', myEventEmitter)
];

function submitMsg(type) {
  var msg = document.getElementById(type+"-input").value;
  if (!msg) return;
  myEventEmitter.emit('send', msg);
}
