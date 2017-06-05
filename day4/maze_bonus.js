"use strict";

// Write a method (i.e. a function) that returns the shortest path through a
// maze. This function should return an array of strings containing 'right',
// 'left', 'up' or 'down'.  If there is no path through the maze it should
// return empty array.
//
// There may be multiple shortest paths in a maze, you only need to find one of
// them.
//
// ex. new Maze([['S', 'X', 'E']]).getShortestPath() -> [], not solvable
// ex. new Maze([['S', 'E']]).getShortestPath() -> ['right']
// ex. new Maze([['E', ' '], ['X', ' '], ['S', ' ']]).getShortestPath() -> ['right', 'up', 'up', 'left']
Maze.prototype.getShortestPath = function() {
  // YOUR CODE HERE



  // YOUR CODE HERE
  var maze = this.maze;
  var self = this;

  //handles unsolvable case
  if(!self.isSolvable()){
    return []
  }

  //stack that holds possible and visited
  var stack = []
  var visited = []
  for(var i = 0; i < maze.length; i++){
    visited[i] = []
    for(var j = 0; j < maze[i].length; j++){
      visited[i][j] = [-1,-1];
    }
  }

  //get current and end position
  var start = this.getStartPosition();
  var current = start;

  //console.log(current[0],current[1])
  var end = this.getEndPosition();


  //add all possible moves as long as they haven't been visited
  var directions = ['up','down','left','right']

  for(var i = 0; i < directions.length; i++){
    var att = self.tryMove(current[0] , current[1] , directions[i]);
    //if  it equals the end return true
    if(att && att[0] === end[0] && att[1] === end[1]){
      //console.log(directions[i])
      return [directions[i]]
    //otherwise if its not false just push it on stack
    }else if(att){
      visited[att[0]][att[1]] = [-3,-3]   //came from the start position
      stack.push(att)
    }
  }

  //mark the starting spot you just left as visited
  visited[current[0]][current[1]] = [-2,-2]

  var count = 0;

  //while the stack isn't empty
  while(stack.length !== 0){
    //pop something off the stack and make that your current
    current = stack.shift();

    //repeat the steps from above to add neighbors and mark current as visited
    for(var i = 0; i < directions.length; i++){
      var att = self.tryMove(current[0] , current[1] , directions[i]);
      //if  it equals the end return true
      if(att && att[0] === end[0] && att[1] === end[1]){
        //console.log(current[0],current[1])
        visited[att[0]][att[1]] = [current[0],current[1]]
        //console.log(end, start)
        return reversePath(end,start, visited)
        //return false
      //otherwise if its not false and it hasn't been visited just push it on stack
      }else if(att && _.isEqual(visited[att[0]][att[1]], [-1,-1]) ){
        //console.log(current[0],current[1])
        visited[att[0]][att[1]] = [current[0],current[1]]
        stack.push(att)
      }
    }

  }

  //console.log(visited)




  function reversePath(end, start, visited){

    var answer = []
    //console.log('hi')
    var cur = [end[0],end[1]]
    //console.log('hi')
    var prev = visited[cur[0]][cur[1]]
    //console.log('hi')

    while(  ! _.isEqual(prev, [-3,-3]) ){
      //debugger;
      if(  prev[0] === cur[0]-1 ){
        answer.push('down')
      }else if( prev[0] === cur[0] + 1 )  {
        //console.log('hi')
        answer.push('up')
      }else if( prev[1] === cur[1] - 1){
        answer.push('left')
      }else if ( prev[1] === cur[1] + 1){
        answer.push('right')
      }

      cur = [prev[0],prev[1]]
      //console.log(visited[cur[0]][cur[1]] )
      prev = visited[cur[0]][cur[1]]
      //console.log(prev)
      //break;
    }

    if( start[0] === cur[0]-1 ){
      answer.push('down')
    }else if( start[0] === cur[0]+1 )  {
      answer.push('up')
    }else if( start[1] === cur[1] - 1 ){
      answer.push('left')
    }else if ( start[1] === cur[1] + 1 ){
      answer.push('right')
    }

    return answer;

  }


}
