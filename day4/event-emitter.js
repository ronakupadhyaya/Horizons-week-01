// In this exercise you will create your own EventEmitter class
// that will listen for & emit events. These events can be used
// to keep track of actions/changes made by a user.
//
// Once you correctly implement the EventEmitter object you
// will be able to use the messenger application. Note that if you
// send a message on one device, it will be available on all
// other devices.

class EventEmitter {

  // this will run when you create a new instance
  // of the EventEmitter class. it will create a
  // listeners object
  constructor() {
    this.listeners = {};
  }

  once(eventName, fn) {
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
  on(eventName, fn) {
    if (!(eventName in this.listeners)) this.listeners[eventName] = [];
    this.listeners[eventName].push(fn);
  }


  emit(eventName, arg) {
    var listeners = this.listeners[eventName];
    if (listeners && listeners.length) {
      listeners.forEach(function (l) {l(arg);});
      return true;
    }

    return false;
  }

  removeListener(eventName, fn) {
    var listeners = this.listeners[eventName];

    if (listeners.length) {
        var index = listeners.reduce(function (i, listener, index) {
          return ((typeof(listener) == 'function' &&
                 listener === fn) ? index : i);
        }, -1);

        if (index > -1) {
            listeners.splice(index, 1);
            this.listeners[eventName] = listeners;
            return true;
        }
    }
    return false;
  }
}

class Observer {
  constructor (name, myEventEmitter) {
    this.name = name; this.myEventEmitter = myEventEmitter;

    var self = this;
    this.myEventEmitter.on("send", function (m) {self.onSend(m)});
  }
  onSend(m) {
    document.getElementById(this.name).innerHTML += m + `<br/>`;
  }
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
  switch (type) {
    case "iphone":
      myEventEmitter.emit('send', msg);
      break;
    case "ipad":
      myEventEmitter.emit('send', msg);
      break;
    case "mac":
      myEventEmitter.emit('send', msg);
      break;
  }
}
