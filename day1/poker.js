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

//replace Jack, Queen, King, Ace
var replaceCards = function(hand) {
  for (var i=0; i < hand.length; i++) {
    if (hand[i][0] === "K") {
      hand[i] = hand[i].replace("K", "13");
    } else if (hand[i][0] === "A") {
      hand[i] = hand[i].replace("A", "14");
    } else if (hand[i][0] === "Q") {
      hand[i] = hand[i].replace("Q", "12");
    } else if (hand[i][0] === "J") {
      hand[i] = hand[i].replace("J", "11");
    }
  }
  return hand;
}

var sort_card = function(hand) {
  var res = [];
  while (hand.length > 0) {
    var min_ind = 0;
    for (var i=0; i < hand.length; i++) {
        if (Number(hand[i].substr(0, hand[i].length-1) < Number(hand[min_ind].substr(0, hand[min_ind].length-1)))) {
          min_ind = i;
        }
    }
    res.push(hand[min_ind]);
    hand.splice(min_ind, 1);
  }
  return res;
}

var same_suits = function(hand) {
  var tmp = hand[0][hand[0].length-1];
  for (var i=0;i < hand.length; i++) {
    if (tmp !== hand[i][hand[i].length-1]) {
      return false;
    }
  }
  return true;
}

var consecutive_num = function(hand) {
  var first = Number(hand[0].substr(0, hand[0].length-1));
  for (var i=1; i < hand.length; i++) {
    if (Number(hand[i].substr(0, hand[i].length-1)) !== (first + i)) {
      return false;
    }
  }
  return true;
}

var triple_or_false = function(hand) {
	// chcecks for four of a kind: location 0:3 and 1:4
  if ( Number(hand[0].substr(0, hand[0].length-1)) === Number(hand[3].substr(0, hand[3].length-1))) {
    return [5, Number(hand[2].substr(0, hand[2].length-1)), Number(hand[4].substr(0, hand[4].length-1))];
  } else if (Number(hand[1].substr(0, hand[1].length-1)) === Number(hand[4].substr(0, hand[4].length-1))) {
    return [5, Number(hand[2].substr(0, hand[2].length-1)), Number(hand[0].substr(0, hand[0].length-1))];
  }
  	//checks for triples
  for (var i = 0; i < 3; i++) {
    if (Number(hand[i].substr(0, hand[i].length-1)) === Number(hand[i+2].substr(0, hand[i].length-1))) {
      // checks for pairs at 3:4 as well for full house
      if (i === 0 && Number(hand[3].substr(0, hand[3].length-1)) === Number(hand[4].substr(0, hand[4].length-1))) {
        return [4, Number(hand[2].substr(0, hand[2].length-1)), Number(hand[3].substr(0, hand[3].length-1))];
      // checks for pairs at 0:1 as well for full house
      } else if (i === 2 && Number(hand[0].substr(0, hand[0].length-1)) === Number(hand[1].substr(0, hand[1].length-1))) {
        return [4, Number(hand[2].substr(0, hand[2].length-1)), Number(hand[0].substr(0, hand[0].length-1))];
      // only triples was found with no pairs
      } else {
        return [3, Number(hand[2].substr(0, hand[2].length-1)), Number(hand[4].substr(0, hand[4].length-1))];
      }
    }
  }
  return [0, 0, 0]
}



var pair_repeat = function(hand){
    var count = 0;
    var ind = 0;
    var sind = 0;
    for(var i = 0 ;i < hand.length-1 ; i++){
    	// checks for number of pairs
        if(Number(hand[i].substr(0,hand[i].length-1)) === Number(hand[i+1].substr(0,hand[i+1].length-1))){
            if (count == 0) {
            	// ind finds indicy of first pair
                ind = i;
            } else if (count == 1) {
            	// sind finds indicy of second pair
                sind = i;
            }
            count +=1
        }
    }

    // if 2 pairs are found
    if(count === 2){
        return [2, Number(hand[3].substr(0,hand[3].length-1)), Number(hand[sind].substr(0,hand[sind].length-1))]
    // specifies which index of pair location to find highest pair
    } else if (count === 1 && ind === 3) {
        return [1, Number(hand[ind].substr(0,hand[ind].length-1)), Number(hand[2].substr(0,hand[2].length-1))]
    } else if (count === 1 && ind !== 3) {
        return [1, Number(hand[ind].substr(0,hand[ind].length-1)), Number(hand[4].substr(0,hand[4].length-1))]
    } else {
        return [0, Number(hand[4].substr(0,hand[4].length-1)), Number(hand[3].substr(0,hand[3].length-1))];
    }
}



window.rankPokerHand = function(hand1, hand2) {
  // YOUR CODE HERE
  var new_hand1 = sort_card(replaceCards(hand1));
  var new_hand2 = sort_card(replaceCards(hand2));
  var both_hand = [new_hand1, new_hand2];
  var rank = [1, 1];
  var high_card = [1, 1];
  var second_high_card = [1,1];
  var flush_ind = 0;

  for (var i=0; i < both_hand.length; i++) {
    //check for royal flush
    // flush
    if (same_suits(both_hand[i]) === true) {
    	// straight flush
      if(consecutive_num(both_hand[i]) === true) {
      	// royal flush
        if (Number(both_hand[i][0].substr(0, both_hand[i][0].length-1) === 10)) {
          rank[i] = 10;
        } else {
          rank[i]= 9;
        }
      } else {
        rank[i] = 6;
      }
      // straight
    } else if (consecutive_num(both_hand[i]) === true) {
      rank[i] = 5;
    }
    high_card[i] = triple_or_false(both_hand[i])[1];
    second_high_card[i] = triple_or_false(both_hand[i])[2];
    
    if (triple_or_false(both_hand[i])[0] === 5) {
      rank[i] = 8;
    } else if (triple_or_false(both_hand[i])[0] === 4) {
      rank[i] = 7;
    } else if (triple_or_false(both_hand[i])[0] === 3) {
      rank[i] = 4;
    } else {
      high_card[i] = pair_repeat(both_hand[i])[1];
      second_high_card[i] = pair_repeat(both_hand[i])[2];
      if (pair_repeat(both_hand[i])[0] === 2) {
        rank[i] = 3;
      } else if (pair_repeat(both_hand[i])[0] === 1) {
        rank[i] = 2;
      }
    }
  }

  if (rank[0] > rank[1]) {
    return 1;
  } else if (rank[0] === rank[1] && high_card[0] > high_card[1]){
    return 1;
  } else if (rank[0] === rank[1] && high_card[0] === high_card[1] && second_high_card[0] > second_high_card[1]) {
    return 1;
  } else {
    return 2;
  }

}
