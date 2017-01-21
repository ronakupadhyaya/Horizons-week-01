"use strict";

// --------------------Queues--------------------
// A Queue is a data structure that keeps track of items and allows them to be
// processed (i.e. removed from the queue) in the order they have been added.
// This ordering is known FIFO (First-in-first-out).
//
// More info on JavaScript arrays:
// https://en.wikipedia.org/wiki/Queue_(abstract_data_type)
//
// Stacks, on the other hand, track items in REVERSE order.  Stack ordering is
// also known as LIFO (Last-in-first-out).
//
// JavaScript arrays are good (i.e. fast) for stacks. push() and pop()
// remove items from the end of an array.
//
// ex.
//    var array = [];
//    array.push(1);
//    array.push(2);
//    array.push(3);
//    array.pop(); // -> 3, note reverse order
//    array.pop(); // -> 2
//    array.pop(); // -> 1
//
// We can remove items from the beginning of JavaScript arrays with the
// .unshift() function but this function has to shift all the other items in
// the array back by one space. So if the array is big, this operation
// can take a long time.
//
// We can build fast Queues using a linked lists.
//
// In a linked list, each Item in the Queue has a pointer (i.e. a link or a
// reference) to the next Item, called the 'next' pointer. The Queue itself has
// a pointer to the first and the last Item. We call the pointer to the first
// Item the 'head' pointer the pointer to the last Item the 'tail' pointer.
//
// To add an value to the end of a Queue we:
//  - create new Item with value set to new value
//  - set the next pointer of the last Item to new Item
//  - set the tail pointer to the new Item
//
// To remove an item from the beginning of a queue we:
//  - Move the head pointer of the Queue to the next Item
//
// The remove operation is always as fast no matter how big tha Queue gets
// because it only takes one step.
window.Queue = function() {
  // The queue starts out empty so this is null.
  // When the queue is not empty, this should point to the first <Item> in the
  this.head = null;
  // The queue starts out empty so this is null.
  // When the queue is not empty, this should point to the last <Item> in the
  // Queue.
  this.tail = null;
  // This number should go up and down as you add and pop items from the queue
  this.size = 0;
}

// A linked list is made up of items that have pointers (aka links or references)
// to the next item.
// The pointer to the next item is called 'next';
window.Item = function(value, next) {
  // The value of the current item
  this.value = value;
  // The next item (which should also be a Queue.Item)
  // If this is the last item in the list, next will be null
  this.next = next;
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
  return this.size;
}


// Exercise: Queue.push(value)
// Write function that takes a value and adds that value to the end (i.e.
// tail) of the queue.
Queue.prototype.push = function(value) {
  // debugger;
  var x = new Item(value, null);
  if(this.isEmpty()){
    this.head = x;
    this.tail = x;
  }
  else {
    this.tail.next = x
    this.tail = x

  }
  this.size++
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
  var x;
  if(this.isEmpty()) throw "Error empty"
  if(this.size === 1){
    x = this.head
    this.head = null
    this.tail = null
    this.size =0
  }
  else{
    x = this.head
    this.head = this.head.next
    this.size--
  }
  return x.value;
}

// Exercise: Queue.contains()
// Write a function that takes a value and returns true if that value is stored
// in the queue, false otherwise.
//
// ex. new Queue().contains('something') -> false, queue is empty
Queue.prototype.contains = function(value) {
  debugger;
  var m = this.head
  while(m!==null){
    if(m.value===value) return true;
    m=m.next
  }
  return false;
}

// Exercise: Queue.peek()
// Write a function that returns the first item of the queue, return null if
// queue is empty.
//
// ex. new Queue().peek() -> null
Queue.prototype.peek = function() {
  if(this.head === null) return null
  return this.head;
}

// Bonus exercise: Queue.forEach(fun)
// Write a function that takes function 'fun' and calls fun with each item in
// the Queue starting from the first item (i.e. head).
Queue.prototype.forEach = function(fun) {
  // YOUR CODE HERE
}

// --------------------TESTS--------------------
// We've implemented one test suite for you that covers end-to-end
// functionality at the bottom.
// You're responsible for writing the test cases for each function().

describe("Queue.prototype.isEmpty", function() {

  it("Queue.isEmpty to return true", function(){
    var test = new Queue();
    expect(test.isEmpty()).toBeTruthy();
  })
  it("Queue.isEmpty to return False", function(){
    var test = new Queue();
    test.push(1);
    expect(test.isEmpty()).toBeFalsy();
  })
});

describe("Queue.prototype.getSize", function() {
  it("Queue.getSize to return 0", function(){
    var test = new Queue();
    expect(test.getSize()).toBe(0);
  })
  it("Queue.getSize to return 1", function(){
    var test = new Queue();
    test.push(1);
    expect(test.getSize()).toBe(1);
  })
});

describe("Queue.prototype.push", function() {
  it("Queue.head should equal 1", function(){
    var test = new Queue();
    var answer = new Queue();
    var x = new Item(1, null)
    answer.head = x
    answer.tail = x
    answer.size = 1
    test.push(1);
    expect(test).toEqual(answer);
  })
});

describe("Queue.prototype.pop", function() {
  it("Queue.head should equal 2", function(){
    var test = new Queue();
    var answer = new Queue();
    var x = new Item(1, null)
    answer.head = x
    answer.tail = x
    answer.size = 1
    test.push(x)
    test.pop()
    expect(test.head).toBe(null);
  })
  it("Queue.head should equal 3", function(){
    var test = new Queue();
    var answer = new Queue();
    var x = new Item(1, null)
    answer.head = x
    answer.tail = x
    answer.size = 1
    test.push(x)
    test.pop()
    expect(test.tail).toBe(null);
  })
  it("Queue.size should equal 2", function(){
    var test = new Queue();
    var answer = new Queue();
    var x = new Item(3, null)
    answer.head = x
    answer.tail = x
    answer.size = 1
    test.push(2)
    test.push(4)
    test.push(3)
    test.pop()
    test.pop()
    expect(test.tail).toEqual(x);
  })
  it("Queue.size should equal 2", function(){
    var test = new Queue();
    var answer = new Queue();
    var x = new Item(3, null)

    answer.head = x
    answer.tail = x
    answer.size = 1
    test.push(2)
    test.push(4)
    test.push(3)
    test.pop()
    test.pop()
    expect(test.head).toEqual(x);
  })
});

describe("Queue.prototype.contains", function() {
  it("Queue.constais should be false", function(){
    var test = new Queue();
    var answer = new Queue();
    var x = new Item(3, null)

    answer.head = x
    answer.tail = x
    answer.size = 1
    test.push(2)
    test.push(4)
    test.push(3)
    expect(test.contains(1)).toBeFalsy();
  })
  it("Queue.constais should be true", function(){
    var test = new Queue();
    var answer = new Queue();
    var x = new Item(3, null)

    answer.head = x
    answer.tail = x
    answer.size = 1
    test.push(2)
    test.push(4)
    test.push(3)
    expect(test.contains(2)).toBeTruthy();
  })
});

describe("Queue.prototype.peek", function() {
  it("Queue.peek should be 1", function(){
    var test = new Queue();
    var answer = new Queue();


    var z = new Item(3, null)
    var y = new Item(4, z)
    var x = new Item(2, y)
    debugger;

    answer.head = x
    answer.tail = x
    answer.size = 1
    test.push(2)
    test.push(4)
    test.push(3)
    expect(test.peek()).toEqual(x);
  })
  it("Queue.peek should be 1", function(){
    var test = new Queue();
    expect(test.peek()).toBe(null);
  })
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
    // Run a function multiple times and measure time taken to run
    function time(fun) {
      var start = Date.now();
      _.range(1000).map(fun);
      return Date.now() - start;
    }

    function array() {
      var array = [];
      _.range(1000).forEach(function(item) {
        array.unshift(item);
      });
    }

    function queue() {
      var q = new Queue();
      _.range(1000).forEach(function(item) {
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
