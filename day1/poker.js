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
window.rankPokerHand = function (hand1, hand2) {
  var val = ['2', '3', '4', '5', '6', '7', '8', '9', '1', 'J', 'Q', 'K', 'A'];
  var suits = ['D', 'C', 'H', 'S'];
  var hand1_val = [];
  var hand2_val = [];

  for (var i = 0; i < 5; i++) {
    var temp = 0;
    for (var k = 0; k < val.length; k++) {
      if (hand1[i][0] === val[k]) {
        temp += k * 10;
      }
    }
    for (var k = 0; k < suits.length; k++) {
      if (hand1[i][1] === suits[k]) {
        temp += k;
      }
    }
    hand1_val.push(temp);
  }

  for (var i = 0; i < 5; i++) {
    var temp = 0;
    for (var k = 0; k < val.length; k++) {
      if (hand2[i][0] === val[k]) {
        temp += k * 10;
      }
    }
    for (var k = 0; k < suits.length; k++) {
      if (hand2[i][1] === suits[k]) {
        temp += k;
      }
    }
    hand2_val.push(temp);
  }

  hand1_val.sort(function (a, b) {
    return a - b;
  })
  hand2_val.sort(function (a, b) {
    return a - b;
  })

  function scoreCalculator(hand) {
    //Find Pairs
    var score = [];
    var royal_straight = false;
    var values = [];
    hand.forEach(function (val) {
      values.push(Math.floor(val / 10));
    });
    score[1] = hand[4];

    //Check for sets of Value
    for (var i = 0; i < 4;) {
      if (values[i] === values[i + 1]) {
        //one pair
        if (values[i] === values[i + 2]) {
          //three of a kind
          if (values[i] === values[i + 3]) {
            //four of a kind
            score[0] += 10e8;
            score[1] = values[i];
            break;
          }
          score[0] += 10e5;
          score[1] = values[i];
          i += 3;
          continue;
        }
        score[0] += 10e2;
        score[1] = values[i];
        i += 2;
        continue;
      }
      i++;
    }


    //Check for Straight
    if (score === 0) {
      if (values[0] === values[1] - 1) {
        if (values[1] === values[2] - 1) {
          if (values[2] === values[3] - 1) {
            if (values[3] === values[4] - 1) {
              //straight
              score[0] += 10e6;
              score[1] = values[i];
              royal_straight = true;
            }
          }
        }
      }

      //Check for Flush
      if (hand[0] % 10 === hand[1] % 10) {
        if (hand[1] % 10 === hand[2] % 10) {
          if (hand[2] % 10 === hand[3] % 10) {
            if (hand[3] % 10 === hand[4] % 10) {
              //straight
              score[1] = values[i];
              score[0] += 10e6 + 1;
              if (royal_straight) {
                score[1] = values[i];
                score[0] = 20000;
              }
            }
          }
        }
      }
    }
    return score;
  }

  var score1 = scoreCalculator(hand1_val);
  var score2 = scoreCalculator(hand2_val);
  if (score1[0] === score2[0]) {
    if (score1[1] === score2[1]) {
      if (hand1_val[4] > hand2_val[4]) {
        return 1;
      }
      return 2;
    }
    if (score1[1] > score2[1]) {
      return 1;
    }
    return 2;
  }
  if (score1[0] > score2[0]) {
    return 1;
  }
  return 2;
}
