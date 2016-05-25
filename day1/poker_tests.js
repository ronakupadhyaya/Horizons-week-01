"use strict";

describe("rankPokerHand()", function() {
  it("rankPokerHand(['5H', '5C', '6S', '7S', 'KD'], ['2C', '3S', '8S', '8D', 'TD']) -> 2, Pair of 8 vs Pair of 5", function() {
    expect(rankPokerHand(['5H', '5C', '6S', '7S', 'KD'], ['2C', '3S', '8S', '8D', 'TD']) ).toBe(2);
  });
  it("rankPokerHand(['5D', '8C', '9S', 'JS', 'AC'], ['2C', '5C', '7D', '8S', 'QH']) -> 1, High card Ace vs High card Queen", function() {
    expect(rankPokerHand(['5D', '8C', '9S', 'JS', 'AC'], ['2C', '5C', '7D', '8S', 'QH']) ).toBe(1);
  });
  it("rankPokerHand(['2D', '9C', 'AS', 'AH', 'AC'], ['3D', '6D', '7D', 'TD', 'QD']) -> 2, 3 aces vs Diamond flush", function() {
    expect(rankPokerHand(['2D', '9C', 'AS', 'AH', 'AC'], ['3D', '6D', '7D', 'TD', 'QD']) ).toBe(2);
  });
  it("rankPokerHand(['4D', '6S', '9H', 'QH', 'QC'] ['3D', '6D', '7H', 'QD', 'QS']) -> 1, Pair of Q with high 9, Pair of Q with high 7", function() {
    expect(rankPokerHand(['4D', '6S', '9H', 'QH', 'QC'] ['3D', '6D', '7H', 'QD', 'QS']) ).toBe(1);
  });
  it("rankPokerHand(['2H', '2D', '4C', '4D', '4S'], ['3C', '3D', '3S', '9S', '9D']) -> 1, Full house with 3 4s, Full house with 3 3s", function() {
    expect(rankPokerHand(['2H', '2D', '4C', '4D', '4S'], ['3C', '3D', '3S', '9S', '9D']) ).toBe(1);
  });
});

describe("compareStraightFlush()", function() {
  it("compareStraightFlush(['KD', 'AD', '10D', 'JD', 'QD'], ['10S', 'KS', 'QS', 'JS', '9S']) -> 1, ace over king", function() {
    expect(compareStraightFlush(['KD', 'AD', '10D', 'JD', 'QD'], ['10S', 'KS', 'QS', 'JS', '9S']) ).toBe(1);
  });
  it("compareStraightFlush(['KD', 'AD', '10S', 'JD', 'QD'], ['10S', 'KS', 'QS', 'JS', '9S']) -> 2, only 2 has straight flush", function() {
    expect(compareStraightFlush(['KD', 'AD', '10S', 'JD', 'QD'], ['10S', 'KS', 'QS', 'JS', '9S']) ).toBe(2);
  });
  it("compareStraightFlush(['KD', 'AD', '10S', 'JD', 'QD'], ['10C', 'KS', 'QS', 'JS', '9S']) -> false, neither has straight flush", function() {
    expect(compareStraightFlush(['KD', 'AD', '10S', 'JD', 'QD'], ['10C', 'KS', 'QS', 'JS', '9S']) ).toBe(false);
  });
});

describe("comparePair()", function() {
  it("comparePair(['KD', 'AS', '3H', '4H', '8H'], ['AD', 'AS', '9C', '4C', '8C']) -> 2, 2 has pair", function() {
    expect(comparePair(['KD', 'AS', '3H', '4H', '8H'], ['AD', 'AS', '9C', '4C', '8C']) ).toBe(2);
  });
  it("comparePair(['AD', 'AS', '3H', '4H', '8H'], ['KD', 'KS', '3C', '4C', '8C']) -> 1, 1 has higher pair", function() {
    expect(comparePair(['AD', 'AS', '3H', '4H', '8H'], ['KD', 'KS', '3C', '4C', '8C']) ).toBe(1);
  });
  it("comparePair(['AD', 'AS', '3H', '4H', '8H'], ['AD', 'AS', '9C', '4C', '8C']) -> 2, 9 kicker", function() {
    expect(comparePair(['AD', 'AS', '3H', '4H', '8H'], ['AD', 'AS', '9C', '4C', '8C']) ).toBe(2);
  });
  it("comparePair(['KD', 'AS', '3H', '4H', '8H'], ['QD', 'AS', '9C', '4C', '8C']) -> false, neither has pair", function() {
    expect(comparePair(['KD', 'AS', '3H', '4H', '8H'], ['QD', 'AS', '9C', '4C', '8C']) ).toBe(false);
  });
});

describe("compareFlush()", function() {
  it("compareFlush(['KD', '2D', '10D', 'JD', 'QD'], ['2S', 'KS', 'QS', 'AS', '9S']) -> 2, flush, ace over king", function() {
    expect(compareFlush(['KD', '2D', '10D', 'JD', 'QD'], ['2S', 'KS', 'QS', 'AS', '9S']) ).toBe(2);
  });
  it("compareFlush(['KD', '2D', '10D', 'JD', 'QD'], ['2H', 'KS', 'AS', 'AS', '9S']) -> 1, 1 has flush", function() {
    expect(compareFlush(['KD', '2D', '10D', 'JD', 'QD'], ['2H', 'KS', 'AS', 'AS', '9S']) ).toBe(1);
  });
  it("compareFlush(['KC', '2D', '10D', 'JD', 'QD'], ['2H', 'KS', 'AS', 'AS', '9S']) -> false, neither side has a flush", function() {
    expect(compareFlush(['KC', '2D', '10D', 'JD', 'QD'], ['2H', 'KS', 'AS', 'AS', '9S']) ).toBe(false);
  });
});

describe("compareStraight()", function() {
  it("compareStraight(['KC', 'AD', '10D', 'JD', 'QD'], ['10S', 'KH', 'QS', 'JS', '9S']) -> 1, ace over king", function() {
    expect(compareStraight(['KC', 'AD', '10D', 'JD', 'QD'], ['10S', 'KH', 'QS', 'JS', '9S']) ).toBe(1);
  });
  it("compareStraight(['KD', '2D', '10S', 'JD', 'QC'], ['10S', 'KH', 'QS', 'JS', '9S']) -> 2, only 2 has straight", function() {
    expect(compareStraight(['KD', '2D', '10S', 'JD', 'QC'], ['10S', 'KH', 'QS', 'JS', '9S']) ).toBe(2);
  });
  it("compareStraight(['KD', 'AD', '9S', 'JD', 'QC'], ['10C', '2H', 'QS', 'JS', '9S']) -> false, neither has straight", function() {
    expect(compareStraight(['KD', 'AD', '9S', 'JD', 'QC'], ['10C', '2H', 'QS', 'JS', '9S']) ).toBe(false);
  });
});

describe("compareFullHouse()", function() {
  it("compareFullHouse(['2S', '2D', '2C', 'AH', 'AS'], ['4D', 'AS', '4S', '5S', '5S']) -> 1, full house over 2 pair", function() {
    expect(compareFullHouse(['2S', '2D', '2C', 'AH', 'AS'], ['4D', 'AS', '4S', '5S', '5S']) ).toBe(1);
  });
  it("compareFullHouse(['2S', '2D', '2C', 'AH', 'AS'], ['4D', '4S', '4S', '5S', '5S']) -> 2, 4 over 2", function() {
    expect(compareFullHouse(['2S', '2D', '2C', 'AH', 'AS'], ['4D', '4S', '4S', '5S', '5S']) ).toBe(2);
  });
  it("compareFullHouse(['2S', '2D', '2C', 'AH', 'AS'], ['2D', '2S', '2S', '5S', '5S']) -> 1, ace over 5", function() {
    expect(compareFullHouse(['2S', '2D', '2C', 'AH', 'AS'], ['2D', '2S', '2S', '5S', '5S']) ).toBe(1);
  });
  it("compareFullHouse(['2S', '2D', '7C', 'AH', 'AS'], ['4D', 'AS', '4S', '5S', '5S']) -> false, neither has full house", function() {
    expect(compareFullHouse(['2S', '2D', '7C', 'AH', 'AS'], ['4D', 'AS', '4S', '5S', '5S']) ).toBe(false);
  });
});

describe("compareThree()", function() {
  it("compareThree(['KD', 'AS', 'AH', '4H', '8H'], ['AD', 'AS', '9C', 'AC', '8C']) -> 2, 2 has three of a kind", function() {
    expect(compareThree(['KD', 'AS', 'AH', '4H', '8H'], ['AD', 'AS', '9C', 'AC', '8C']) ).toBe(2);
  });
  it("compareThree(['AD', 'AS', 'AH', '4H', '8H'], ['KD', 'KS', 'KC', '4C', '8C']) -> 1, 1 has higher three of a kind", function() {
    expect(compareThree(['AD', 'AS', 'AH', '4H', '8H'], ['KD', 'KS', 'KC', '4C', '8C']) ).toBe(1);
  });
  it("compareThree(['AD', 'AS', '3H', 'AH', '8H'], ['AD', 'AS', '9C', '4C', 'AC']) -> 2, 9 kicker", function() {
    expect(compareThree(['AD', 'AS', '3H', 'AH', '8H'], ['AD', 'AS', '9C', '4C', 'AC']) ).toBe(2);
  });
  it("compareThree(['KD', 'AS', 'AH', '4H', '8H'], ['QD', 'AS', '9C', 'QC', '8C']) -> false, neither has three of a kind", function() {
    expect(compareThree(['KD', 'AS', 'AH', '4H', '8H'], ['QD', 'AS', '9C', 'QC', '8C']) ).toBe(false);
  });
});
