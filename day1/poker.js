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

window.handEnum = {
  ONE_PAIR: 0,
  TWO_PAIR: 1,
  THREE_OF_A_KIND: 2,
  STRAIGHT: 3,
  FLUSH: 4,
  FULL_HOUSE: 5,
  FOUR_OF_A_KIND: 6,
  STRAIGHT_FLUSH: 7,
  ROYAL_FLUSH: 8
}

window.Card = function(value, suit){
  this.value = value;
  this.suit = suit;
}

window.result = function(value, high, pairnumber1, pairnumber2){
  this.value = value;
  this.high = high;
  this.pair1 = pairnumber1;
  this.pair2 = pairnumber2;
}


window.rankPokerHand = function(hand1, hand2) {
  //debugger;
  var res1 = window.determineHand(hand1);
  var res2 = window.determineHand(hand2);
  if(res1.value > res2.value){
    return 1;
  }else if (res2.value>res1.value){
    return 2;
  }else if(res1.value === res2.value){
    if (res1.pair1>res2.pair1){
      return 1;
    }else if (res2.pair1>res1.pair1){
      return 2;
    }else if (res1.pair2>res2.pair2){
      return 1;
    }else if (res2.pair2>res1.pair2){
      return 2;
    }else{
      if(res1.high > res2.high){
        return 1;
      }else if(res2.high > res1.high){
        return 2;
      }
    }
    if(res1.high > res2.high){
      return 1;
    }else if(res2.high > res1.high){
      return 2;
    }
  }
}

window.determineHand = function(hand){
  var cards = [];
  for(var i = 0; i < 5; i++){
    var value = hand[i].substring(0,hand[i].length-1);
    if(value === 'J'){
      value = 11;
    }else if (value === 'Q'){
      value = 12;
    }else if (value === 'K'){
      value = 13;
    }else if (value === 'A'){
      value = 14;
    }
    var suit = hand[i].charAt(hand[i].length-1);
    var card = new Card(value, suit);
    cards.push(card);
  }

  var flush = true;
  var high = 0;
  var s = cards[0].suit;
  for(var n = 0; n < 5; n++){
    if(cards[n].value > high){
      high = cards[n].value;
    }
    if(cards[n].suit != s){
      flush = false;
    }
  }

  var straight = false;
  for(var u = 0; u < 5; u++){
    if(cards[u].value === high - 1){
      for(var o = 0; o < 5; o++){
        if(cards[o].value === high - 2){
          for(var r = 0; r < 5; r++){
            if(cards[r].value === high - 3){
              for(var e = 0; e < 5; e++){
                if(cards[e].value === high - 4){
                  straight = true;
                }
              }
            }
          }
        }
      }
    }
  }

  if(flush && straight){
    if(high === 14){
      var res = new result(window.handEnum.ROYAL_FLUSH, 14, null, null);
      return res;
    } else {
      var res = new result(window.handEnum.STRAIGHT_FLUSH, high, null, null);
      return res;
    }
  } else if (straight){
    var res = new result(window.handEnum.STRAIGHT, high, null, null);
    return res;
  } else if (flush){
    var res = new result(window.handEnum.FLUSH, high, null, null);
    return res;
  }

  var match = cards[0].value;
  var matches = 1;
  for(var t = 1; t < 5; t++){
    if(cards[t].value === match){
      matches++;
    }
  }
  if(matches === 4){
    var res = new result(window.handEnum.FOUR_OF_A_KIND, high, match, null);
    return res;
  } else if (matches === 3){
    var other;
    var others = 1;
    for (var g = 0; g < 5; g++){
      if(cards[g].value != match){
        other = cards[g].value;
        for(var k = g + 1; k < 5; k++){
          if(cards[k].value === other){
            others++;
            break;
          }
        }
        break;
      }
    }

    if(others === 2){
      var res = new result(window.handEnum.FULL_HOUSE, high, match, other);
      return res;
    }else{
      var res = new result(window.handEnum.THREE_OF_A_KIND, high, match, null);
      return res;
    }
  }

  var values = [];
  var matched = [];
  for(var l = 0; l < 5; l++){
    var num = cards[l].value;
    var added = false;
    for(var v = 0; v < values.length; v++){
      if(num === values[v]){
        matched.push(num);
        added = true;
      }
    }
    if(!added){
      values.push(cards[l].value);
    }
  }

  if(values.length === 3){
    var res = new result(window.handEnum.TWO_PAIR, high, matched[0], matched[1]);
    return res;
  }else if(values.length === 4){
    var res = new result(window.handEnum.ONE_PAIR, high, match, null);
    return res;
  }

  return -1;

}
