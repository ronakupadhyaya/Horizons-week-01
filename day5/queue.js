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
  // YOUR CODE HERE
  if(!!this.head === false){
    this.size = count;
    return 0;
  }
  var count = 1;
  var temp = this.head;
  while(temp !== this.tail){
    count++;
    temp = temp.next;
  }
  this.size = count;
  return count;
}


// Exercise: Queue.push(value)
// Write function that takes a value and adds that value to the end (i.e.
// tail) of the queue.
Queue.prototype.push = function(value) {
  // YOUR CODE HERE
  var a = new Item(value, null);
  var b = this.tail;
  if(!!this.head === false){
    this.head = a;
    this.tail = a;
  }else{
    b.next = a;
    this.tail = a;
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
  //ret
  var ret = this.head;
  //Throw error when queue is empty
  if(this.getSize() === 0){
    throw new Error("Queue is empty");
  }

  if(this.head.next !== null){
    this.head = this.head.next;
    ret.next = null;
  }else if(this.getSize() === 1){
    this.head = null;
    this.tail = null;
  }
  this.size--;
  return ret.value;
}

// Exercise: Queue.contains()
// Write a function that takes a value and returns true if that value is stored
// in the queue, false otherwise.
//
// ex. new Queue().contains('something') -> false, queue is empty
Queue.prototype.contains = function(value) {
  // YOUR CODE HERE
  if(this.head === null){
    return false;
  }
  var temp = this.head;

  while(temp.next !== null){
    if(temp.value === value){
      return true;
    }
    temp = temp.next;
  }
  if(temp.value === value){
    return true;
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
  if(this.getSize() === 0){
    return null;
  }
  return this.head;
}

// Bonus exercise: Queue.forEach(fun)
// Write a function that takes function 'fun' and calls fun with each item in
// the Queue starting from the first item (i.e. head).
Queue.prototype.forEach = function(fun) {
  // YOUR CODE HERE
  if(this.getSize() ===0)
    return null;
  temp = this.head;
  while(temp!==null){
    fun(temp.value);
    temp=temp.next;
  }
}

// --------------------TESTS--------------------
// We've implemented one test suite for you that covers end-to-end
// functionality at the bottom.
// You're responsible for writing the test cases for each function().
describe("Queue.prototype.isEmpty", function() {
  // YOUR CODE HERE
  var q = new Queue(null,null,0);
  it("expect q.empty() to be true", function() {
    var q = new Queue(null,null,0);
    expect(q.isEmpty()).toBe(true);
  });
  it("expect q.empty() to be false", function() {
    q.push(5);
    expect(q.isEmpty()).toBe(false);
  });
  it("expect q.empty() to be true", function() {
    q.push(5);
    q.pop();
    q.pop();
    expect(q.isEmpty()).toBe(true);
  });
});

describe("Queue.prototype.getSize", function() {
  // YOUR CODE HERE
  var q = new Queue(null,null,0);
  it("expect q.getSize() to be 0", function() {
    expect(q.getSize()).toBe(0);
  });
  it("expect q.getSize() to be 1", function() {
    q.push(5);
    expect(q.getSize()).toBe(1);
  });
  it("expect q.getSize() to be 2", function() {
    q.push(5);
    q.push(6);
    expect(q.getSize()).toBe(3);
  });
});

describe("Queue.prototype.push", function() {
  //Done
  var z = new Queue(null,null,0);
  z.push(5);
  z.push(6);
  it("expect z.push() 5", function() {
    expect(z.head.value).toBe(5);
  });
  it("expect z.push() next head = 6", function() {
    var z = new Queue(null,null,0);
    z.push(5);
    z.push(6);
    expect(z.head.next.value).toBe(6);
  });
  it("expect z.push() tail = 6", function() {
    var z = new Queue(null,null,0);
    z.push(5);
    z.push(6);
    expect(z.tail.value).toBe(6);
  });
});

describe("Queue.prototype.pop", function() {
  // YOUR CODE HERE
  it("expect z.pop()", function() {
    var z = new Queue(null,null,0);
    z.push(5);
    z.push(6);
    z.push(7);
    expect(z.pop()).toBe(5)
  });
  it("expect z.pop()", function() {
    var z = new Queue(null,null,0);
    z.push(6);
    z.push(7);
    expect(z.pop()).toBe(6)
  });
  it("expect z.pop()", function() {
    var z = new Queue(null,null,0);
    z.push(7);
    expect(z.pop()).toBe(7)
  });
  it("expect z.pop()", function() {
    var z = new Queue(null,null,0);
    expect(z.pop).toThrow()
  });
});

describe("Queue.prototype.contains", function() {
  // YOUR CODE HERE
  it("expect z.contains() true", function() {
    var z = new Queue(null,null,0);
    z.push(5);
    z.push(6);
    expect(z.contains(5)).toBe(true)
  });
  it("expect z.contains() false", function() {
    var z = new Queue(null,null,0);
    z.push(5);
    z.push(6);
    expect(z.contains(8)).not.toBe(true)
  });
  it("expect z.contains() 6", function() {
    var z = new Queue(null,null,0);
    z.push(5);
    z.push(6);
    expect(z.contains(6)).toBe(true)
  });
});

describe("Queue.prototype.peek", function() {
  // YOUR CODE HERE
  it("expect z.peek() to return null", function() {
    var z = new Queue(null,null,0);
    expect(z.peek()).toBe(null)
  });
  it("expect z.peek() 5", function() {
    var z = new Queue(null,null,0);
    z.push(5);
    expect(z.peek().value).toBe(5)
  });
  it("expect z.peek() to return 6", function() {
    var z = new Queue(null,null,0);
    z.push(5);
    z.push(6);
    z.pop();
    expect(z.peek().value).toBe(6);
  });
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
