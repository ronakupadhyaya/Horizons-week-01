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
  var h1 = findRank(hand1);
  var h2 = findRank(hand2);
  if (h1 > h2) {
    return 1;
  }
  if (h2 > h1) {
    return 2;
  }
}

//returns an int 0-9 representing high card - royal flush
window.findRank = function(hand) {
  if (isFlush(hand)) {
    if (isStraight(hand)) {
      if (acquireNums(hand)[0] == 10) {
        return 9;
      } else {
        return 8;
      }
    } else {
      return 5;
    }
  }
  if (isStright(hand)) {
    return 4;
  }
}

// returns true if the hand contains all one suit
window.isFlush = function(hand) {
  var suits = acquireSuits(hand);
  return suits == 'CCCCC' || suits == 'SSSSS'
  || suits == 'DDDDD' || suits == 'HHHHH';
}

//returns true if hand contains consecutive numbers
window.isStraight = function(hand) {
  var nums = acquireNums(hand);
  var bool = true;
  while (nums.length > 1) {
    bool &= nums.shift() + 1 == nums[0];
  }
  return bool;
}

//returns an array of 5 numbers correlating to the hand
window.acquireNums = function(hand) {
  var output = [];
  hand.forEach(function(val) {
    switch (val.slice(0, 1)) {
      case 'J':
        output.push(11);
        break;
      case 'Q':
        output.push(12);
        break;
      case 'K':
        output.push(13);
        break;
      case 'A':
        output.push(14);
        break;
      default:
        output.push(parseInt(val, 10));
    }
  })
  output.sort(function(a, b) {
    return a - b;
  })
  return output;
}

// returns a string of length 5 that contains the suit for each card
window.acquireSuits = function(hand) {
  var output = ''
  hand.forEach(function(val) {
    output += val.slice(1);
  })
  return output;
}
