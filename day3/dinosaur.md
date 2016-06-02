# Dinosaur Game

## Preface

You guys have been making some pretty complicated things these past few days, so let's do something fun today!

There's no doubt that you've experienced how terrible the wi-fi connection can get at Horizons HQ, and quite a few of you are greeted with the "no w-fi" dinosaur in Chrome. Did you know that it's also a mini-game? If you didn't, try it out now: turn off your wi-fi radio and try navigating to a web-page in chrome.

You should see a dinosaur, and if you press the `SPACE` key, you'll end up starting the game.

<img src="http://d0od.wpengine.netdna-cdn.com/wp-content/uploads/2015/06/chrome-dinosaur-game.png"/>

_(You can go ahead and play through that for a bit)_

So, what's the exercise for today, you ask?

You're gonna be building that very game!

Well, sort of. We're going to show you how to apply the skills you've learned thus far to create a simple game similar to the No-Wifi Dinosaur adventure. At the end of it, it will probably look a little something like this:

<img src="new_dino.png" />

The **goal** of this game will to be avoid hitting the obstacle that comes running at you.

--- 

### `CanvasWrapper`

To make the game, we're providing you with a class to make interacting with HTML `canvas` elements easier (that way you won't have to know too much to use it!). It's called `CanvasWrapper,` and you can find it in `dinosaur_game.js`. `Canvas` is an HTML element used for displaying graphics in the browser. 

There are only a few methods implemented but they make your life a lot easier:

##### `CanvasWrapper.prototype.clear()`

This method resets the canvas. The Canvas Element works like a real canvas - once you've painted something, it will stay there. That feature is annoying if you're building a game and want to move things around - the old image will stay where you drew it last, and so you see a 'lagging' sort of effect.

Kind of like this:

<img src="http://i.imgur.com/1VFZwvx.png"/>

So, when you want to move objects, you have to clear the canvas before you do, otherwise it's Windows 95 all over again.

##### `CanvasWrapper.prototype.drawDinosaur(x<Number>, y<Number>)`

This method draws the `Dinosaur` object to the screen. Really, it's just an orange-redish (coral?) rectangle, but it's the thought that counts. It will draw a rectangle at point (x, y), with the given arguments being the bottom right vertex of the `Dinosaur` rectangle.

##### `CanvasWrapper.prototype.drawObstacle(x<Number>, y<Number>)`

This method draws an `Obstacle` object to the screen, much like `.drawDinosaur`. However, the obstacle is instead drawn from its bottom-left corner, rather than the bottom-right, like `Dinosaur`.

##### `CanvasWrapper.prototype.drawText(text<String>)`

This method draws text. However, the obstacle is instead drawn from its bottom-left corner, rather than the bottom-right, like `Dinosaur`.

##### `CanvasWrapper.prototype.callOnUp(fun<Function>)`

This method takes a function and starts listening for the 'UP' key. It will execute the given function when it detects that the `UP` key has been pressed. This will come in useful later on for detecting input.

##### `CanvasWrapper.prototype.getHeight()`

This method with return the height of the canvas. This might come in useful for bounding, later on.

##### `CanvasWrapper.prototype.getWidth()`

This method with return the width of the canvas. This might come in useful for bounding, later on.

#### Usage

You can use CanvasWrapper like this:

```javascript

// Instantiating a new CanvasWrapper object
var cw = new game.CanvasWrapper();
// this line creates a new CanvasWrapper object and sets the width and height of it.

// drawing
cw.drawDinosaur(200, 75);
// this line draws a dinosaur from point (200, 75)
// NOTE: the canvas coordinate system is a bit strange. Positive y values are actually negative, which means (200, 75) would be in Quadrant IV of the cartesian coordinate system.

// clearing the canvas
cw.clear();
// this line resets the canvas so that you can re-draw the positions of your game objects

```

Now, before you begin, there's something you should know about Canvases - the coordinate system is a little weird. Positive X's are right and negative X's are left, just like usual, but positive Y's are down, rather than up. This picture might describe it best for you:

<img src="http://media.creativebloq.futurecdn.net/sites/creativebloq.com/files/images/2013/05/Hannah/canvas1.jpg" />

So the bigger your Y value, the farther down you'll be!

---

## Dino Thunder

Alright, now we can get started! The first thing you're going to be doing is implement a `Dinosaur` class to contain the state and a few useful methods. Then you'll build `Obstacle` classes to make the game interesting! Finally, you'll build a `Game` Object to tie everything together.

## 1. Jurassic Park

**Tasks**

1. Create an object that draws itself on the canvas using CanvasWrapper
1. Create a `jump` method on the Object that will make it 'jump' (set the position up) and then bring it back down
1. Create a function that updates and draws the game objects
1. At the end of this, you should have a game that draws your dinosaur at a certain position and responds to keyboard presses by jumping, and a simple event loop to update the object and draw it onscreen.

Up until now, you've been implementing things we've designed for you. However, now you have the freedom to make your own design choices. What kind of properties should our `Dinosaur` object have? Methods? Here are things we know for sure:

+ We want to track the `position` of the `Dinosaur`, so that we can draw it and determine if an obstacle has hit it
+ We want to write a `jump` mechanism so that the `Dinosaur` position changes vertically when that function is called

Additionally, we probably want to give `Dinosaur` a method to check if it is colliding with another object (an `Obstacle`). For simplicity, you can use a point-based collision model, in which two objects are colliding if they are at the exact same position or not that far away from each other.

Use your knowledge of getters and setter methods to make your life easier. For jumping, you don't have to worry about gravity and physics if you don't want to. Try to break it into two parts - `jumpStart` and `jumpEnd`, if it helps. The former should put the `Dinosaur` into the air, and the latter should bring it back down.

Remember the **Pythagorean Theorem**? Well, it [might be useful](http://strd6.com/2010/06/circular-collision-detection-in-javascript/) for comparing the distance between two points - just putting that out there.

Next, a game is nothing without its controller and its inputs. You can use `CanvasWrapper.prototype.callOnUp` to execute a function when it detects that the `UP` key has been pressed in the site.

This is how you use it:
 
```javascript

var cw = new CanvasWrapper(...)

// 'start listening' for a space
cw.callOnUp(funcion(){
	console.log("You pressed space!");
})

// Paste that into the console, then press `space` on the website and see what happens!
// You should see the log being shown in the console. It's kinda magical, frankly.

```

##### Event Loop

Now, there's one critical part of games that you need to know about as well: the `event loop`. No, this isn't another function or method, but rather a design pattern - a way to structure the programs you build to make them more **flexible** and/or more **suitable for a task**. An `event loop` is responsible for making sure your objects are updated regularly and re-drawn on screen.

In our case, I'm going to suggest you implement an `event loop` in the form of a function that can just be called over and over again, using `setInterval` or `requestAnimationFrame`.
 
```javascript

// create all the objects i need to work with
var me = new Robot();

// update them - positions, etc.
var update = function() {
	me.eat();
	me.doHorizons();
	me.eat();
	me.doHorizons();
	me.sleep();
};

// keep on chugging
setInterval(update, 1000*60*60*24);

```

Write your `Dinosaur` class in `dinosaur.js` and put your event loop under the `CanvasWrapper` code in `dinosaur_game.js`. Remember to put them in the `game` namespace, i.e. `game.Dinosaur = ...`

---

## 2. American Ninja

**Tasks**

1. Create an `Obstacle` object that always moves left
2. Implement a function that detects if the `Dinosaur` and the `Obstacle` have collided
3. By the end of this, you should have an `Obstacle` that is always moving left and drawn on the screen. When the obstacle moves off the screen, it should be brought back to the far right. When the obstacle and dinosaur have collided, print a message to the conole.

You're going to be designing an `Obstacle` class for the `Dinosaur` class to vault over. Let's start again by formulating what kinds of responsibilities the Obstacle class has:

+ For sure, it has to support continuous left-ward movement
+ You also want to probably bound it inside the canvas - that is, if it ever goes outside, bring it right back to where it started
+ Make sure its position is just as accessible as `Dinosaurs!` You're going to need to check to see if `Dinosaur` has collided with it, so being able to get the position is key

So, continuous movement seems a little tricky. Where do you think it should be handled? You can use 

Bounding is an interesting topic. If you think about it, is it _really_ Obstacle's responsibility? How do you 'bound' something? You need to know what the limits are so you can be corrected if you overshoot them, correct? But an `Obstacle` doesn't know about how big the game it is in. Where would be an apt place to constantly watch and handle repositioning and updating an Obstacle if it ever leaves the canvas?

Now a word about collisions: Since you should have two objects that will be colliding with each other here, what kind of interface should you build to detect that?
I suggest writing a method (something like `isCollidingWith(dino, obstacle)`) for either of the classes, that you can evaluate during the event loop to see if they are indeed colliding with each other.
You'll need to somehow get the position data from either of the classes into the other, so think about how you want to do that - do you want to pass in the entire object, or maybe just an (x, y) Array, or even separate x, y arguments? Any of these design choices are viable and it's up to you what you'd like to use.

Write the `Obstacle` class in `dinosaur.js`, and remember to include it in the game namespace.

## 3. Saw VIII

**Tasks**

1. Create a simple `Game` object to keep track of score and game state (in progress vs. over)
1. Make a function to instantiate and create all the game stuff.
1. When the player presses up for the first time, start the game.
1. Move all your event loop logic to the Game object
1. When the game is over, print a score that shows hows long the game has run.
1. Allow a player to restart the game by pressing up when the game is over.
1. Keep track of high scores, and when you beat the high score, draw a special message on the screen
1. By the end of this, you should have a fully-playable game that lets you start and restart it.
1. [Optional] Improve collision detcetion logic (instead of point-to-point comparisons, do [bounding boxes](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection))
1. [Optional] Improve jump animation by using physics 

Alright, we're almost there! It's been a while, but by now you should have something pretty decent running, with a moderately-sized event loop. 
To organize our event loop and really solidify our web game application, we're going to create a top-level game object to separate game state and global state and better organize our code.

Here's what we want our `Game` object to do:

+ Construct and instantiate everything you need for the game - `CanvasWrapper`, `Dinosaur`, etc. in a method - something like `initializeAndStartGame`.
  + This is probably where you want to repeatedly call the update loop too
+ Maintain the event loop - so do everything you were dong before with `update` function (or whatever you called), but instead do it within an `update` method in Game class
+ Let's start keeping track of score too! You'll need to initialize the score at the start of the game and update it during the event loop
+ Now, we also want the game to end. We want to call a method to write the text "Game Over" to the screen once a collision is detected.

To draw the text, you can use `CanvasWrapper.prototype.drawText`. However, you have to remember the update loop - you're going to be clearing the canvas very fast, so you probably wont see the text on the screen - unless you kept track of when a `gameOver` is and keep drawing the text afterwards.

Do your work in `dinosaur_game.js`, and remember to stop using your old update loop function when you create the game object's! Also, remember to put your `Game` object in the `game` namespace (a little confusing, but there won't be an issue - `game.Game = function() {...` is totally fine). 

# Resources

http://www.w3schools.com/jsref/met_win_setinterval.asp

https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
