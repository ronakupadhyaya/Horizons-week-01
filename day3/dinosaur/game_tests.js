"use strict";

describe("<Dinosaur> Class", function() {
  var dino;
  var ob1;
  var ob2;
  var ob3;
  beforeAll(function() {
    dino = new game.Dinosaur(0, 0);
    ob1 = new game.Obstacle(20, 40);
    ob2 = new game.Obstacle(0, 40);
    ob3 = new game.Obstacle(0, 0);
  })
  
  
  describe("the isCollidingWith method", function() {
    it("should have exist", function() {
      expect(dino.isCollidingWith).toBeDefined();
    });
    
    it("should return a Boolean", function() {
      expect(dino.isCollidingWith(dino, ob1)).toEqual(jasmine.any(Boolean));
    });
    
    it("should properly detect collisions", function() {
      expect(dino.isCollidingWith(dino, dino)).toEqual(true);
      expect(dino.isCollidingWith(dino, ob1)).toEqual(false);
      expect(dino.isCollidingWith(dino, ob2)).toEqual(false);
      expect(dino.isCollidingWith(dino, ob3)).toEqual(true);
    });
  });
});

describe("<Game> Class", function() {
  var game;
  beforeAll(function() {
    game = new game.Game();
  })
  
  it("the should update players and game objects", function() {
    
  });
  
  it("the should bound players", function() {

  });
  
  it("the should bound obstacles", function() {
    
  });
  
  it("the should properly detect collisions", function() {
    
  });
});
