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
window.sortByValue = function(arr) {
  arr.sort( function(a,b) {
    return a - b;
  });
  return arr;
};


window.determineRank = function(hand) {

  var ranks = {
    high_card : 1,
    one_pair : 2,
    two_pairs : 3,
    three_of_a_kind : 4,
    straight : 5,
    flush : 6,
    full_house : 7,
    four_of_a_kind : 8,
    straight_flush : 9,
    royal_flush : 10
  };


  var values = [];
  var suits = [];

  for (var i = 0; i < hand.length; i++) {
    if (hand[i].length === 3) {
      suits.push(hand[i][2]);
    }
    else {
      suits.push(hand[i][1]);
    }
    if (hand[i][0] === 'J') {
      values.push(11);
    }
    else if (hand[i][0] === 'Q') {
      values.push(12);
    }
    else if (hand[i][0] === 'K') {
      values.push(13);
    }
    else if (hand[i][0] === 'A') {
      values.push(14);
    }
    else {
      values.push(parseInt(hand[i][0]));
    }
  }


  var ord_vals = window.sortByValue(values);

  var is_flush = true;
  var is_straight = true;

  for (var i = 0; i < hand.length - 1; i++) {
    if ((ord_vals[i + 1] - ord_vals[i - 1]) !== 1) {
      is_straight = false;
    }
    if (suits[i] !== suits[i + 1]) {
      is_flush = false;
    }
  }

  var is_straight_flush = (is_flush && is_straight);

  var rank = 1;

  // Straights and Flushes check
  if (is_straight_flush) {
    if (9 > rank) {
      rank = 9
    }
    if (ord_vals[0] === 10) {
      if (10 > rank) {
        rank = 10
      }
    }
  }
  if (is_flush) {
    if (6 > rank) {
      rank = 6
    }
  }
  if (is_straight) {
    if (5 > rank) {
      rank = 5
    }
  }



  var composition = [];
  var highest_card = ord_vals[ord_vals.length - 1];

  // Finding Pairs
  var counts = {};

  for (var i = 0; i < hand.length; i++) {
    var card = ord_vals[i];
    if (card in counts) {
      counts[card] += 1;
    }
    else {
      counts[card] = 1;
    }
  }

  var keys = Object.keys(counts);

  var pairs = 0;
  var pair_type = [];

  for (var i = 0; i < keys.length; i++) {
    if (counts[keys[i]] === 4) {
      if (8 > rank) {
        rank = 8;
        composition.push(keys[i]);
      }
    }
    if (counts[keys[i]] === 3) {
      if (4 > rank) {
        rank = 4;
        composition.push(keys[i]);
      }
    }
    if (counts[keys[i]] === 2) {
      pairs++;
      composition.push(keys[i]);
    }
  }


  if (pairs === 2) {
    if (3 > rank) {
      rank = 3;
    }
  }

  if (pairs === 1) {
    if (2 > rank) {
      rank = 2;

      //console.log(composition, "here");
    }
  }

  if (rank === 1) {
    composition.push(highest_card.toString());
  }

  return [rank,composition,highest_card, ord_vals]
};

window.nextBreak = function(results,cards) {

  var rank = results[0];
  var composition = results[1];
  var highest_card = 0;

  if (rank > 0) {
    var inComp = function (item) {
      return (composition.indexOf(item.toString()) === -1);
    };
    var filtered = cards.filter(inComp);
    console.log(rank, cards, composition, filtered, "bet");
    var sorted = window.sortByValue(filtered);
    console.log(rank, sorted, "here");
    highest_card = sorted[sorted.length - 1];
  }
  return parseInt(highest_card);
};

window.breakTie = function(results1, results2, cards1, cards2) {

  var rank = results1[0];
  var comp1 = results1[1];
  var comp2 = results2[1];
  var highest_card1 = results1[2];
  var highest_card2 = results2[2];

  if (rank === 1) {
    //console.log(highest_card1, highest_card2, "yeet");
    if (highest_card1 > highest_card2) {
      return 1;
    }
    else if (highest_card2 > highest_card1) {
      return 2;
    }
    else {
      var next_high1 = window.nextBreak(results1, cards1);
      var next_high2 = window.nextBreak(results2, cards2);
      if (next_high1 > next_high2) {
        return 1;
      }
      else {
        return 2;
      }
    }

  }

  if (rank === 2 || rank === 3 || rank === 4 || rank === 8) {
    if (rank === 2) {
      //console.log(comp1, comp2);
    }
    var sum1 = 0;
    var sum2 = 0;
    for (var i=0; i <comp1.length; i++) {
      sum1 += parseInt(comp1[i]);
      sum2 += parseInt(comp2[i]);
    }
    if (sum1 > sum2) {
      return 1;
    }
    else if (sum1 < sum2) {
      return 2;
    }
    else {
      //console.log(rank, sum1, sum2, highest_card1, highest_card2, "yeet");
      var next_high1 = nextBreak(results1, cards1);
      var next_high2 = nextBreak(results2, cards2);

      console.log(rank, sum1, sum2, next_high1, next_high2, "yeet");
      if (next_high1 > next_high2) {
        return 1;
      }
      else {
        return 2;
      }

    }
  }

  if (rank === 6 || rank === 9 || rank === 10) {
    if (highest_card1 > highest_card2) {
      return 1;
    }
    else if (highest_card2 > highest_card1) {
      return 2;
    }
  }

  if (rank === 7) {
    var triple1 =  0;
    var triple2 = 0;

    for
  }


};


window.rankPokerHand = function(hand1, hand2) {
  var results1 = window.determineRank(hand1);
  var results2 = window.determineRank(hand2);

  var rank1 = results1[0];
  var rank2 = results2[0];

  var cards1 = results1[3];
  var cards2 = results2[3];

  //console.log(rank1, rank2, "bet");

  if (rank1 > rank2) {
    return 1;
  }
  else if (rank2 > rank1) {
    return 2;
  }
  else {
    return window.breakTie(results1, results2, cards1, cards2);
  }
};
