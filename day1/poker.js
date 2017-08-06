"use strict";

// Write a function that takes two poker hands and determines which hand is the
// winner. If the first hand is the winner, this function should return 1, if
// the second hand is the winner this function should return 2.
//
// Each hand is represented by an array of 5 strings, each string representing
// a card.  The the last letter of each card represents the suite, the
// remaining letters represent the number.  For example, 5H is the 5 of hearts,
// KS is the king of spades, 10D is the 10 of diamonds.
//
// Aces are represented by 'A', Kings by 'K', Queens by 'Q', and Jacks
// by 'J'.
//
// In the card game poker, a hand consists of five cards and are ranked, from
// lowest to highest, in the following way:
//
//   - High Card: Highest value card.
//   - One Pair: Two cards of the same value.
//   - Two Pairs: Two different pairs.
//   - Three of a Kind: Three cards of the same value.
//   - Straight: All cards are consecutive values.
//   - Flush: All cards of the same suit.
//   - Full House: Three of a kind and a pair.
//   - Four of a Kind: Four cards of the same value.
//   - Straight Flush: All cards are consecutive values of same suit.
//   - Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
//
// The cards are valued in the order:
// 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.
//
// If two players have the same ranked hands then the rank made up of the
// highest value wins; for example, a pair of eights beats a pair of fives (see
// example 1 below). But if two ranks tie, for example, both players have a
// pair of queens, then highest cards in each hand are compared (see example 4
// below); if the highest cards tie then the next highest cards are compared,
// and so on.
//
// ex. rankPokerHand(['5H', '5C', '6S', '7S', 'KD'], ['2C', '3S', '8S', '8D', '10D']) -> 2, Pair of 8 vs Pair of 5
//
// ex. rankPokerHand(['5D', '8C', '9S', 'JS', 'AC'], ['2C', '5C', '7D', '8S', 'QH']) -> 1, High card Ace vs High card Queen
//
// ex. rankPokerHand(['2D', '9C', 'AS', 'AH', 'AC'], ['3D', '6D', '7D', '10D', 'QD']) -> 2, 3 aces vs Diamond flush
//
// ex. rankPokerHand(['4D', '6S', '9H', 'QH', 'QC'] ['3D', '6D', '7H', 'QD', 'QS']) -> 1, Pair of Q with high 9, Pair of Q with high 7
//
// ex. rankPokerHand(['2H', '2D', '4C', '4D', '4S'], ['3C', '3D', '3S', '9S', '9D']) -> 1, Full house with 3 4s, Full house with 3 3s
window.rankPokerHand = function(hand1, hand2) {
  // YOUR CODE HERE
  var suit1 = [];
  var num1 = [];
  var suit2 = [];
  var num2 = [];

  for (var i = 0; i < hand1.length; i++) {

    if(hand1[i].length === 3){
    num1.push(10);
    suit1.push(hand1[i][2]);
  } else if (hand1[i][0] == "J"){ num1.push(11)
  suit1.push(hand1[i][1])}
  else if (hand1[i][0] == "Q") {
  num1.push(12)
suit1.push(hand1[i][1])}
  else if (hand1[i][0] == "K") {num1.push(13)
  suit1.push(hand1[i][1])}
  else if (hand1[i][0] == "A") {num1.push(14);
suit1.push(hand1[i][1])}
  else {
    num1.push(parseInt(hand1[i][0]));
    suit1.push(hand1[i][1]);
  }

  if(hand2[i].length === 3){
  num2.push(10);
  suit2.push(hand2[i][2]);
}else if (hand2[i][0] == "J") {num2.push(11);
  suit2.push(hand2[i][1])}
  else if (hand2[i][0] == "Q") {num2.push(12);
    suit2.push(hand2[i][1])}
  else if (hand2[i][0] == "K") {num2.push(13);
    suit2.push(hand2[i][1])}
  else if (hand2[i][0] == "A") {num2.push(14);
    suit2.push(hand2[i][1])}
  else{
  num2.push(parseInt(hand2[i][0]));
  suit2.push(hand2[i][1]);
  }

}

function Hand(numberArray, suitArray){
  this.suits = suitArray;
  this.numbers = numberArray;
}

var Hand1 = new Hand(num1, suit1);
var Hand2 = new Hand(num2, suit2);
//console.log(Hand1);
//console.log(Hand2);

var flush = function(Hand){
  var first = Hand.suits[0];
  for(var i = 1; i < Hand.suits.length; i++){
    if(Hand.suits[i] !== first){
      return false;
    }
  }

  return true;
};

var straight = function(Hand){
  var newStraight = Hand.numbers.slice();
  newStraight.sort(function(a,b){
    return a - b;
  })
  for(var i = 0; i < newStraight.length - 1; i++){
    if(newStraight[i] + 1 !== newStraight[i+1]){
      if(newStraight[4] === 14 && newStraight[3] === 5){
        return true;
      }
      return false;
    }
  }
  return true;
};

var fourKind = function(Hand) {
  var copy = Hand.numbers.slice();
  copy.sort(function(a,b){
    return a-b;
  });
  if (copy[0] == copy[3]) return copy[0];
  if (copy[1] == copy[4]) return copy[1];
  return -1;
};

var threeKind = function(Hand) {
  var copy = Hand.numbers.slice();
  copy.sort(function(a,b){
    return a-b;
  });
  for (var i = 0; i < copy.length-2; i++) {
    if (copy[i] == copy[i+2]) return copy[i];
  }
  return -1;
};

var highCard = function(Hand) {
  var copy = Hand.numbers.slice();
  copy.sort(function(a,b) {
    return a-b;
  });
  return copy[4];
};

var higherCard = function(first, sec) {
  var copy = first.numbers.slice();
  var copy2 = sec.numbers.slice();
  var compareFunction = function(a,b) {
    return b-a;
  };
  copy.sort(compareFunction);
  copy2.sort(compareFunction);
  for (var i = 0; i < copy.length; i++) {
    if (copy[i] > copy2[i]) return 1;
    else if (copy2[i] > copy[i]) return 2;
  }
  //if all equal what do
};

var pair = function(Hand) {
  var copy = Hand.numbers.slice();
  copy.sort(function(a,b) {
    return a-b;
  });
  if (fourKind(Hand) < 0 && threeKind(Hand) < 0) {
    for (var i = 0; i < copy.length-1;i++) {
    if (copy[i] == copy[i+1]) return copy[i];
  }
}
  if (threeKind(Hand) > 0) {
    var value = threeKind(Hand);
    //console.log(value);
    for (var i = 0; i < copy.length-1; i++) {
      if (copy[i] == copy[i+1] && copy[i] !== value) {
        //console.log(copy[i]);
        return copy[i];
      }
    }
  }
  return -1;
};


var twoPair = function(Hand) {
  var pair = -1;
  var copy = Hand.numbers.slice();
  copy.sort(function(a,b) {
    return a-b;
  });
  for (var i = 0; i < copy.length-1;i++) {
    if (copy[i] == copy[i+1]) {
      pair = copy[i];
      break;
    }
  }
  for (var j = i+1; j < copy.length-1;j++) {
    if (copy[j] == copy[j+1] && pair > 0 && pair > copy[j]) return [pair, copy[j]];
    else if (copy[j] == copy[j+1] && pair > 0) return [copy[j], pair];
  }
  return -1;
};

var fullHouse = function(Hand){
  //console.log(threeKind(Hand));
  //console.log(pair(Hand));
  if (threeKind(Hand) > 0 && pair(Hand) > 0) {
    return threeKind(Hand);
}
  return -1;
}

var straightFlush = function(Hand){
  return (flush(Hand) && straight(Hand));
}

var royalFlush = function(Hand) {
  return (straightFlush(Hand) && highCard(Hand) == 14);
};
//console.log(fullHouse(Hand1));
//console.log(fullHouse(Hand2));
//console.log(flush(Hand2));
//console.log(threeKind(Hand1));
//console.log(twoPair(Hand1));
//console.log(twoPair(Hand2));
//console.log(Hand1);
//console.log(Hand2);

if (royalFlush(Hand1)) return 1;
else if (royalFlush(Hand2)) return 2;
else if (straightFlush(Hand1) && !straightFlush(Hand2)) return 1;
else if (straightFlush(Hand2) && !straightFlush(Hand1)) return 2;
else if (fourKind(Hand1) > 0 && fourKind(Hand2) < 0) return 1;
else if (fourKind(Hand2) > 0 && fourKind(Hand1) < 0) return 2;
else if (fourKind(Hand1) > fourKind(Hand2)) return 1;
else if (fourKind(Hand2) > fourKind(Hand2)) return 2;
else if (fourKind(Hand1) > 0 && fourKind(Hand2) > 0 && fourKind(Hand1) === fourKind(Hand2)) {
 var test = function(Hand){
   var copy = Hand.numbers.slice();
   copy.sort(function(a,b){
     return a-b;
   })
  if(copy[0] === fourKind(Hand)){
    return copy[4];
  } else{
    return copy[0];
  }
 }

 if(test(Hand1) > test(Hand2)) return 1;
else if(test(Hand2) > test(Hand1)) return 2;

  }
else if (fullHouse(Hand1) > 0 && fullHouse(Hand2) < 0) return 1;
else if (fullHouse(Hand2) > 0 && fullHouse(Hand1) < 0) return 2;
else if (fullHouse(Hand1) > 0 && fullHouse(Hand2) > 0 && fullHouse(Hand1) > fullHouse(Hand2)) return 1;
else if (fullHouse(Hand1) > 0 && fullHouse(Hand2) > 0 && fullHouse(Hand2) > fullHouse(Hand1)) return 2;
else if(fullHouse(Hand1)> 0 && fullHouse(Hand2) > 0 && fullHouse(Hand1) === fullHouse(Hand2)){
  return higherCard(Hand1, Hand2);
}
else if (flush(Hand1) && !flush(Hand2)) return 1;
else if (flush(Hand2) && !flush(Hand1)) return 2;
else if (straight(Hand1) && !straight(Hand2)) return 2;
else if (straight(Hand2) && !straight(Hand1)) return 2;
else if (threeKind(Hand1) > 0 && threeKind(Hand2) < 0) return 1;
else if (threeKind(Hand2) > 0 && threeKind(Hand1) < 0) return 2;
else if(threeKind(Hand1)> 0 && threeKind(Hand2) > 0 && threeKind(Hand1) === threeKind(Hand2)){
  return higherCard(Hand1, Hand2);
}
else if (threeKind(Hand1) > threeKind(Hand2)) return 1;
else if (threeKind(Hand2) > threeKind(Hand2)) return 2;
else if (twoPair(Hand1) !== -1 && twoPair(Hand2) == -1) return 1;
else if (twoPair(Hand2) !== -1 && twoPair(Hand1) == -1) return 2;
else if (twoPair(Hand1) !== -1 && twoPair(Hand2) !== -1 && twoPair(Hand1)[0] > twoPair(Hand2)[0]) return 1;
else if (twoPair(Hand1) !== -1 && twoPair(Hand2) !== -1 && twoPair(Hand2)[0] > twoPair(Hand1)[0]) return 2;
else if (twoPair(Hand1) !== -1 && twoPair(Hand2) !== -1 && twoPair(Hand1)[0] == twoPair(Hand2)[0] && twoPair(Hand1)[1] > twoPair(Hand2)[1]) return 1;
else if (twoPair(Hand1) !== -1 && twoPair(Hand2) !== -1 && twoPair(Hand1)[0] == twoPair(Hand2)[0] && twoPair(Hand2)[1] > twoPair(Hand1)[1]) return 2;
else if (twoPair(Hand1) !== -1 && twoPair(Hand2) !== -1 && twoPair(Hand1)[0] == twoPair(Hand2)[0] && twoPair(Hand1)[1] == twoPair(Hand2)[1]) return higherCard(Hand1, Hand2);
else if (pair(Hand1) > 0 && pair(Hand2) < 0) return 1;
else if (pair(Hand2) > 0 && pair(Hand1) < 0) return 2;
else if (pair(Hand1) > 0 && pair(Hand2) > 0 && pair(Hand1) > pair(Hand2)) return 1;
else if (pair(Hand1) > 0 && pair(Hand2) > 0 && pair(Hand2) > pair(Hand1)) return 2;
else if (highCard(Hand1) > highCard(Hand2)) return 1;
else if (highCard(Hand2) > highCard(Hand1)) return 2;
else { return higherCard(Hand1, Hand2); }




};
