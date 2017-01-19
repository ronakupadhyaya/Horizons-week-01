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

  once() {}

  // add a listener to the listeners property in EventEmitter
  on(label, fn) {
    if (!(label in this.listeners)) this.listeners[label] = [];
    this.listeners[label].push(fn);
  }


  emit(label, ...args) {
    var listeners = this.listeners[label];
    if (listeners && listeners.length) {
      listeners.forEach(function (l) {l(...args);});
      return true;
    }

    return false;
  }

  removeListener(label, fn) {
    var listeners = this.listeners[label];

    if (listeners.length) {
        var index = listeners.reduce(function (i, listener, index) {
          return ((typeof(listener) == 'function' &&
                 listener === fn) ? index : i);
        }, -1);
        console.log(index);

        if (index > -1) {
            listeners.splice(index, 1);
            this.listeners[label] = listeners;
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
