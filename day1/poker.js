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
  var faces = 'JQKA';

  var p1_hand_same = 0;
  var p1_same = []
  for (var i=0;i<5;i++){ //hand1
  	var curr = hand1[i];
  	for (var j=i+1;j<5;j++){
  		if (hand1[j][0]==hand1[i][0]){
  			p1_hand_same++;
  			if (!p1_same.includes(hand1[i])){
  				p1_same.push(hand1[i]);
  			}
  			p1_same.push(hand1[j]);
  		}
  	}
  }


  var p2_hand_same = 0;
  var p2_same = [];
  for (var i=0;i<5;i++){ //hand2
  	var curr = hand2[i];
  	
  	for (var j=i+1;j<5;j++){
  		if (hand2[j][0]==hand2[i][0]){
  			p2_hand_same++;
  			if (!p2_same.includes(hand2[i])){
  				p2_same.push(hand2[i]);
  			}
  			p2_same.push(hand2[j]);
  		}
  	}
  }

	if (p1_same.length>p2_same.length){
		return 1;
	}
	else if (p2_same.length>p1_same.length){
		return 2;
	}

	if (p1_same.length==p2_same.length){
		var p1_value=0;
		if (p1_same[0][1]=='0'){
			p1_value=10;
		}
		else if (faces.indexOf(p1_same[0][0])== -1){
			p1_value=p1_same[0][0];
		}

		else if (faces.indexOf(p1_same[0][0])!= -1){
			if (p1_same[0][0]=='J'){
				p1_value=11;
			}
			else if (p1_same[0][0]=='Q'){
				p1_value=12;
			}
			else if (p1_same[0][0]=='K'){
				p1_value=13;
			}
			else if (p1_same[0][0]=='A'){
				p1_value=14;
			}
		}
		
		var p2_value = 0;
		if (p2_same[0][1]=='0'){
			p2_value=10;
		}
		

		else if (faces.indexOf(p2_same[0][0])== -1){

			p2_value=p2_same[0][0];
		}

		else if (faces.indexOf(p2_same[0][0])!= -1){
			if (p2_same[0][0]=='J'){
				p2_value=11;
			}
			else if (p2_same[0][0]=='Q'){
				p2_value=12;
			}
			else if (p2_same[0][0]=='K'){
				p2_value=13;
			}
			else if (p2_same[0][0]=='A'){
				p2_value=14;
			}
		}


		if (parseInt(p1_value)>parseInt(p2_value)){
			return 1;
		}
		else if (parseInt(p2_value)>parseInt(p1_value)){
			return 2;
		}
		else if (parseInt(p2_value)==parseInt(p1_value)){

		}

	}

	var p1_high = 0;
	var p2_high = 0;
	for (var i=0;i<5;i++){
		if (hand1[0][1]=='0'){
			p1_high=10;
		}

		if (faces.indexOf(hand1[0][0])== -1){
			p1_high = hand1[0][0];
		}

		else if (faces.indexOf(hand1[0][0])!= -1){
			if (p1_same[0][0]=='J'){
				p1_high=11;
			}
			else if (p1_same[0][0]=='Q'){
				p1_high=12;
			}
			else if (p1_same[0][0]=='K'){
				p1_high=13;
			}
			else if (p1_same[0][0]=='A'){
				p1_high=14;
			}
		}

		if (hand2[0][1]=='0'){
			p2_high=10;
		}

		if (faces.indexOf(hand2[0][0])== -1){
			p2_high = hand1[0][0];
		}

		else if (faces.indexOf(hand2[0][0])!= -1){
			if (p2_same[0][0]=='J'){
				p2_high=11;
			}
			else if (p2_same[0][0]=='Q'){
				p2_high=12;
			}
			else if (p2_same[0][0]=='K'){
				p2_high=13;
			}
			else if (p2_same[0][0]=='A'){
				p2_high=14;
			}
		}
	}
	if (p1_high>p2_high){
		return 1;
	}
	else if (p2_high > p1_high){
		return 2;
	}
	
}
