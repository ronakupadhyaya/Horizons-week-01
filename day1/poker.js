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

var cardRank = {
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
}
// function checkLargestCard(hand){
//   for(var i =0; i < hand.length; i++){
//     var maxCardInt = 0;
//     var maxCardLetter = '';
//     if (hand[i][0] !== 'K' || hand[i][0] !== 'Q' || hand[i][0] !== 'A' || hand[i][0] !== 'J') {
//       hand[i][0] = parseInt(hand[i][0]);
//     } else{
//       if(maxCardInt )
//     }
//   }
// }
// function checkFlush(hand, obj){
//
//   var countBool = 0;
//   for(var i =0; i < hand.length; i++){
//     if(hand[i][1] !== hand[i][1]){
//       countBool ++;
//     }
//   }
//   if(countBool ===0){
//
//   }
//   return obj;
// }


function checkPair(hand, obj){
  var placeholderArr = hand;
  var leftOverArr = [];
  var returnArr = [];
  for(var i=0; i < hand.length; i++){

    if(leftOverArr.indexOf(placeholderArr[i][0]) === -1){
      leftOverArr.push(placeholderArr[i][0]);
    } else{
      var number = placeholderArr[i].split('');
      returnArr.push(parseInt(number[0]));
    }
  }
  obj.pairs = returnArr;
  return obj;
}

function comparePair(hand1Obj, hand2Obj){
  debugger;
  if(hand1Obj.pairs.length > hand2Obj.pairs.length){
    return 1
  }
  if(hand2Obj.pairs.length > hand1Obj.pairs.length){
    return 2;
  }

  for(var i = 0; i<hand1Obj.pairs.length; i++){
    if(hand1Obj.pairs.length === 1){
      if(hand1Obj.pairs[0] > hand2Obj.pairs[0]){
        return 1;
      } else{
        return 2;
      }
    }  else{
      if(hand1Obj.pairs[1] > hand2Obj.pairs[1]){
        return 1;
      } else{
        return 2;
      }
    }
  }
}
window.rankPokerHand = function(hand1, hand2) {
  // YOUR CODE HERE
  var hand1Obj = {};
  var hand2Obj = {};

  var winner = comparePair(checkPair(hand1, hand1Obj), checkPair(hand2, hand2Obj));
  return winner;
}
