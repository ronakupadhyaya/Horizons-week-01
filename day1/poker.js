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
//   - Straight: All cards are consecutive values. DONE
//   - Flush: All cards of the same suit. DONE
//   - Full House: Three of a kind and a pair. 
//   - Four of a Kind: Four cards of the same value.
//   - Straight Flush: All cards are consecutive values of same suit. DONE
//   - Royal Flush: Ten, Jack, Queen, King, Ace, in same suit. DONE
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
  var lookupTable = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
  }

  var contains = function(cardArray, searchFor){
    for(var i = 0; i < cardArray.length; i++){
      if(cardArray[i].indexOf(searchFor) !== -1){
        return cardArray[i][cardArray[i].length-1];
      }
    }
    return false;
  }

  var getValue = function(card){
    return card.substring(0, card.length-1);
  }

  var getSuit = function(card){
    return card.substring(card.length-1);
  }

  var handValue1 = 0;
  var handValue2 = 0;
  var winner = 0;

  var findHand = function(hand){
    //Royal Flush
    // if(contains(hand, "10") &&
    // contains(hand, "J") &&
    // contains(hand, "Q") &&
    // contains(hand, "K") &&
    // contains(hand, "A")) {
    //   //found a royal flush
    //   return [10, 0];
    // } else {
    var sortedHand = hand.sort(function compare(a, b) {
      var aSuit = getSuit(a);
      var aVal = getValue(a);
      var bSuit = getSuit(b);
      var bVal = getValue(b);

      if(lookupTable[aVal] > lookupTable[bVal]){
        return 1;
      } else if(lookupTable[aVal] < lookupTable[bVal]){
        return -1;
      } else {
        return 0;
      }
    });
    var firstVal = getValue(sortedHand[0]);
    firstVal = lookupTable[firstVal];
    var firstSuit = getSuit(sortedHand[0]);

    var isConsecutive = true;
    var isSameSuit = true;
    for (var i = 1; i < sortedHand.length; i++) {
      var tmp = getValue(sortedHand[i]);
      if (lookupTable[tmp] !== firstVal + i) {
        isConsecutive = false;
      }
      if (firstSuit !== getSuit(sortedHand[i])){
        isSameSuit = false;
      }
    }
    if (isConsecutive && isSameSuit && getValue(sortedHand[0]) === "10") {
      return [10, 0];
    } else if (isConsecutive && isSameSuit) {
      return [9, getValue(sortedHand[4]), getValue(sortedHand[3]),
        getValue(sortedHand[2]), getValue(sortedHand[1]),
        getValue(sortedHand[0])];
    } else if (getValue(sortedHand[0]) === getValue(sortedHand[3]) ||
    getValue(sortedHand[1]) === getValue(sortedHand[4])) {
      return [8, getValue(sortedHand[2]), getValue(sortedHand[4]),
        getValue(sortedHand[3]), getValue(sortedHand[1]),
        getValue(sortedHand[0])];
    } else if (getValue(sortedHand[0]) === getValue(sortedHand[2]) &&
    getValue(sortedHand[3]) === getValue(sortedHand[4]) ||
    getValue(sortedHand[0]) === getValue(sortedHand[1]) &&
    getValue(sortedHand[2]) === getValue(sortedHand[4])) {
      return [7, getValue(sortedHand[2]), getValue(sortedHand[4]),
        getValue(sortedHand[3]), getValue(sortedHand[1]),
        getValue(sortedHand[0])];
    } else if (isSameSuit) {
      return [6, getValue(sortedHand[4]), getValue(sortedHand[3]),
        getValue(sortedHand[2]), getValue(sortedHand[1]),
        getValue(sortedHand[0])];
    } else if (isConsecutive) {
      return [5, getValue(sortedHand[4]), getValue(sortedHand[3]),
        getValue(sortedHand[2]), getValue(sortedHand[1]),
        getValue(sortedHand[0])];
    } else if (getValue(sortedHand[0]) === getValue(sortedHand[2]) ||
    getValue(sortedHand[1]) === getValue(sortedHand[3]) ||
    getValue(sortedHand[2]) === getValue(sortedHand[4])) {
      return [4, getValue(sortedHand[2]), getValue(sortedHand[4]),
        getValue(sortedHand[3]), getValue(sortedHand[1]),
        getValue(sortedHand[0])];
    } else if (getValue(sortedHand[0]) === getValue(sortedHand[1]) &&
    getValue(sortedHand[2]) === getValue(sortedHand[3]) ||
    getValue(sortedHand[0]) === getValue(sortedHand[1]) &&
    getValue(sortedHand[3]) === getValue(sortedHand[4]) ||
    getValue(sortedHand[1]) === getValue(sortedHand[2]) &&
    getValue(sortedHand[3]) === getValue(sortedHand[4]) ||
    getValue(sortedHand[0]) === getValue(sortedHand[1]) &&
    getValue(sortedHand[3]) === getValue(sortedHand[4])) {
      return [3, getValue(sortedHand[3]), getValue(sortedHand[4]),
        getValue(sortedHand[2]), getValue(sortedHand[1]),
        getValue(sortedHand[0])];
    } else if (getValue(sortedHand[0]) === getValue(sortedHand[1])) {
      return [2, getValue(sortedHand[0]), getValue(sortedHand[4]),
        getValue(sortedHand[3]), getValue(sortedHand[2])];
    } else if (getValue(sortedHand[1]) === getValue(sortedHand[2])) {
      return [2, getValue(sortedHand[1]), getValue(sortedHand[4]),
        getValue(sortedHand[3]), getValue(sortedHand[0])];
    } else if (getValue(sortedHand[2]) === getValue(sortedHand[3])) {
      return [2, getValue(sortedHand[2]), getValue(sortedHand[4]),
        getValue(sortedHand[2]), getValue(sortedHand[0])];
    } else if (getValue(sortedHand[3]) === getValue(sortedHand[4])) {
      return [2, getValue(sortedHand[3]), getValue(sortedHand[2]),
        getValue(sortedHand[1]), getValue(sortedHand[0])];
    } else {
      return [1, getValue(sortedHand[4]), getValue(sortedHand[3]),
        getValue(sortedHand[2]), getValue(sortedHand[1]),
        getValue(sortedHand[0])];
    }
  }
  //type of hand

  handValue1 = findHand(hand1);
  handValue2 = findHand(hand2);

  if (handValue1[0] > handValue2[0]) {
    return 1;
  } else if (handValue1[0] < handValue2[0]) {
    return 2;
  } else {
    for(var i = 1; i < 6; i++){
      if(lookupTable[handValue1[i]] < lookupTable[handValue2[i]]){
        return 2;
      } else if(lookupTable[handValue1[i]] > lookupTable[handValue2[i]]){
        return 1;
      }
    }
  }
}
