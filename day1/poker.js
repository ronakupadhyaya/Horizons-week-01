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
  var handValue1 = [];
  var handValue2 = [];
  var handSuit1 = [];
  var handSuit2 = [];
  var patternArr = ["High Card","One pair", "Two Pairs", "Three of a Kind", "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush", "Royal Flush"];
  var allValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  for (var i=0; i<hand1.length;i++) {
    handValue1[i] = hand1[i][0];
    handSuit1[i] = hand1[i][hand1[i].length-1];
  }
  for (var j=0; j<hand2.length;j++) {
    handValue2[j] = hand2[j][0];
    handSuit2[j] = hand2[j][hand2[j].length-1];
  }
  var person1 = {};
  var person2 = {};
  var repeat1 = window.countRep(handValue1);
  var repeat2 = window.countRep(handValue2);
  var patternObj1 = window.returnPatternValue(repeat1);
  var patternObj2 = window.returnPatternValue(repeat2);
  var pattern1 = window.determinePattern(patternObj1,handSuit1);
  var pattern2 = window.determinePattern(patternObj2,handSuit2);
  person1.pattern = patternArr[pattern1];
  person2.pattern = patternArr[pattern2];
  person1.maxValue = window.findHighestValue(repeat1,allValues);
  person2.maxValue = window.findHighestValue(repeat2,allValues);
  while (person1.maxValue === person2.maxValue) {
    delete repeat1[person1.maxValue];
    delete repeat2[person2.maxValue];
    person1.maxValue = window.findHighestValue(repeat1,allValues);
    person2.maxValue = window.findHighestValue(repeat2,allValues);
  }
  if (pattern1 < pattern2) {
    return 2;
  } else if (pattern1 > pattern2) {
    return 1;
  } else {
    if (allValues.indexOf(person1.maxValue) > allValues.indexOf(person2.maxValue) ) {
      return 1;
    } else {
      return 2;
    }
  }
}

window.determineFlush = function(arr) {
  for (var i=0; i<arr.length-1;i++) {
    if (arr[i+1] !== arr[i]) {
      return false;
    }
  }
  return true;
}

window.determinePattern = function(obj,arr) {
  var length = 0;
  for (var key in obj) {
    length++;
  }
  if (length === 0) {
    var isFlush = window.determineFlush(arr);
    if (isFlush) {
      return 5;
    } else {
      return 0;
    }
  } else if (length === 1) {
    if (Object.keys(obj).indexOf("2") !== -1) {
      if (obj[2] === 2) {
        return 2;
      } else {
        return 1;
      }
    } else if (Object.keys(obj).indexOf("3") !== -1) {
      return 3;
    } else {
      return 7;
    }
  } else {
    return 6;
  }
}

window.findHighestValue = function(obj,arr) {
  var patternMax = Object.keys(obj);
  var highestKey = patternMax[0];
  var highestValue = obj[highestKey];

  for (var j = 0; j<patternMax.length;j++) {
    var currentKey = patternMax[j];
    if (highestValue < obj[currentKey]) {
      highestValue = obj[currentKey];
      highestKey = patternMax[j];
    } else if (highestValue === obj[currentKey]) {
      if (arr.indexOf(highestKey.toString()) < arr.indexOf(patternMax[j].toString()) ) {
        highestKey = patternMax[j];
      }
    }
  }
  return highestKey;
}

window.returnPatternValue = function(obj) {
  var returnPattern = {};
  for (var key in obj) {
    if (obj[key] !== 1) {
      var repetition = obj[key];
      if (returnPattern[repetition] === undefined) {
        returnPattern[repetition] = 1;
      } else {
        returnPattern[repetition]++;
      }
    }
  }
  return returnPattern;
}

window.returnPatternAndValue = function(obj) {
  var maxRep = 1;
  var maxNum = 0;
  for (key in obj) {
    if (obj[key] > maxRep) {
      maxRep = obj[key];
      maxNum = key;
    }
  }
  var noPatternMax = Object.keys(obj);
  noPatternMax.filter(maxNum);
  for (var j = 0; j<noPatternMax.length;j++) {
    if (highestValue < noPatternMax[j]) {
      hightestValue = noPatternMax[j];
    }
  }
  var arr = [];
  arr.push(maxRep);
  arr.push(maxNum);
  arr.push(highestValue);
  return arr;
}

window.countRep = function(hand) {
  var numbersOfCard = {};
  var returnArr = [];
  var repeatTimes = 0;
  var repeatNumber = 0;
  for (var i=0; i<hand.length;i++) {
    if (numbersOfCard[hand[i]] === undefined) {
      numbersOfCard[hand[i]] = 1;
    } else {
      numbersOfCard[hand[i]]++;
    }
  }
  return numbersOfCard;
}
