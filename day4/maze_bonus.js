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

Maze.validDirections = ['up', 'down', 'left', 'right'];


Maze.prototype.getShortestPath = function() {


  try{
    var start = this.getStartPosition();
  } catch(thrownerror) {
    return [];
  }
  var visited = [];

  for(var i = 0; i<this.maze.length; i++){
    visited[i]=[];
    for(var j=0; j<this.maze[0].length; j++){
      visited[i][j]= false;
    }
  }
  var paths = [];
  for(var i = 0; i<this.maze.length; i++){
    paths[i]=[];
    for(var j=0; j<this.maze[0].length; j++){
      paths[i][j]= [];
    }
  }
  var q = [start];
  visited[start[0]][start[1]] = true;

  while(q.length>0){
    var current = q.shift();
    if(this.maze[current[0]][current[1]] === "E"){
      return paths[current[0]][current[1]];
    }else if(this.maze[current[0]][current[1]] === "X"){
      continue;
    }

    for(var i = 0; i< Maze.validDirections.length; i++){
      var trydir = this.tryMove(current[0],current[1],Maze.validDirections[i]);
      if(trydir && !visited[trydir[0]][trydir[1]]){
        // console.log("hey");

        paths[trydir[0]][trydir[1]] = paths[current[0]][current[1]];
        paths[trydir[0]][trydir[1]].push(Maze.validDirections[i]);
        // if(!visited[trydir[0]][trydir[1]]){
        q.push(trydir);
        visited[trydir[0]][trydir[1]] = true;
      }
    }
  }


  return [];

}


// Maze.prototype.getShortestPath = function(){
//   if(!this.isSolvable()){
//     return [];
//   }
//
//   try{
//     var start = this.getStartPosition();
//     //console.log(start);
//   } catch(thrownerror) {
//     //console.log("invalid starting position", thrownerror);
//     return [];
//   }
//
//   var height = this.maze.length;
//   var width = this.maze[0].length;
//   var histArray = [];
//   for (var row = 0; row < height; row++) {
//     histArray[row] = [];
//     for (var col = 0; col < width; col++) {
//       histArray[row][col] = -1;
//       //console.log(mymaze[row][col]);
//     }
//   }
//   //console.log("inital array",histArray);
//   // console.log(histArray);
//   return this.bfs([],start,histArray);
// }
//
// Maze.prototype.bfs = function(visited,s,histArray){
//   var q = [];
//   q.push(s);
//   histArray[s[0]][s[1]] = ["start"];
//   //console.log(histArray[s[0]][s[1]]);
//   visited.push(s.toString());
//   //var hist = [];
//   var current;
//   while(q.length>0){
//     current = q.shift();
//     var currentval = this.maze[current[0]][current[1]];
//
//     if(currentval === "E"){
//       console.log("found end");
//       //console.log("hist array contents",histArray[current[0]][current[1]]);
//       //console.log(histArray);
//       histArray[current[0]][current[1]].shift()
//       //[current[0]][current[1]].shift();//["needpath"];
//
//       return histArray[current[0]][current[1]];
//     }else if(currentval === "X"){
//       continue;
//     }
//
//     for(var i = 0; i< Maze.validDirections.length; i++){
//
//       var dir = Maze.validDirections[i];
//       var trydir = this.tryMove(current[0],current[1],dir);
//       // if(!!trydir && histArray[trydir[0]][trydir[1]]!==-1 && histArray[current[0]][current[1]]!==-1){
//       //
//       //   histArray[trydir[0]][trydir[1]].push(dir);
//       //   if(histArray[trydir[0]][trydir[1]].length > histArray[current[0]][current[1]].length+1){
//       //     var temp = histArray[current[0]][current[1]];
//       //     temp.push(dir);
//       //     histArray[trydir[0]][trydir[1]] = temp;
//       //   }
//       //
//       //   if(visited.indexOf(trydir.toString())===-1){
//       //     q.push(trydir);
//       //     visited.push(trydir.toString());
//       //   }
//       // } else
//       if(!! trydir){//} && visited.indexOf(trydir.toString())===-1){
//         if(histArray[trydir[0]][trydir[1]]!==-1 && histArray[current[0]][current[1]]!==-1){
//           console.log("current dir",dir);
//           //console.log("trydir histarray",histArray[trydir[0]][trydir[1]]);
//           console.log("current histarray",histArray[current[0]][current[1]]);
//           //histArray[trydir[0]][trydir[1]].push(dir);
//           if(histArray[trydir[0]][trydir[1]].length >= histArray[current[0]][current[1]].length+1){
//             console.log("hihi");
//             var temp = histArray[current[0]][current[1]];
//             temp.push(dir);
//             histArray[trydir[0]][trydir[1]] = temp;
//           }
//
//         // var existinglist = histArray[trydir[0]][trydir[1]];
//         // if(existinglist!==-1 && existinglist.length>=1){
//         //
//         //   if(existinglist.length<=histArray[current[0]][current[1]].length+1){
//         //     //console.log("current histarray before replace",histArray[current[0]][current[1]]);
//         //     histArray[trydir[0]][trydir[1]].push(dir);
//         //     //console.log("replacing hist array with shorter one",histArray[trydir[0]][trydir[1]]);
//         //   }
//         } else {//if(histArray[trydir[0]][trydir[1]]===-1){
//           histArray[trydir[0]][trydir[1]] = histArray[current[0]][current[1]];
//           histArray[trydir[0]][trydir[1]].push(dir);
//           //console.log("no history array found, adding dir",histArray[trydir[0]][trydir[1]]);//,histArray[current[0]][current[1]]);
//         }
//         if(visited.indexOf(trydir.toString())===-1){
//           q.push(trydir);
//           visited.push(trydir.toString());
//         }
//       }
//     }
//
//   }
//   return [];
// }



//at a given node
// check if node E or X
// or if node is an empty space
  // examine valid up,down,right,left
  //add them to next list
