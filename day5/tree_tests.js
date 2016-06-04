"use strict";

function getTree() {
  return new Tree('+',
      new Tree(6),
      new Tree('-',
        new Tree('+',
          new Tree(4),
          new Tree('*',
            new Tree(3),
            new Tree(0)
            )
          ),
        new Tree('/',
          new Tree('+',
            new Tree(3),
            new Tree(4)
            ),
          new Tree(5)
          )
        )
      );
}

function toArray() {
  var arr = [];
  return {
    array: arr,
    fn: function(i) {
      arr.push(i);
    }
  };
}

describe("Tree.prototype.inOrder()", function() {
  it("Tree with single item", function() {
    var t = new Tree(123);
    var toArr = toArray();
    t.inOrder(toArr.fn);
    expect(toArr.array).toEqual([123]);
  });
  it("Traverse", function() {
    var t = getTree();
    var toArr = toArray();
    t.inOrder(toArr.fn);
    expect(toArr.array).toEqual([6, '+', 4, '+', 3, '*', 0, '-', 3, '+', 4, '/', 5]);
  });
});

describe("Tree.prototype.preOrder()", function() {
  it("Tree with single item", function() {
    var t = new Tree(123);
    var toArr = toArray();
    t.preOrder(toArr.fn);
    expect(toArr.array).toEqual([123]);
  });
  it("Traverse", function() {
    var t = getTree();
    var toArr = toArray();
    t.preOrder(toArr.fn);
    expect(toArr.array).toEqual(['+', 6, '-', '+', 4, '*', 3, 0, '/', '+', 3, 4, 5]);
  });
});

describe("Tree.prototype.postOrder()", function() {
  it("Tree with single item", function() {
    var t = new Tree(123);
    var toArr = toArray();
    t.postOrder(toArr.fn);
    expect(toArr.array).toEqual([123]);
  });
  it("Traverse", function() {
    var t = getTree();
    var toArr = toArray();
    t.postOrder(toArr.fn);
    expect(toArr.array).toEqual([6, 4, 3, 0, '*', '+', 3, 4, '+', 5, '/', '-', '+']);
  });
});


describe("Tree.prototype.getSize()", function() {
  it("empty tree -> 0", function() {
    expect(new Tree().getSize()).toBe(0);
  });
  it("tree with 1 item -> 0", function() {
    expect(new Tree(123).getSize()).toBe(1);
  });
  it("Get size", function() {
    expect(getTree().getSize()).toBe(13);
  });
});

describe("Tree.prototype.getHeight()", function() {
  it("empty tree -> 0", function() {
    expect(new Tree().height()).toBe(0);
  });
  it("tree with 1 item -> 0", function() {
    expect(new Tree(123).height()).toBe(1);
  });
  it("Get height", function() {
    expect(getTree().height()).toBe(5);
  });
});
