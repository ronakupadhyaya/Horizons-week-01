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
  return this.size;
}


// Exercise: Queue.push(value)
// Write function that takes a value and adds that value to the end (i.e.
// tail) of the queue.
Queue.prototype.push = function(value) {
  // YOUR CODE HERE
  //
  // To add an value to the end of a Queue we:
  //  - create new Item with value set to new value
  //  - set the next pointer of the last Item to new Item
  //  - set the tail pointer to the new Item
  //

  var newItem = new Item(value, null);
  console.log(newItem);
  if (!this.head) { //empty queue, set head+tail
    this.head = newItem;
    this.tail = newItem;
  } else {
    this.tail.next = newItem;
    this.tail = newItem;
  }

  this.size++;
  // console.log("pushed: " + value + ", size is now " + this.size);
  return value;

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
    throw Error("empty queue");
  }

  var ret = this.head.value;
  if (this.size === 1) {
    this.head = null;
    this.tail = null;
    this.size--;
    return ret;
  }

  this.head = this.head.next;
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
  var next = this.head; //traverse through queue
  while (next) {
    if (value === next.value) {
      return true;
    }
    next = this.head.next;
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
}

// --------------------TESTS--------------------
// We've implemented one test suite for you that covers end-to-end
// functionality at the bottom.
// You're responsible for writing the test cases for each function().
// describe("Queue.prototype.isEmpty", function() {
//   // YOUR CODE HERE
//   it("this.isEmpty -> true", function(){
//     expect(function(){
//       this.isEmpty();
//     }).toBe(true);
//   });
// });

describe("Queue.prototype.isEmpty", function() {
  it("should return true", function() {
    var q = new Queue();
    expect(q.isEmpty()).toBe(true);
  });
  it("should return false", function() {
    var q = new Queue();
    q.push("1");
    expect(q.isEmpty()).toBe(false);
  });
});

describe("Queue.prototype.getSize", function() {
  it("should return 0", function() {
    var q = new Queue();
    expect(q.getSize()).toEqual(0);
  });
  it("should return 1", function() {
    var q = new Queue();
    q.push(1);
    expect(q.getSize()).toEqual(1);
  });
  it("should return 2", function() {
    var q = new Queue();
    q.push(1);
    q.push(1);
    expect(q.getSize()).toEqual(2);
  });
  it("should return 1 after pop", function() {
    var q = new Queue();
    q.push(1);
    q.push(2);
    q.pop();
    expect(q.getSize()).toEqual(1);
  });
  it("should throw an exception", function() {
    expect(function() {
      q.getSize()
    }).toThrow();
  })
});

describe("Queue.prototype.push", function() {
  it("should return 2", function() {
    var q = new Queue();
    q.push(1);
    q.push(1);
    expect(q.getSize()).toEqual(2);
  });
});

describe("Queue.prototype.pop", function() {
  // it("should return true", function() {
  //   var q = new Queue();
  //   expect(q.isEmpty()).toBe(true);
  // });
  it("should return 1 after pop", function() {
    var q = new Queue();
    q.push(1);
    q.push(2);
    expect(q.pop()).toEqual(1);
  });
});

describe("Queue.prototype.contains", function() {
  it("should return true", function() {
    var q = new Queue();
    expect(q.isEmpty()).toBe(true);
  });
});

describe("Queue.prototype.peek", function() {
  it("should return 1", function() {
    var q = new Queue();
    q.push(1);
    expect(q.peek()).toEqual(1);
  });
});

// This one's a bonus
// describe("Queue.prototype.forEach", function() {
//   it("should return true", function() {
//     var q = new Queue();
//     expect(q.isEmpty()).toBe(true);
//   });
// });


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
    while (!q.isEmpty()) {
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
    // function time(fun) {
    //   var start = Date.now();
    //   _.range(100).map(fun);
    //   return Date.now() - start;
    // }
    //
    // function array() {
    //   var array = [];
    //   _.range(100).forEach(function(item) {
    //     array.unshift(item);
    //   });
    // }
    //
    // function queue() {
    //   var q = new Queue();
    //   _.range(100).forEach(function(item) {
    //     q.push(item);
    //   });
    // }
    //
    // var arrayTime = time(array);
    // var queueTime = time(queue);
    // // Array time should be greater, meaning it took longer, i.e. it was slower
    // console.log('Queue time: %s Array time: %s', queueTime, arrayTime);
    // expect(arrayTime > queueTime).toBe(true);
  });
});
