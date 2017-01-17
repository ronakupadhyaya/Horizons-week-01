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

  var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]

  // YOUR CODE HERE
  function getSuit(card) {
    card.substring(card.length - 1);
  }

  function getNumber(card) {
    return card.substring(0, card.length - 1);
  }

  function getHandType(hand) {
    //royal flush
    //check if all the same suit
    if (CheckSameSuit(hand) && CheckFlushCards(hand)) {
      return 9;
    } else if (CheckSameSuit(hand) && CheckConsecutiveValues(hand)) {
      return 8;    //straight flush
    } else if (Check)



  }









  function CheckSameSuit(hand) {
    for (var i = 0; i < hand.length; i++) {
      for (var j = 1; j < hand.length; j++) {
        if (hand[i] != hand[j]) {
          return false;
        }
      }
      return true;
    }
  }

  //check if 10, J, Q, K, A are in hand
  function CheckFlushCards(hand) {
    var cardArray = getCardArray(hand);
    if (cardArray.includes("10") &&
      cardArray.includes("J") &&
      cardArray.includes("Q") &&
      cardArray.includes("K") &&
      cardArray.includes("A")) {
      return true;
    }
    return false;
  }

  function CheckConsecutiveValues(hand) {
    var cardArray = getCardArray(hand);
    cardArray.sort();
    for (var i = 0; i < hand.length; i++) {

    }
  }

  function getHigh(hand) {
    hand.sort();
    return hand[hand.length - 1];
  }

  function getCardArray(hand) {
    var cardArray = [];

    for (var i = 0; i < hand.length; i++) {
      cardArray.push(getNumber(hand[i]));
    }
    return cardArray;
  }


}
