
// Part 1
// extend arrays so that you use array.pad(item) which will
// pad the given array with the item if it isnt already padded
// with the item
// ex. [3,4,5].pad('e') -> ['e',3,4,5,'e']
// ex. [3,4,5].pad(3) -> [3,4,5,3]
// ex. [].pad(3) -> [3,3]
// ex. [3,'4',5].pad([3]) -> [[3],3,'4',5,[3]]
// ex. [1,2,1].pad(1) -> [1,2,1]

function addPadder() {
  Array.prototype.pad = function(input){
    if (this[0] !== input){
      this.unshift(input)

    }

    if (this[this.length-1] !== input){
       this.push(input);
    }

    if (this.length === 1){
      this.push (input);
    }

    return this;
  }
}
