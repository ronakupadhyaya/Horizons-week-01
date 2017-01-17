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
 // YOUR CODE HERE
var rankings = ['high card', 'one pair', 'two pairs', 'three of a kind', 'straight', 'flush', 'full house', 'four of a kind', 'straight flush' ]
//REPLACE FACE CARDS
  for(var i = 0; i < hand1.length; i++){
    hand1[i].replace('T', '10');
    hand2[i].replace('T','10');
    hand1[i].replace('J', '11');
    hand2[i].replace('J','11');
    hand1[i].replace('Q', '12');
    hand2[i].replace('Q','12');
    hand1[i].replace('K', '13');
    hand2[i].replace('K','13');
    hand1[i].replace('A', '14');
    hand2[i].replace('A','14');
  }

  function flush(hand){
    var suit = hand[0][hand[0].length-1];
    var flag = true;
    hand.forEach(function(item){
      if (item[item.length-1] !== suit){
        flag = false;
      }
    })
    if(flag){
      return hand[4];
    }
    return -1;

  }

  function straight(hand){
    var flag1 = true;
    var min = hand[0];
    for(var j = 1; j < hand.length; j++){
      if(hand[j] === min+1){
        min++
      } else{
        flag1 = false;
      }
    }
    if (flag1){
      return hand[4];
    }
    return -1;
  }

  function three_of_a_kind(hand){
    for (var i = 0; i < 3; i++){
      var count = 1;
      for (var j = i+1; j < hand.length; j++){
        if (hand[i] === hand[j]){
          count++;
          console.log(count);
        }
      }
      if (count ===3){
        return hand[i];
      }
    }
    return -1;
  }

  function four_of_a_kind(hand){
    for (var i = 0; i < 2; i++){
      var count = 1;
      for (var j = i+1; j < hand.length; j++){
        if (hand[i] === hand[j]){
          count++;
        }
      }
      if (count ===4){
        return hand[i];
      }
    }
    return -1;
  }

  function pair(hand){
    for (var i = 0; i < hand.length-1; i++){
      var count = 1;
      for (var j = i+1; j < hand.length; j++){
        if (hand[i] === hand[j]){
          count++;
        }
      }
      if (count ===2){
        return hand[i];
      }
    }
    return -1;
  }

  function two_pair(hand){
    var handCopy = hand.slice();
    var val = pair(handCopy);
    if(val){
      handCopy.splice(handCopy.indexOf(val), 2);
      return [val, pair(handCopy)];
    }
    else {
      return -1;
    }
  }
  // High Card: Highest value card.
  // One Pair: Two cards of the same value.
  // Two Pairs: Two different pairs.
  // Three of a Kind: Three cards of the same value.
  // Straight: All cards are consecutive values.
  // Flush: All cards of the same suit.
  // Full House: Three of a kind and a pair.
  // Four of a Kind: Four cards of the same value.
  // Straight Flush: All cards are consecutive values of same suit.
  // Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
  var flush_hand1 = flush(hand1);
  var flush_hand2 = flush(hand2);

  hand1.forEach(function(item){
    item = parseInt(item);
  });
  hand2.forEach(function(item){
    item = parseInt(item);
  });
  hand1.sort(function(a,b){
    return a-b;
  });
  hand2.sort(function(a,b){
    return a-b;
  })

  //Royal Flush
  if (flush_hand1 ===14 &straight(hand1)===14)
    return 1;
  else if (flush_hand2 ===14 && straight(hand2)===14)
    return 2;
  else{
    //Straight Flush
    if(flush_hand1 === straight(hand1) && flush_hand2 === straight(hand2)){
      if(flush_hand1 > flush_hand2){
        return 1;
      }
      else {
        return 2;
      }
    }
    else if(flush_hand1 === straight(hand1) && flush_hand2 !== straight(hand2)) {
      return 1;
    }
    else if(flush_hand2 === straight(hand2) && flush_hand1 !== straight(hand1)) {
      return 2;
    }
    else {
      //Four of a Kind
      if(four_of_a_kind(hand1) > four_of_a_kind(hand2)){
        return 1;
      }
      else if (four_of_a_kind(hand2) > four_of_a_kind(hand1)){
        return 2;
      }
      else{
        //Full House
        if(three_of_a_kind(hand1) && two_pair(hand1) && three_of_a_kind(hand2) && two_pair(hand2)){
          if(three_of_a_kind(hand1) > three_of_a_kind(hand2))
            return 1;
          else if(three_of_a_kind(hand2) > three_of_a_kind(hand1))
            return 2;
        }
        else if(three_of_a_kind(hand1) && two_pair(hand1) && !(three_of_a_kind(hand2) ===-1 || two_pair(hand2) ===-1)){
          return 1;
        }
        else if(three_of_a_kind(hand2) && two_pair(hand2) && !(three_of_a_kind(hand1) ===-1 || two_pair(hand1) ===-1)){
          return 2;
        }
        else{
          return 2;
        }

      }

    }

  }



  //
  // if (flush(hand1) > -1 && flush(hand2) > -1){
  //   if (flush(hand1) > flush(hand2)){
  //     if (straight())
  //   }
  // }


}
