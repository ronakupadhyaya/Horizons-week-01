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

//variables for face cards
  var J = 11;
  var Q = 12;
  var K = 13;
  var A = 14;

  //replace face cards
  function replace(hand) {
    var updatedHand = [];
    for (var i = 0; i < hand.length; i++) {
      if (hand[i].charAt(0) === "J") {
        updatedHand.push("11" + hand[i].charAt(1));
      } else if (hand[i].charAt(0) === "Q"){
        updatedHand.push("12" + hand[i].charAt(1));
      } else if (hand[i].charAt(0) === "K") {
        updatedHand.push("13" + hand[i].charAt(1));
      } else if (hand[i].charAt(0) === "A") {
        updatedHand.push("14" + hand[i].charAt(1));
      } else if (hand[i].charAt(0) === "1" && hand[i].charAt(1) === "0"){
        updatedHand.push(hand[i]);
      } else {
        updatedHand.push("0" + hand[i]);
      }
    }
    return updatedHand;
  }
  //royal flush
  var royalFlush = function(hand) {
    var suit = hand[0].charAt(hand[0].length-1);
    for (var i = 0; i < 4; i++) {
      if (hand[i].charAt(hand[i].length-1) !== suit) {
        return false;
      }
    }
    var c = 0;
    for (var j = 0; j < 5; j++) {
      if (hand[j].charAt(0) === "1" && hand[j].charAt(1) === "0" || hand[j].charAt(0)
      === "J" || hand[j].charAt(0) === "Q" || hand[j].charAt(0) === "K" ||
      hand[j].charAt(0) === "A"){
        c++;
      }
    }
    return c === 5;
  }

  //straight flush
  var straightFlush = function(hand) {
    var suit = hand[0].charAt(hand[0].length-1);
    for (var i = 0; i < 5; i++) {
      if (hand[i].charAt(hand[i].length-1) !== suit) {
        return "a" + false;
      }
    }
    var sorted = replace(hand).sort();
    var smallest = sorted[0];
    for (var i = 1; i < sorted.length; i++) {
      if (sorted.indexOf("" + parseInt(smallest.charAt + i) + suit) === -1) {
        return false;
      }
    }
    return true;
  }

  //flush
  var flush = function(hand) {
    var suit = hand[0].charAt(hand[0].length-1);
    for (var i = 0; i < 4; i++) {
      if (hand[i].charAt(hand[i].length-1) !== suit) {
        return false;
      }
    }
    return true;
  }



}
