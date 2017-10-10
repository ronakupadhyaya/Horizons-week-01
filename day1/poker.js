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
  // YOUR CODE HERE {Hearts, Clubs, Diamonds, Spades}
  // search for high card, pairs (single and double), triples, straights, etc.
  let [split1, split2] = [[], []]
  for (var i = 0; i < 5; i++) {
    const [last1, last2] = [hand1[i].length - 1, hand2[i].length - 1]
    split1.push( [hand1[i].slice(0, last1), hand1[i].slice(last1)] )
    split2.push( [hand2[i].slice(0, last2), hand2[i].slice(last2)] )
  }

  // v1: convert values to integers - switch case
  /* for (var i = 0; i < 5; i++) { */
  /*   switch (split1[i][0]) { */
  /*     case 'J': */
  /*       split1[i][0] = 11 */
  /*       break; */
  /*     case 'Q': */
  /*       split1[i][0] = 12 */
  /*       break; */
  /*     case 'K': */
  /*       split1[i][0] = 13 */
  /*       break; */
  /*     case 'A': */
  /*       split1[i][0] = 14 */
  /*       break; */
  /*   } */
  /*   split1[i][0] = parseInt(split1[i][0]) */
  /* } */
  /* for (var i = 0; i < 5; i++) { */
  /*   switch (split2[i][0]) { */
  /*     case 'J': */
  /*       split2[i][0] = 11 */
  /*       break; */
  /*     case 'Q': */
  /*       split2[i][0] = 12 */
  /*       break; */
  /*     case 'K': */
  /*       split2[i][0] = 13 */
  /*       break; */
  /*     case 'A': */
  /*       split2[i][0] = 14 */
  /*       break; */
  /*   } */
  /*   split2[i][0] = parseInt(split2[i][0]) */
  /* } */


  // v2: convert values to integers - ternary magic
  for (var i = 0; i < 5; i++) {
    split1[i][0] = 
        split1[i][0] === 'A' ? 14
      : split1[i][0] === 'K' ? 13
      : split1[i][0] === 'Q' ? 12
      : split1[i][0] === 'J' ? 11
      :                        parseInt(split1[i][0])
    split2[i][0] = 
        split2[i][0] === 'A' ? 14
      : split2[i][0] === 'K' ? 13
      : split2[i][0] === 'Q' ? 12
      : split2[i][0] === 'J' ? 11
      :                        parseInt(split2[i][0])
  }

  let [play1, play2] = [{}, {}]

  play1.sorted = split1.sort((a, b) => b[0] - a[0])
  play2.sorted = split2.sort((a, b) => b[0] - a[0])
  

  // not as useful as I thought - see last "Four of a Kind" with "9 kicker"
  /* play1.highCard = play1.sorted[0][0] */
  /* play2.highCard = play2.sorted[0][0] */

  let [count1, count2] = [{}, {}]
  play1.sorted.forEach((item) => count1[item[0]] = count1[item[0]] + 1 || 1)
  play2.sorted.forEach((item) => count2[item[0]] = count2[item[0]] + 1 || 1)

  /* console.log(count1, count2) */

  /* play1.pairs = [] */
  /* play2.pairs = [] */
  // ternary is not always betta
  /* for (var key in count1) { */
  /*   count1[key] === 4 ? play1.fourOfAKind = key */ 
  /*   : count1[key] === 3 ? play1.threeOfAKind = key */
  /*   : count1[key] === 2 ? */ 
  /*     play1.pairs ? = [...play1.pairs, key] : play1.pairs = [key] */
  /*   :                     null */
  /*   /1* console.log(key, count1[key]) *1/ */
  /* } */
  



  /* FOUROFAKIND THREEOFAKIND PAIRS *//* FOUROFAKIND THREEOFAKIND PAIRS *//* FOUROFAKIND THREEOFAKIND PAIRS */
  for (var key in count1) {
    if (count1[key] === 4)
      play1.fourOfAKind = key
    if (count1[key] === 3)
      play1.threeOfAKind = key
    if (count1[key] === 2)
      play1.pairs = play1.pairs ? [...play1.pairs, key] : [key]
  }

  for (var key in count2) {
    count2[key] === 4 ? play2.fourOfAKind = key 
    : count2[key] === 3 ? play2.threeOfAKind = key
    : count2[key] === 2 ? play2.pairs = play2.pairs ? [...play2.pairs, key] : [key]
    :                     null
  }

  /* console.log(play1, play2) */


  /* FLUSH *//* FLUSH *//* FLUSH *//* FLUSH */
  let ctr = 0
  let suit;
  for (var idx in play1.sorted) {
    if (!suit) suit = play1.sorted[idx][1]
    if (play1.sorted[idx][1] === suit) ctr++
    if (ctr === 5) play1.flush = true
  }

  ctr = 0
  suit = null;
  for (var idx in play2.sorted) {
    if (!suit) suit = play2.sorted[idx][1]
    if (play2.sorted[idx][1] === suit) ctr++
    if (ctr === 5) play2.flush = true
  }

  /* console.log(play1, play2) */

  /* STRAIGHT *//* STRAIGHT *//* STRAIGHT *//* STRAIGHT *//* STRAIGHT */

  var s1 = play1.sorted.reduce((acc, curr, idx) => {
    if (curr[0] === acc[0] - 1) {
      if (idx === 4) {
        play1.straight = true;
      }
    }
    return curr
  })

  var s2 = play2.sorted.reduce((acc, curr, idx) => {
    if (curr[0] === acc[0] - 1) {
      if (idx === 4) {
        play2.straight = true;
      }
    }
    return curr
  })


  /* console.log(play1, play2) */

  /* WINNER DETERMINATIONS *//* WINNER DETERMINATIONS *//* WINNER DETERMINATIONS */
  // Royal Flush

  const arr = ['index 0', play1, play2]

  let [high1, high2] = [play1.sorted[0][0], play2.sorted[0][0]]
  let winner;

  if (play1.straight && play1.flush || play2.straight && play2.flush) {
    if (play1.straight && play1.flush && play2.straight && play2.flush) {
      winner = high1 > high2 ? 1 : 2
    }
    else {
      winner = play1.straight && play1.flush ? 1 : 2
    }
  }
  
  if (play1.fourOfAKind || play2.fourOfAKind) {
    if (play1.fourOfAKind && play2.fourOfAKind) {
      winner = high1 > high2 ? 1 : 2
    }
    else {
      winner = play1.fourOfAKind ? 1 : 2
    }
  }

  if (play1.threeOfAKind || play2.threeOfAkind) {
    if (play1.threeOfAKind && play2.threeOfAkind) {
      if (play1.threeOfAKind === play2.threeOfAKind) {

      }
    }
  }

  console.log('winner', winner)

}
