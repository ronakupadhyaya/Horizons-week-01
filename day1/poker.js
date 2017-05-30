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
window.rankings = {
	"High Card": 0,
	"One Pair": 1,
	"Two Pairs": 2,
	"Three of a Kind": 3,
	"Straight": 4,
	"Flush": 5,
	"Full House": 6,
	"Four of a Kind": 7,
	"Straight Flush": 8,
	"Royal Flush": 9
}

window.card_ranks = {
	"0": 0, 
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"10": 10,
	"J": 11,
	"Q": 12,
	"K": 13,
	"A": 14
}

var Hand = function Hand(type) {
	this.rank = type;
	this.precedence = hand;
};

var royal_flush = function(hand) {
	var suit = hand[0][hand[0].length -1];
	var exists = [false, false, false, false, false];
	for (var i = 0; i < hand.length; i++) {
		if (hand[i][hand[i].length - 1] !== suit) {
			return false;
		} else {
			switch (hand[i].slice(0,hand[i].length-1)) {
				case '10':
					exists[0] = true;
					break;
				case 'J':
					exists[1] = true;
					break;
				case 'Q':
					exists[2] = true;
					break;
				case 'K':
					exists[3] = true;
					break;
				case 'A':
					exists[4] = true;
					break;
				default:
					return false;
			}
		}
	}
	return !exists.includes(false);
};

var straight_flush = function(hand) {
	var suit = hand[0][hand[0].length-1];

	for (var i = 0; i < hand.length; i++) {
		if (hand[i][hand[i].length - 1] !== suit) {
			return false;
		}
	}

	hand.sort(function(c1, c2) {
		return window.card_ranks[c1.slice(0, c1.length - 1)] - window.card_ranks[c2.slice(0, c2.length - 1)];
	});

	for (var i = 0; i < hand.length - 1; i++) {
		if (window.card_ranks[(hand[i].slice(0, hand[i].length - 1))] + 1 !== 
			window.card_ranks[(hand[i + 1].slice(0, hand[i + 1].length - 1))]) {
			return false;
		}
	}
	return true;
}

var four_of_a_kind = function(hand) {
	var first = hand[0].slice(0, hand[0].length - 1);
	var second;
	var count1 = 0;
	var count2 = 0;
	for (var i = 0; i < hand.length; i++) {
		if (hand[i].slice(0, hand[i].length - 1) !== first) {
			second = hand[i].slice(0, hand[i].length - 1);
			break;
		}
	}

	for (var j = 0; j < hand.length; j++) {
		if (hand[j].slice(0, hand[j].length - 1) === first) {
			count1++;
		} else if (hand[j].slice(0, hand[j].length - 1) === second) {
			count2++;
		}
	}
	if (count1 === 4 || count2 === 4) {
		return true;
	} else {
		return false;
	}
}

var full_house = function(hand) {
	var first = hand[0].slice(0, hand[0].length - 1);
	var second;
	var count1 = 0;
	var count2 = 0;
	for (var i = 0; i < hand.length; i++) {
		if (hand[i].slice(0, hand[i].length - 1) !== first) {
			second = hand[i].slice(0, hand[i].length - 1);
			break;
		}
	}

	for (var j = 0; j < hand.length; j++) {
		if (hand[j].slice(0, hand[j].length - 1) === first) {
			count1++;
		} else if (hand[j].slice(0, hand[j].length - 1) === second) {
			count2++;
		}
	}

	if ((count1 === 3 && count2 === 2) || (count1 === 2 && count2 === 3)) {
		return true;
	} else {
		return false;
	}
}

var flush = function(hand) {
	var suit = hand[0][hand[0].length-1];

	for (var i = 0; i < hand.length; i++) {
		if (hand[i][hand[i].length - 1] !== suit) {
			return false;
		}
	}
	return true;
}

var straight = function(hand) {
	hand.sort(function(c1, c2) {
		return window.card_ranks[c1.slice(0, c1.length - 1)] - window.card_ranks[c2.slice(0, c2.length - 1)];
	});

	for (var i = 0; i < hand.length - 1; i++) {
		if (window.card_ranks[(hand[i].slice(0, hand[i].length - 1))] + 1 !== 
			window.card_ranks[(hand[i + 1].slice(0, hand[i + 1].length - 1))]) {
			return false;
		}
	}
	return true;
}

window.rankPokerHand = function(hand1, hand2) {
  	var highest_rank = function(hand) {
  		if (royal_flush(hand)) {
  			return "royal_flush";
  		} else if (straight_flush(hand)) {
  			return "straight_flush";
  		} else if (four_of_a_kind(hand)) {
  			return "four_of_a_kind";
  		} else if (full_house(hand)) {
  			return "full_house";
  		} else if (flush(hand)) {
  			return "flush";
  		} else if (straight(hand)) {
  			return "straight";
  		} else if (three_of_a_kind(hand)) {
  			return "three_of_a_kind";
  		} else if (two_pairs(hand)) {
  			return "two_pairs";
  		} else if (one_pair(hand)) {
  			return "one_pair";
  		} else if (high_card(hand)) {
  			return "high_card";
  		} else {
  			return false;
  		}
  	}
  	console.log(highest_rank(hand1));
}
