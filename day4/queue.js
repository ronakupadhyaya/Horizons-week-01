"use strict";

// XXX
window.Queue = function() {
  // YOUR CODE HERE
  this.head = null;
  this.tail = null;
  this.size = 0;
}

// A linked list is made up of items that have pointers (aka links or references)
// to eachother.
// The pointer to the next item is called 'next';
window.Item = function(value, next) {
  // The value of the current item
  this.value = value;
  // The next item (which should also be a Queue.Item
  this.next = next;
}

// Exercise XXX
Queue.prototype.push = function(value) {
  // YOUR CODE HERE
  var item = new Item(value);
  if (! this.head) {
    // queue is empty, set head and tail
    this.head = this.tail = item;
  } else {
    // add item to the tail
    this.tail.next = item;
    this.tail = item;
  }
  this.size++;
}

// XXX
// remove from front
Queue.prototype.pop = function() {
  // YOUR CODE HERE
  if (this.size === 0) {
    throw new Error("Can't pop from an empty queue");
  }
  var ret = this.head.value;
  if (this.head === this.tail) {
    // Removing last item
    this.head = this.tail = null;
  } else {
    this.head = this.head.next;
  }
  this.size--;
  return ret;
}

// XXX
Queue.prototype.contains = function(value) {
  // YOUR CODE HERE
  var next = this.head;
  while (next) {
    if (value === next.value) {
      return true;
    }
    next = next.next;
  }
  return false;
}

// XXX
// return null if queue is empty
Queue.prototype.peek = function() {
  // YOUR CODE HERE
  if (this.head) {
    return this.head.value;
  }
  return null;
}

// XXX
Queue.prototype.forEach = function(fun) {
  // YOUR CODE HERE
  var next = this.head;
  while (next) {
    fun(next.value);
    next = next.next;
  }
}

// Tests
// We've implemented the
describe("Queue", function() {
  it("Push 100 items to queue, then pop them back out, items should come out in same order", function() {
    var q = new Queue();
    var input = _.range(100);
    _.forEach(input, function(item) {
      q.push(item);
    });
    var out = [];
    while (q.size) {
      out.push(q.pop());
    }
    expect(input).toEqual(out);
  });
});

describe("Queue.pop()", function() {
  // YOUR CODE HERE
})

describe("Queue.addToEnd()", function() {
  // YOUR CODE HERE
})
