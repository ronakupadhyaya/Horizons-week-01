"use strict";

// Write a function that takes two poker hands determines which hand is the
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
// ex. rankPokerHand(['5H', '5C', '6S', '7S', 'KD'], ['2C', '3S', '8S', '8D', 'TD']) -> 2, Pair of 8 vs Pair of 5
//
// ex. rankPokerHand(['5D', '8C', '9S', 'JS', 'AC'], ['2C', '5C', '7D', '8S', 'QH']) -> 1, High card Ace vs High card Queen
//
// ex. rankPokerHand(['2D', '9C', 'AS', 'AH', 'AC'], ['3D', '6D', '7D', 'TD', 'QD']) -> 2, 3 aces vs Diamond flush
//
// ex. rankPokerHand(['4D', '6S', '9H', 'QH', 'QC'] ['3D', '6D', '7H', 'QD', 'QS']) -> 1, Pair of Q with high 9, Pair of Q with high 7
//
// ex. rankPokerHand(['2H', '2D', '4C', '4D', '4S'], ['3C', '3D', '3S', '9S', '9D']) -> 1, Full house with 3 4s, Full house with 3 3s
window.rankPokerHand = function(hand1, hand2) {
  var ranks = [getStraightFlush,
               getFour,
               getFullHouse,
               getFlush,
               getStraight,
               getThree,
               getTwoPair,
               getPair,
               getHighCard];

  var rank;
  var h1rank, h2rank;
  for (var i = 0; i < ranks.length; i++) {
    rank = ranks[i];
    h1rank = rank(hand1);
    h2rank = rank(hand2);
    var rankName = functionName(rank);
    console.log('Trying ranking', rankName);

    if (! h1rank && ! h2rank) {
      console.log('Neither hand has:', rankName);
      continue;
    }

    if (h1rank && ! h2rank) {
      console.log('Only hand 1 has %s, hand 1 wins', rankName);
      return 1;
    }

    if (! h1rank && h2rank) {
      console.log('Only hand 2 has %s, hand 2 wins', rankName);
      return 2;
    }

    if (h1rank && h2rank) {
      console.log('Both hands have %s. Hand 1 tie break: %o Hand 2 tie break: %o',
                  rankName, h1rank, h2rank);
      return compareHigh(h1rank, h2rank);
    }
  }

  throw new Error('Tie');
};

function functionName(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

// cards in increasing order
var cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function suite(card) {
  return card[card.length - 1];
}

function number(card) {
  return card.substring(0, card.length - 1);
}

// ex. compareStraightFlush(['KD', 'AD', '10D', 'JD', 'QD'], ['10S', 'KS', 'QS', 'JS', '9S']) -> 1, ace over king
// ex. compareStraightFlush(['KD', 'AD', '10S', 'JD', 'QD'], ['10S', 'KS', 'QS', 'JS', '9S']) -> 2, only 2 has straight flush
// ex. compareStraightFlush(['KD', 'AD', '10S', 'JD', 'QD'], ['10C', 'KS', 'QS', 'JS', '9S']) -> false, neither has straight flush
function compareStraightFlush(hand1, hand2) {
  hand1 = getStraightFlush(hand1);
  hand2 = getStraightFlush(hand2);

  if (! hand1 && ! hand2) {
    return false;
  }

  if (hand1 && hand2) {
    return compareHigh(hand1, hand2);
  }

  if (hand1) {
    return 1
  }
  return 2;
}

function getStraightFlush(hand) {
  var flush = getFlush(hand);
  var straight = getStraight(hand);
  if (flush && straight) {
    return straight;
  }
  return false;
}

// ex. compareFlush(['KD', '2D', '10D', 'JD', 'QD'], ['2S', 'KS', 'QS', 'AS', '9S']) -> 2, flush, ace over king
// ex. compareFlush(['KD', '2D', '10D', 'JD', 'QD'], ['2H', 'KS', 'AS', 'AS', '9S']) -> 1, 1 has flush
// ex. compareFlush(['KC', '2D', '10D', 'JD', 'QD'], ['2H', 'KS', 'AS', 'AS', '9S']) -> false, neither side has a flush
function compareFlush(hand1, hand2) {
  var flush1 = getFlush(hand1);
  var flush2 = getFlush(hand2);

  if (! flush1 && ! flush2) {
    return false;
  }

  if (flush1 && flush2) {
    return compareHigh(hand1, hand2);
  }

  if (flush1) {
    return 1
  }
  return 2;
}

function getFlush(hand) {
  return _.uniq(_.map(hand, suite)).length === 1;
}

// ex. compareFlush(['KD', '2D', '10D', 'JD', 'QD'], ['2S', 'KS', 'QS', 'AS', '9S']) -> 2, flush, ace over king
// ex. compareFlush(['KD', '2D', '10D', 'JD', 'QD'], ['2H', 'KS', 'AS', 'AS', '9S']) -> 1, 1 has flush
// ex. compareFlush(['KC', '2D', '10D', 'JD', 'QD'], ['2H', 'KS', 'AS', 'AS', '9S']) -> false, neither side has a flush
function compareStraight(hand1, hand2) {
  hand1 = getStraight(hand1);
  hand2 = getStraight(hand2);

  if (! hand1 && ! hand2) {
    return false;
  }

  if (hand1 && hand2) {
    return compareHigh(hand1, hand2);
  }

  if (hand1) {
    return 1
  }
  return 2;
}

function getStraight(hand) {
  // Get the number of each card
  hand = _.map(hand, number);
  // Sort numbers in increasing order
  hand = _.sortBy(hand, function(card) {
    return _.indexOf(cards, card);
  });

  // Convert hand and all cards to strings we can use .indexOf() to
  // find out if hand is is a subsequence (i.e. substring) of cards.
  hand = hand.join(',');
  var cardsStr = cards.join(',');
  if (cardsStr.indexOf(hand) > -1) {
    hand = hand.split(',');
    return [ hand[hand.length - 1] + 'S' ]; // add fake suite for comparison
  }
  return false;
}

function getCombo(n, hand) {
  var counts = _.countBy(_.map(hand, number), _.identity);

  var ret = _.pairs(counts).filter(function(item) {
    var k = item[0], v = item[1];
    return v === n;
  }).map(function(item) {
    return item[0] + 'S'; // add fake suite for comparison
  });

  return ret.length && ret;
}

// ex. comparePair(['KD', 'AS', '3A', '4A', '8A'], ['AD', 'AS', '9A', '4A', '8A']) -> 2, 2 has pair
// ex. comparePair(['AD', 'AS', '3A', '4A', '8A'], ['KD', 'KS', '3A', '4A', '8A']) -> 1, 1 has higher pair
// ex. comparePair(['AD', 'AS', '3A', '4A', '8A'], ['AD', 'AS', '9A', '4A', '8A']) -> 2, 9 kicker
// ex. comparePair(['KD', 'AS', '3A', '4A', '8A'], ['QD', 'AS', '9A', '4A', '8A']) -> false, neither has pair
function comparePair(hand1, hand2) {
  var pair1 = getCombo(2, hand1);
  var pair2 = getCombo(2, hand2);

  if (! pair1 && ! pair2) {
    return false;
  }

  if (pair1 && pair2) {
    var high1 = getCombo(1, pair1);
    var high2 = getCombo(1, pair2);
    var highPair = compareHigh(pair1, pair2);

    if (highPair) {
      return highPair;
    }

    var high1 = getCombo(1, hand1);
    var high2 = getCombo(1, hand2);
    return compareHigh(high1, high2);
  }

  if (pair1) {
    return 1
  }
  return 2;
}

function getThree(hand) {
  var ret = getCombo(3, hand);
  return ret.length && ret[0];
}

function getFour(hand) {
  var ret = getCombo(4, hand);
  return ret.length && ret[0];
}

function getTwoPair(hand) {
  var ret = getPair(hand);
  return ret.length === 2 && ret;
}

function getFullHouse(hand) {
  var pair = getPair(hand);
  var three = getThree(hand);
  if (pair.length && three) {
    return [three, pair[0]];
  }
}

// We rely on compareHigh to compare the two hands, so don't change anything.
function getHighCard(hand) {
  return hand;
}

// Compare two hands
function compareHigh(hand1, hand2) {
  if (hand1.length !== hand2.length) {
    throw new Error("Can't compare two hands that are not the same length.");
  }

  // Order hand in decreasing order
  function getHigh(hand) {
    hand = _.sortBy(hand, function(card) {
      return _.indexOf(cards, number(card)) * -1;
    });
    return hand;
  }

  function rank(card) {
    return _.indexOf(cards, number(card));
  }

  hand1 = getHigh(hand1);
  hand2 = getHigh(hand2);

  for (var i = 0; i < hand1.length; i ++) {
    var c1 = hand1[i], c2 = hand2[i];
    if (rank(c1) > rank(c2)) {
      return 1;
    }
    if (rank(c1) < rank(c2)) {
      return 2;
    }
  }

  return 0;
}
