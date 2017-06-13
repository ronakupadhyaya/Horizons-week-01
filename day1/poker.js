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

window.rankPokerHand = function(hand1, hand2) {
  var suit1 = window.suit(hand1);
  var num1 = window.replace(window.num(hand1)).sort(function(a, b) {
    return a - b;
  });
  var suit2 = window.suit(hand2);
  var num2 = window.replace(window.num(hand2)).sort(function(a, b) {
    return a - b;
  });

  if (window.royalFlush(num1, suit1) === true && window.royalFlush(num2, suit2) === true)
    return 0;
  if (window.royalFlush(num1, suit1) === true)
    return 1;
  if (window.royalFlush(num2, suit2) === true)
    return 2;

  if (window.straightFlush(num1, suit1) === true && window.straightFlush(num2, suit2) === true) {
    if (num1[4] > num2[4])
      return 1;
    else if (num1[4] < num2[4])
      return 2;
    else
      return 0;
  }
  if (window.straightFlush(num1, suit1) === true)
    return 1;
  if (window.straightFlush(num2, suit2) === true)
    return 2;

  if (window.fourOfAKind(num1) === true && window.fourOfAKind(num2) === true) {
    if (num1[4] > num2[4] || num1[0] > num2[0])
      return 1;
    else if (num2[4] > num1[4] || num2[0] > num1[0])
      return 2;
    else
      return 0;
  }
  if (window.fourOfAKind(num1) === true)
    return 1;
  if (window.fourOfAKind(num2) === true)
    return 2;

  if (window.fullhouse(num1) === true && window.fullhouse(num2) === true) {
    if (num1[2] > num2[2])
      return 1;
    else if (num1[2] < num2[2])
      return 2;
    else {
      if (num1[1] > num2[1] || num1[3] > num2[3])
        return 1;
      return 2;
    }
  }
  if (window.fullhouse(num1) === true)
    return 1;
  if (window.fullhouse(num2) === true)
    return 2;

  if (window.flush(suit1) === true && window.flush(suit2) === true) {
    for (var k = 4; k > 0; k--) {
      if (num1[k] > num2[k]) {
        return 1;
      }

      if (num1[k] < num2[k])
        return 2;
    }
    return 0;
  }
  if (window.flush(suit1) === true)
    return 1;

  if (window.flush(suit2) === true)
    return 2;

  if (window.straight(num1) === true && window.straight(num2) === true) {
    if (num1[4] > num2[4])
      return 1;
    else
      return 2;
  }
  if (window.straight(num1) === true)
    return 1;
  if (window.straight(num2) === true)
    return 2;

  if (window.threeOfAKind(num1) === true && window.threeOfAKind(num2) === true) {
    if (num1[2] > num2[2])
      return 1;
    else
      return 2;
  }
  if (window.threeOfAKind(num1) === true)
    return 1;
  if (window.threeOfAKind(num2) === true)
    return 2;

  var player1Card;
  var player2Card;

  if (window.twoPair(num1) === true && window.twoPair(num2) === true) {
    if (num1[3] > num2[3])
      return 1;
    else if (num1[3] < num2[3])
      return 2;
    else {
      if (num1[1] > num2[1])
        return 1;
      else if (num1[1] < num2[1])
        return 2;
      else {
        if (num1[0] > num2[0] || num1[2] > num2[2] || num1[4] > num2[4])
          return 1;
        return 2;
      }
    }
  }
  if (window.twoPair(num1) === true)
    return 1;
  if (window.twoPair(num2) === true)
    return 2;

  if (window.pair(num1) === true && window.pair(num2) === true) {
    if (num1[4] == num1[3])
      player1Card = num1[2];
    else
      player1Card = num1[4];
    if (num2[4] == num2[3])
      player2Card = num2[2];
    else
      player2Card = num2[4];

    if (player2Card > player1Card)
      return 2;
    if (player2Card < player1Card)
      return 1;
  }

  if (window.pair(num1) === true)
    return 1;
  if (window.pair(num2) === true)
    return 2;

  num1 = num1.sort(function(a, b) {
    return a - b;
  });

  num2 = num2.sort(function(a, b) {
    return a - b;
  });

  for (var k = 4; k >= 0; k--) {
    if (num1[k] > num2[k])
      return 1;
    if (num1[k] < num2[k])
      return 2;
  }
  return 0;
};

window.suit = function(hand) {
  var arr = [];
  for (var k = 0; k < hand.length; k++) {
    arr.push(hand[k].substring(hand[k].length - 1));
  }
  return arr;
};

window.num = function(hand) {
  var arr = [];
  for (var k = 0; k < hand.length; k++) {
    arr.push(hand[k].substring(0, hand[k].length - 1));
  }
  return arr;
};

window.replace = function(hand) {
  for (var k = 0; k < hand.length; k++) {
    if (hand[k] == 'J')
      hand[k] = 11;
    else if (hand[k] == 'Q')
      hand[k] = 12;
    else if (hand[k] == 'K')
      hand[k] = 13;
    else if (hand[k] == 'A')
      hand[k] = 14;
    else
      hand[k] = parseInt(hand[k]);
  }
  return hand;
};

window.royalFlush = function(hand, temp) {
  if (window.flush(temp) === true) {
    if (hand[0] == 10)
      if (hand[1] == 11)
        if (hand[2] == 12)
          if (hand[3] == 13)
            if (hand[4] == 14)
              return true;
  }
  return false;
};

window.straightFlush = function(hand, temp) {
  if (window.straight(hand) === true && window.flush(temp) === true)
    return true;
  return false;
};

window.fourOfAKind = function(hand) {
  var cnt = 0;
  for (var k = 1; k < hand.length; k++) {
    if (hand[0] == hand[k])
      cnt++;
  }
  if (cnt == 3)
    return true;

  cnt = 0;

  for (var k = 2; k < hand.length; k++) {
    if (hand[1] == hand[k])
      cnt++;
  }
  if (cnt == 3)
    return true;

  return false;
};

window.fullhouse = function(hand) {
  if (hand[0] == hand[2])
    if (hand[3] == hand[4])
      return true;
  if (hand[2] == hand[4])
    if (hand[0] == hand[1])
      return true;
  return false;
};

window.flush = function(hand) {
  if (hand[0] == hand[1])
    if (hand[1] == hand[2])
      if (hand[2] == hand[3])
        if (hand[3] == hand[4])
          return true;
  return false;
};

window.straight = function(hand) {
  var num = hand[0];
  for (var k = 1; k < hand.length; k++) {
    if (num + 1 == hand[k])
      num = hand[k];
    else
      return false;
  }
  return true;
};

window.threeOfAKind = function(hand) {
  var cnt = 0;
  for (var k = 1; k < hand.length; k++) {
    if (hand[0] == hand[k])
      cnt++;
  }
  if (cnt == 2)
    return true;

  cnt = 0;

  for (var k = 2; k < hand.length; k++) {
    if (hand[1] == hand[k])
      cnt++;
  }
  if (cnt == 2)
    return true;

  for (var k = 3; k < hand.length; k++) {
    if (hand[2] == hand[k])
      cnt++;
  }
  if (cnt == 2)
    return true;

  return false;
};

window.twoPair = function(hand) {
  var cnt = 0;
  var times = 0;
  for (var k = 1; k < hand.length; k++) {
    if (hand[0] == hand[k])
      cnt++;
  }
  if (cnt == 1)
    times++;

  cnt = 0;

  for (var k = 2; k < hand.length; k++) {
    if (hand[1] == hand[k])
      cnt++;
  }
  if (cnt == 1)
    times++;
  if (times == 2)
    return true;

  for (var k = 3; k < hand.length; k++) {
    if (hand[2] == hand[k])
      cnt++;
  }
  if (cnt == 1)
    times++;
  if (times == 2)
    return true;

  for (var k = 4; k < hand.length; k++) {
    if (hand[3] == hand[k])
      cnt++;
  }
  if (cnt == 1)
    times++;
  if (times == 2)
    return true;

  return false;
};

window.pair = function(hand) {
  var cnt = 0;
  for (var k = 1; k < hand.length; k++) {
    if (hand[0] == hand[k])
      cnt++;
  }
  if (cnt == 1)
    return true;

  cnt = 0;

  for (var k = 2; k < hand.length; k++) {
    if (hand[1] == hand[k])
      cnt++;
  }
  if (cnt == 1)
    return true;

  for (var k = 3; k < hand.length; k++) {
    if (hand[2] == hand[k])
      cnt++;
  }
  if (cnt == 1)
    return true;

  for (var k = 4; k < hand.length; k++) {
    if (hand[3] == hand[k])
      cnt++;
  }
  if (cnt == 1)
    return true;

  return false;
};

window.highCard = function(hand) {
  return hand[4];
};
