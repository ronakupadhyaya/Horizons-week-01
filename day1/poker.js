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
  // - High Card: Highest value card.
  // - One Pair: Two cards of the same value.
  // - Two Pairs: Two different pairs.
  // - Three of a Kind: Three cards of the same value.
  // - Straight: All cards are consecutive values.
  // - Flush: All cards of the same suit.
  // - Full House: Three of a kind and a pair.
  // - Four of a Kind: Four cards of the same value.
  // - Straight Flush: All cards are consecutive values of same suit.
  // - Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
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
  var rank1 = rankPokerHand.getHighestRank(hand1);
  var rank2 = rankPokerHand.getHighestRank(hand2);
  if (rank1 > rank2) return 1;
  else if (rank1 < rank2) return 2;

  var range1 = [];
  for (var i = 0; i < hand1.length; i++) {
   range1.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand1[i])]);
  }

  var range2 = [];
  for (var i = 0; i < hand2.length; i++) {
   range2.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand2[i])]);
  }

  if (rank1 == rank2 && rank1 == 10) return 0;
  if (rank1 == rank2 && rank1 == 9) return rankPokerHand.highCardWins(hand1, hand2);
  if (rank1 == rank2 && rank1 == 8) return rankPokerHand.fourOfAKindTie(hand1, hand2);
  if (rank1 == rank2 && rank1 == 7) return rankPokerHand.fullHouseTie(hand1, hand2);
  if (rank1 == rank2 && rank1 == 6) return rankPokerHand.highCardWins(hand1, hand2);
  if (rank1 == rank2 && rank1 == 5) return rankPokerHand.highCardWins(hand1, hand2);
  if (rank1 == rank2 && rank1 == 4) return rankPokerHand.threeOfAKindTie(hand1, hand2);
  if (rank1 == rank2 && rank1 == 3) return 0;
  if (rank1 == rank2 && rank1 == 2) return 0;
  if (rank1 == rank2 && rank1 == 1) return rankPokerHand.highCardWins(hand1, hand2)



}

rankPokerHand.getHighestRank = function(hand) {
  if (rankPokerHand.isRoyalFlush(hand)){
    return rankPokerHand.rankings["RoyalFlush"];
  }
  else if (rankPokerHand.isStraightFlush(hand)) {
    return rankPokerHand.rankings["StraightFlush"];
  }
  else if (rankPokerHand.isFourOfAKind(hand)) {
    return rankPokerHand.rankings["FourOfAKind"];
  }
  else if (rankPokerHand.isFullHouse(hand)) {
    return rankPokerHand.rankings["FullHouse"];
  }
  else if (rankPokerHand.isFlush(hand)) {
    return rankPokerHand.rankings["Flush"];
  }
  else if (rankPokerHand.isStraight(hand)) {
    return rankPokerHand.rankings["Straight"];
  }
  else if (rankPokerHand.isThreeOfAKind(hand)) {
    return rankPokerHand.rankings["ThreeOfAKind"];
  }
  else if (rankPokerHand.isTwoPairs(hand)) {
    return rankPokerHand.rankings["TwoPairs"];
  }
  else if (rankPokerHand.isTwoOfAKind(hand)) {
    return rankPokerHand.rankings["OnePair"];
  }
  else if (rankPokerHand.isHighCard(hand)) {
    return rankPokerHand.rankings["HighCard"];
  }
}

rankPokerHand.rankings = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  10: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,

  HighCard: 1,
  OnePair: 2,
  TwoPairs: 3,
  ThreeOfAKind: 4,
  Straight: 5,
  Flush: 6,
  FullHouse: 7,
  FourOfAKind: 8,
  StraightFlush: 9,
  RoyalFlush: 10

}

rankPokerHand.getSuit = function(card) {
  if (card.length == 2) {
    var index = 1;
  }
  else if (card.length == 3) {
    var index = 2;
  }
  return card[index];
}

rankPokerHand.getNumber = function(card) {
  if (card.length == 2) {
    var index = 1;
  }
  else if (card.length == 3) {
    var index = 2;
  }
  return card.slice(0,index);
}

rankPokerHand.getRange = function(hand) {
  var range = [];
  for (var i = 0; i < hand.length; i++) {
    range.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand[i])]);
  }
  return range;
}

rankPokerHand.removeCard = function(card, hand) {
  var result = [];
  for (var i = 0; i < hand.length; i++) {
    if (hand[i] != card) result.push(hand[i]);
  }
  return result;
}

rankPokerHand.getHighCard = function(hand) {
  var range = rankPokerHand.getRange(hand);
  return Math.max(...range);
}

rankPokerHand.getSecondHighCard = function(hand) {
  var range = rankPokerHand.getRange(hand);
  var highest = rankPokerHand.getHighCard(hand);
  var second = 0
  for (var i = 0; i < hand.length; i++) {
    if (hand[i] > second && hand[i] != highest) second = hand[i]
  }
}



rankPokerHand.highCardWins = function(hand1, hand2) {
  var high1 = rankPokerHand.getHighCard(hand1);
  var high2 = rankPokerHand.getHighCard(hand2);
  if (high1 > high2) return 1;
  else if (high1 < high2) return 2;

}

rankPokerHand.isRoyalFlush = function(hand) {
  if (! rankPokerHand.isFlush(hand)) {
    return false;
  }
  else if (! rankPokerHand.isStraight(hand)) {
    return false;
  }
  var hasAce = false;
  for (var i = 0; i < hand.length; i++) {
    if (rankPokerHand.getNumber(hand[i]) === "A") {
      hasAce = true;
    }
  }
  if (! hasAce) {
    return false;
  }
  return true;
}

rankPokerHand.isFlush = function(hand) {
  var suit = rankPokerHand.getSuit(hand[0]);
  for (var i = 1; i < hand.length; i++) {
    if (rankPokerHand.getSuit(hand[i]) !== suit) {
      return false;
    }
  }
  return true;
}

rankPokerHand.isStraight = function(hand) {
  var range = [];
  for (var i = 0; i < hand.length; i++) {
   range.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand[i])]);
  }

  if (Math.max(...range) - Math.min(...range) != 4) return false;
  return true;
}

rankPokerHand.isStraightFlush = function(hand) {
  if (! rankPokerHand.isStraight(hand) || ! rankPokerHand.isFlush(hand)) {
    return false;
  }
  return true;
}

rankPokerHand.isFullHouse = function(hand) {
  if (rankPokerHand.isFourOfAKind(hand)) return false;

  var range = [];
  for (var i = 0; i < hand.length; i++) {
   range.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand[i])]);
  }

  // count for 3
  var numberA = 0;
  for (var i = 0; i < range.length; i++) {
    var countLike = 0;
    for (var j = i; j < range.length; j++) {
      if (range[j] == range[i]) {
        countLike++;
      }
      if (countLike == 3) {
        numberA = range[i];
      }
    }
  }

  if (numberA == 0) return false;

  for (var i = 0; i < range.length; i++) {
    for (var j = i + 1; j < range.length; j++) {
      if ((range[j] == range[i]) && (range[i] != numberA)) {
        return true;
      }
    }
  }
}

rankPokerHand.isTwoPairs = function(hand) {
  if (rankPokerHand.isFourOfAKind(hand)) return false;
  if (rankPokerHand.isThreeOfAKind(hand)) return false;

  var range = [];
  for (var i = 0; i < hand.length; i++) {
   range.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand[i])]);
  }

  // count for 3
  var numberA = 0;
  for (var i = 0; i < range.length; i++) {
    var countLike = 0;
    for (var j = i; j < range.length; j++) {
      if (range[j] == range[i]) {
        countLike++;
      }
      if (countLike == 2) {
        numberA = range[i];
      }
    }
  }

  if (numberA == 0) return false;

  for (var i = 0; i < range.length; i++) {
    var countLike = 0;
    for (var j = i + 1; j < range.length; j++) {
      if ((range[j] == range[i]) && (range[i] != numberA)) {
        return true;
      }
    }
  }
}

rankPokerHand.isFourOfAKind = function(hand) {
  var range = [];
  for (var i = 0; i < hand.length; i++) {
   range.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand[i])]);
  }
  for (var i = 0; i < range.length; i++) {
    var countLike = 0;
    for (var j = i; j < range.length; j++) {
      if (range[j] == range[i]) {
        countLike++;
      }
      if (countLike == 4) {
        return true;
      }
    }
  }
  return false;
}

rankPokerHand.isThreeOfAKind = function(hand) {
  if (rankPokerHand.isFourOfAKind(hand)) return false;
  var range = [];
  for (var i = 0; i < hand.length; i++) {
   range.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand[i])]);
  }
  for (var i = 0; i < range.length; i++) {
    var countLike = 0;
    for (var j = i; j < range.length; j++) {
      if (range[j] == range[i]) {
        countLike++;
      }
      if (countLike == 3) {
        return true;
      }
    }
  }
  return false;
}

rankPokerHand.isTwoOfAKind = function(hand) {
  if (rankPokerHand.isFourOfAKind(hand)) return false;
  if (rankPokerHand.isThreeOfAKind(hand)) return false;
  var range = [];
  for (var i = 0; i < hand.length; i++) {
   range.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand[i])]);
  }
  for (var i = 0; i < range.length; i++) {
    var countLike = 0;
    for (var j = i; j < range.length; j++) {
      if (range[j] == range[i]) {
        countLike++;
      }
      if (countLike == 2) {
        return true;
      }
    }
  }
  return false;
}

rankPokerHand.isHighCard = function(hand) { return true }


rankPokerHand.fourOfAKindTie = function(hand1, hand2) {

  var range1 = [];
  for (var i = 0; i < hand1.length; i++) {
   range1.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand1[i])]);
  }
  var range2 = [];
  for (var i = 0; i < hand2.length; i++) {
   range2.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand2[i])]);
  }
  for (var i = 0; i < range1.length; i++) {
    for (var j = i + 1; j < range1.length; j++) {
      if (range1[i] == range1[j]) {
        var high1 = range1[i];
      }
    }
  }

  for (var i = 0; i < range2.length; i++) {
    for (var j = i + 1; j < range2.length; j++) {
      if (range2[i] == range2[j]) {
        var high2 = range2[i];
      }
    }
  }

  if (high1 > high2) return 1;
  else if (high1 < high2) return 2;

  for (var i = 0; i < range1.length; i++) {
    if (range1[i] != high1) {
      var catch1 = range1[i];
    }
  }

  for (var i = 0; i < range2.length; i++) {
    if (range2[i] != high2) {
      var catch2 = range2[i];
    }
  }

  if (catch1 < catch2) return 2;
  else if (catch1 > catch2) return 1;
  else return 0;
}

rankPokerHand.fullHouseTie = function(hand1, hand2) {

  var range1 = [];
  for (var i = 0; i < hand1.length; i++) {
   range1.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand1[i])]);
  }
  var range2 = [];
  for (var i = 0; i < hand2.length; i++) {
   range2.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand2[i])]);
  }

  var numberA = 0;
  for (var i = 0; i < range1.length; i++) {
    var countLike = 0;
    for (var j = i; j < range1.length; j++) {
      if (range1[j] == range1[i]) {
        countLike++;
      }
      if (countLike == 3) {
        numberA = range1[i];
      }
    }
  }

  var numberB = 0;
  for (var i = 0; i < range2.length; i++) {
    var countLike = 0;
    for (var j = i; j < range2.length; j++) {
      if (range2[j] == range2[i]) {
        countLike++;
      }
      if (countLike == 3) {
        numberB = range2[i];
      }
    }
  }
  if (numberA < numberB) return 2;
  else if (numberA > numberB) return 1;

  for (var i = 0; i < range1.length; i++) {
    if (range1[i] != numberA) {
      var catch1 = range1[i];
    }
  }

  for (var i = 0; i < range2.length; i++) {
    if (range2[i] != numberB) {
      var catch2 = range2[i];
    }
  }

  if (catch1 < catch2) return 2;
  else if (catch1 > catch2) return 1;
  else return 0;
}

rankPokerHand.threeOfAKindTie = function(hand1, hand2) {
  var range1 = [];
  for (var i = 0; i < hand1.length; i++) {
   range1.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand1[i])]);
  }
  var range2 = [];
  for (var i = 0; i < hand2.length; i++) {
   range2.push(rankPokerHand.rankings[rankPokerHand.getNumber(hand2[i])]);
  }

  var numberA = 0;
  for (var i = 0; i < range1.length; i++) {
    var countLike = 0;
    for (var j = i; j < range1.length; j++) {
      if (range1[j] == range1[i]) {
        countLike++;
      }
      if (countLike == 3) {
        numberA = range1[i];
      }
    }
  }

  var numberB = 0;
  for (var i = 0; i < range2.length; i++) {
    var countLike = 0;
    for (var j = i; j < range2.length; j++) {
      if (range2[j] == range2[i]) {
        countLike++;
      }
      if (countLike == 3) {
        numberB = range2[i];
      }
    }
  }

  if (numberA < numberB) return 2;
  else if (numberA > numberB) return 1;

  var catch1 = 0;
  var catch2 = 0;

  for (var i = 0; i < range1.length; i++) {
    if (range1[i] != numberA && range1[i] > catch1) catch1 = range1[i];
  }
  for (var i = 0; i < range2.length; i++) {
    if (range2[i] != numberB && range2[i] > catch2) catch2 = range2[i];
  }

  if (catch1 < catch2) return 2;
  else if (catch1 > catch2) return 1;

  var catch3 = 0;
  var catch4 = 0;

  for (var i = 0; i < range1.length; i++) {
    if (range1[i] != numberA && range1[i] != catch1) catch3 = range1[i];
  }
  for (var i = 0; i < range2.length; i++) {
    if (range2[i] != numberB && range2[i] != catch2) catch4 = range2[i];
  }

  if (catch3 < catch4) return 2;
  else if (catch3 > catch4) return 1;

}
