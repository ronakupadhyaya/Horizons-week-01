"use strict";

describe("<Dinosaur> Class", function() {
  var dino;
  var ob1;
  var ob2;
  beforeAll(function() {
    dino = new game.Dinosaur(0, 0);
    ob1 = new game.Obstacle(20, 40);
    ob2 = new game.Obstacle(0, 40);
  });
  
  describe("the isCollidingWith method", function() {
    it("should have exist", function() {
      expect(dino.isCollidingWith).toBeDefined();
    });
    
    it("should return a Boolean", function() {
      expect(dino.isCollidingWith(ob1)).toEqual(jasmine.any(Boolean));
    });
    
    it("should properly detect collisions", function() {
      expect(dino.isCollidingWith(dino)).toEqual(true);
      expect(dino.isCollidingWith(ob1)).toEqual(false);
      expect(dino.isCollidingWith(ob2)).toEqual(false);
    });
  });
});

describe("<Game> Class", function() {
  var g;
  var timerCallback;
  beforeAll(function() {
    g = new game.Game();
    
    timerCallback = g.exit;
    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  });
  
  it("the should update players and game objects", function() {
    expect(g.player.hasCalledUpdate).toBe(true);
    g.obstacles.forEach(function(ob) {
      expect(ob.hasCalledUpdate).toBe(true);
    });
  });
  
  it("the should bound players", function() {
    var dinoPos = g.player.getPosition();
    expect(dinoPos[0]).toBeGreaterThan(-1);
    expect(dinoPos[0]).toBeLessThan(g.width + 1);
    expect(dinoPos[1]).toBeGreaterThan(-1);
    expect(dinoPos[1]).toBeLessThan(g.height + 1);
  });
  
  it("the should bound obstacles", function() {
    g.obstacles.forEach(function(ob) {
      var obPos = ob.getPosition();
      expect(obPos[0]).toBeGreaterThan(-1);
      expect(obPos[0]).toBeLessThan(g.width + 1);
      expect(obPos[1]).toBeGreaterThan(-1);
      expect(obPos[1]).toBeLessThan(g.height + 1);
    });
  });
  
  it("should properly call exit upon collision", function() {
    // setTimeout(function() {
    //   // timerCallback();
    // }, 1000);
    // 
    jasmine.clock().tick(1001);
    expect(timerCallback).toHaveBeenCalled();
  });
});
