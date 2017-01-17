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
// ex. rankPokerHand(['5H', '5C', '6S', '7S', 'KD'], ['2C', '3S',
// '8S', '8D', '10D']) -> 2, Pair of 8 vs Pair of 5
//
// ex. rankPokerHand(['5D', '8C', '9S', 'JS', 'AC'], ['2C', '5C',
//'7D', '8S', 'QH']) -> 1, High card Ace vs High card Queen
//
// ex. rankPokerHand(['2D', '9C', 'AS', 'AH', 'AC'], ['3D',
//'6D', '7D', '10D', 'QD']) -> 2, 3 aces vs Diamond flush
//
// ex. rankPokerHand(['4D', '6S', '9H', 'QH', 'QC'] ['3D',
//'6D', '7H', 'QD', 'QS']) -> 1, Pair of Q with high 9, Pair of Q with high 7
//
// ex. rankPokerHand(['2H', '2D', '4C', '4D', '4S'], ['3C', '3D',
//'3S', '9S', '9D']) -> 1, Full house with 3 4s, Full house with 3 3s
window.rankPokerHand = function(hand1, hand2) {
  // YOUR CODE HERE
  //hands
  var highCard = 1;
  var onePair = 10;
  var twoPair = 100;
  var threeOfAKind = 1e3;
  var straight = 1e4
  var flush = 1e5;
  var fullHouse = 1e6;
  var fourOfAKind = 1e7;
  var straightFlush = 1e8;
  var royalFlush = 1e9;

  var hand1Val = 1;
  var hand2Val = 1;
  var hand1NumbersObj = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0,
    "7": 0, "8": 0, "9": 0, "10": 0, "J": 0, "Q": 0, "K": 0, "A": 0};

  var hand1SuitsObj = {"H": 0, "D": 0, "C": 0, "S": 0};

  var hand2NumbersObj = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0,
    "7": 0, "8": 0, "9": 0, "10": 0, "J": 0, "Q": 0, "K": 0, "A": 0};

  var hand2SuitsObj = {"H": 0, "D": 0, "C": 0, "S": 0};

  for (var i = 0; i < hand1.length; i ++) {
    hand1NumbersObj[hand1[i][0]]++;

    hand1SuitsObj[hand1[i][hand1[i].length - 1]]++;
  }

  for (var i = 0; i < hand2.length; i ++) {
    hand2NumbersObj[hand2[i][0]]++;

    hand2SuitsObj[hand2[i][hand2[i].length - 1]]++;
  }

  var hand1Numbers = Object.values(hand1NumbersObj);
  var hand1Suits = Object.values(hand1SuitsObj);
  var hand2Numbers = Object.values(hand2NumbersObj);
  var hand2Suits = Object.values(hand2SuitsObj);

  console.log(hand2Suits);
  console.log(hand1Suits);
  /*for(var i = 0; i < hand1Numbers.length; i++) {
    if (hand1Numbers[i] === 2) {
      var hand1Val = onePair * (i + 1);
    } else var hand1Val = 0;
  }
  var hand2Numbers = Object.values(hand2Numbers);
  var hand2Suits = Object.values(hand2Suits);

  for(var i = 0; i < hand1Numbers.length; i++) {
    if (hand2Numbers[i] === 2) {
      var hand2Val = onePair * (i + 1);
    } else var hand2Val = 0;
  }
*/

  var checkPair = function(){
    if (hand1Numbers.indexOf(2) > 0) {

      hand1Val = onePair * (hand1Numbers.indexOf(2) + 1);

    }
    if (hand2Numbers.indexOf(2) > 0) {
      hand2Val = onePair * (hand2Numbers.indexOf(2) + 1);
    }
  }

  var checkTwoPair = function(){
    if (hand1Numbers.indexOf(2) > 0) {
      i = hand1Numbers.indexOf(2);
      if (hand1Numbers.indexOf(2, i + 1) > 0) {
        hand1Val = twoPair * hand1Numbers.indexOf(2, i + 1);

      }
    }
    if (hand2Numbers.indexOf(2) > 0) {
      i = hand2Numbers.indexOf(2);
      if (hand2Numbers.indexOf(2, i + 1) > 0) {
        hand2Val = twoPair * hand2Numbers.indexOf(2, i + 1);
      }
    }
  }
  var checkThreeOfKind = function(){
    if (hand1Numbers.indexOf(3) > 0) {
      hand1Val = threeOfAKind * (hand1Numbers.indexOf(3) + 1);

    }
    if (hand2Numbers.indexOf(3) > 0) {
      hand2Val = threeOfAKind * (hand2Numbers.indexOf(3) + 1);
    }
  }
  var checkStraight = function(){
    var straight1 = true;
    var index1 = hand1Numbers.indexOf(1);

    for (var i = index1; i < index1 + 5; i++){

      if (hand1Numbers[i] === 1){
        continue;
      } else straight1 = false;
      break;
    }
    if (straight1) {
      hand1Val = straight * (index + 4);
    }
    var straight2 = true;
    var index2 = hand1Numbers.indexOf(1);

    for (var i = index2; i < index2 + 5; i++){
      if (hand2Numbers[i] === 1){
        continue;
      } else straight2 = false;
      break;
    }
    if (straight2) {
      hand2Val = straight2 * (index + 4);
    }
  }

  var checkFlush = function(){

    if (hand1Suits.indexOf(5) > 0) {
      var cardsLeft = 5;
      while (cardsLeft > 0){
        for (var i = 0; i < hand1Numbers.length; i++){
          if (hand1Numbers[i] === 1){
            cardsLeft--;
            if (cardsLeft === 0){
              var highcard1 = i + 1;
            }
          }
        }
      }
      hand1Val = flush * highcard1;
    }
    if (hand2Suits.indexOf(5) > 0) {
      var cardsLeft = 5;
      while (cardsLeft > 0){
        for (var i = 0; i < hand2Numbers.length; i++){
          if (hand2Numbers[i] === 1){
            cardsLeft--;
            if (cardsLeft === 0){
              var highcard2 = i + 1;
            }
          }
        }
      }
      hand2Val = flush * highcard2;
    }
  }
  var checkFullHouse = function(){
    if (hand1Numbers.indexOf(2) > 0 && hand1Numbers.indexOf(3) > 0){
      hand1Val = fullHouse * (hand1Numbers.indexOf(3) + 1) + hand1Numbers.indexOf(2);
    }
    if (hand2Numbers.indexOf(2) > 0 && hand2Numbers.indexOf(3) > 0){
      hand2Val = fullHouse * (hand2Numbers.indexOf(3) + 1) + hand2Numbers.indexOf(2);
    }
  }
  console.log(hand1Numbers);
  console.log(hand2Numbers);
  var checkFourOfKind = function() {
    if (hand1Numbers.indexOf(4) > 0) {
      hand1Val = fourOfAKind * (hand1Numbers.indexOf(4) + 1);

    }
    if (hand2Numbers.indexOf(4) > 0) {
      hand2Val = fourOfAKind * (hand2Numbers.indexOf(4) + 1);

    }

  }

  checkPair();
  checkTwoPair();
  checkThreeOfKind();
  checkStraight();
  checkFlush();
  checkFullHouse();
  checkFourOfKind();




  console.log(hand1Val);
  console.log(hand2Val);
  if (hand1Val  > hand2Val  ){
    return 1
  } else if ( hand2Val > hand1Val){
    return 2
  } else {

  }

}
