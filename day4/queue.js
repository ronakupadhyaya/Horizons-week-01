"use strict";

// XXX
window.Queue = function() {
  // The queue starts out empty so this is null.
  // When the queue is not empty, this should point to the first <Item> in the
  // Queue.
  this.head = null;
  // The queue starts out empty so this is null.
  // When the queue is not empty, this should point to the last <Item> in the
  // Queue.
  this.tail = null;
  // This number should go up and down as you add and pop items from the queue
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
  // The next item (which should also be a Queue.Item
}

// Example: Queue.isEmpty()
// Write a function that returns true if there are no items stored in queue.
//
// ex. new Queue().isEmpty() -> true
Queue.prototype.isEmpty = function() {
  return this.head === null;
}

// Exercise: Queue.getSize()
// Write a function that returns the number of items stored in the queue.
//
// ex. new Queue().getSize() -> 0
Queue.prototype.getSize = function() {
  // YOUR CODE HERE
  return this.size;
}


// Exercise: Queue.push(value)
// Write function that takes a value and adds that value to the end (i.e.
// tail) of the queue.
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

// Exercise: Queue.pop()
// Write function that removes the item at the beginning (i.e. head) of the
// queue and returns that item.
//
// This function should throw an exception (i.e. generate an error) if the
// queue is empty.
//
// ex. new Queue().pop() -> Error
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

// Exercise: Queue.contains()
// Write a function that takes a value and returns true if that value is stored
// in the queue, false otherwise.
//
// ex. new Queue().contains('something') -> false, queue is empty
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

// Exercise: Queue.peek()
// Write a function that returns the first item of the queue, return null if
// queue is empty.
//
// ex. new Queue().peek() -> null
Queue.prototype.peek = function() {
  // YOUR CODE HERE
  if (this.head) {
    return this.head.value;
  }
  return null;
}

// Bonus exercise: Queue.forEach(fun)
// Write a function that takes function 'fun' and calls fun with each item in
// the Queue starting from the first item (i.e. head).
Queue.prototype.forEach = function(fun) {
  // YOUR CODE HERE
  var next = this.head;
  while (next) {
    fun(next.value);
    next = next.next;
  }
}

// --------------------TESTS--------------------
// We've implemented one test suite for you that covers end-to-end
// functionality at the bottom.
// You're responsible for writing the test cases for each function().
describe("Queue.prototype.isEmpty", function() {
  // YOUR CODE HERE
});

describe("Queue.prototype.getSize", function() {
  // YOUR CODE HERE
});

describe("Queue.prototype.push", function() {
  // YOUR CODE HERE
});

describe("Queue.prototype.pop", function() {
  // YOUR CODE HERE
});

describe("Queue.prototype.contains", function() {
  // YOUR CODE HERE
});

describe("Queue.prototype.peek", function() {
  // YOUR CODE HERE
});

// This one's a bonus
describe("Queue.prototype.forEach", function() {
  // YOUR CODE HERE
});


describe("Queue end-to-end", function() {
  it("Push 100 items to queue, then pop them back out, items should come out in same order", function() {
    var q = new Queue();

    // Generate 100 random numbers
    var input = _.range(100).map(_.partial(_.random, 10000));

    // Push numbers to queue
    _.forEach(input, function(item) {
      q.push(item);
    });

    // Pop all numbers from queue
    var out = [];
    while (! q.isEmpty()) {
      out.push(q.pop());
    }

    // Items should come out in the order pushed
    expect(input).toEqual(out);
  });
  it("Push and pop the same 2 items 10 times, check that values are updated properly", function() {
    var q = new Queue();
    _.forEach(_.range(10), function() {
      // Should start out empty
      expect(q.getSize()).toBe(0);
      expect(q.isEmpty()).toBe(true);
      expect(q.contains('x')).toBe(false);
      expect(q.contains('y')).toBe(false);

      // Add x, check contents, check size
      q.push('x');
      expect(q.contains('x')).toBe(true);
      expect(q.contains('y')).toBe(false);
      expect(q.getSize()).toBe(1);

      // Add x, check contents, check size
      q.push('y');
      expect(q.contains('x')).toBe(true);
      expect(q.contains('y')).toBe(true);
      expect(q.getSize()).toBe(2);

      // Pop x, check contents, check size
      expect(q.pop()).toBe('x');
      expect(q.contains('x')).toBe(false);
      expect(q.contains('y')).toBe(true);
      expect(q.getSize()).toBe(1);

      // Pop y, check empty
      expect(q.pop()).toBe('y');
      expect(q.contains('x')).toBe(false);
      expect(q.contains('y')).toBe(false);
      expect(q.getSize()).toBe(0);
      expect(q.isEmpty()).toBe(true);
    })
  });

  it("Bonus: queue should be faster than an array for adding to the beginning", function() {
    // Run a function 10,000 times and measure time taken
    function time(fun) {
      var start = Date.now();
      _.range(10000).map(fun);
      return Date.now() - start;
    }

    function array() {
      var array = [];
      _.range(100).forEach(function(item) {
        array.unshift(item);
      });
    }

    function queue() {
      var q = new Queue();
      _.range(100).forEach(function(item) {
        q.push(item);
      });
    }

    var arrayTime = time(array);
    var queueTime = time(queue);
    // Array time should be greater, meaning it took longer, i.e. it was slower
    console.log('Queue time: %s Array time: %s', queueTime, arrayTime);
    expect(arrayTime > queueTime).toBe(true);
  });
});

