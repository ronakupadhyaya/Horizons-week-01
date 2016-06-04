"use strict";

function randomNumbers(n) {
  return _.range(n).map(_.partial(_.random, -1000, 1000));
}

describe("Test SearchTree() with manual data", function() {
  it("add 5,1,8,12 ", function() {
    var t = new SearchTree(5);
    t.add(5);
    t.add(1);
    t.add(1);
    t.add(8);
    t.add(8);
    t.add(12);
    t.add(12);
    expect(t.getSize()).toBe(4);
    expect(t.remove(5)).toBe(true);
    expect(t.getSize()).toBe(3);
  });
  it("add 5,1,8,12 ", function() {
    var t = new SearchTree(5);
    t.add(1);
    t.add(-8);
    t.add(12);
    expect(t.search(5)).toBe(true);
    expect(t.search(1)).toBe(true);
    expect(t.search(-8)).toBe(true);
    expect(t.search(12)).toBe(true);
    expect(t.search(11)).toBe(false);
    expect(t.search(-1)).toBe(false);
  });
});

describe("Test SearchTree() with randomly generated data", function() {
  it(".equals()", function() {
    var rand = randomNumbers(100);
    var t1 = new SearchTree(rand[0]);
    var t2 = new SearchTree(rand[0]);
    rand.forEach(function(item) {
      t1.add(item);
      t2.add(item);
    });
    expect(t1.equals(t2)).toBe(true);
    expect(t2.equals(t1)).toBe(true);

    console.log(t1);
    t1.remove(t1.value);
    console.log(t1);
    expect(t1.equals(t2)).toBe(false);
    expect(t2.equals(t1)).toBe(false);
  });

  it(".add() .size()", function() {
    var rand = randomNumbers(500);
    var t1 = new SearchTree(rand[0]);
    rand.forEach(function(item) {
      t1.add(item);
    });
    rand.sort();
    rand = _.uniq(rand);
    expect(t1.getSize()).toBe(rand.length);
  });

  it(".add() .remove() .search()", function() {
    var rand = randomNumbers(500);
    var t1 = new SearchTree(rand[0]);
    rand.forEach(function(item) {
      t1.add(item);
    });

    rand = _.uniq(rand);
    var split = Math.floor(rand.length / 2);

    var remove = _.shuffle(rand.slice(split));
    remove.forEach(function(item) {
      t1.remove(item);
    });

    var keep = rand.slice(0, split);
    console.log(rand.length, keep.length, remove.length);
    expect(t1.getSize()).toBe(keep.length);

    expect(_.all(remove, function(item) {
      return ! t1.search(item);
    })).toBeTruthy();
    expect(_.all(keep, function(item) {
      return t1.search(item);
    })).toBeTruthy();
  });

  it(".add() .search()", function() {
    var rand = randomNumbers(500);
    var t1 = new SearchTree(rand[0]);
    rand.forEach(function(item) {
      t1.add(item);
    });

    rand = _.shuffle(rand);
    expect(_.all(rand, function(item) {
      return t1.search(item);
    })).toBe(true);
  });
});
