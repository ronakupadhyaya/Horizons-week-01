"use strict";

describe("stocks.gainAndLoss(data)", function() {
  var expected = {
    GOOG: -32.36,
    NFLX: 43.44,
    FB: -47.36,
    MSFT: -16.21,
    AMZN: 299.04,
    NVDA: 17.5
  };
  var actual = stocks.gainAndLoss(stockData);


  it("should return an object", function() {
    expect(actual).toEqual(jasmine.any(Object));
  });

  it("should have the companies in the dataset in the returned object", function() {
    var comps = _.sortBy(["GOOG", "AMZN", "FB", "NFLX", "MSFT", "NVDA"]);
    expect(_.sortBy(Object.keys(actual))).toEqual(comps);
  });

  it("should return the object with the correct data", function() {
    _.each(expected, function(v, k) {
      expect(v).toBeCloseTo(actual[k]);
    });
  })
});

describe("stocks.biggestGainer(data)", function() {
  it("should say the biggest gainer is AMZN", function() {
    expect(stocks.biggestGainer(stockData)).toEqual('AMZN');
  });
});

describe("stocks.biggestLoser(data)", function() {
  it("should say the biggest loser is FB", function() {
    expect(stocks.biggestLoser(stockData)).toEqual('FB');
  });
});

describe("stocks.widestTradingRange(data)", function() {
  it("should say the highest variance is AMZN", function() {
    expect(stocks.widestTradingRange(stockData)).toEqual('AMZN');
  });
});

describe("stocks.portfolioValue(data, date, ticker)", function() {
  it("stocks.portfolioValue(data, new Date('2016-06-30T00:00:00.000Z'), {NFLX: 1, GOOG: 0, FB: 0}) -> 144.21", function() {
    expect(stocks.portfolioValue(stockData, new Date('2016-06-30T00:00:00.000Z'), {NFLX: 1, GOOG: 0, FB: 0})).toBeCloseTo(144.21);
  });

  it("stocks.portfolioValue(data, new Date('2016-06-30T00:00:00.000Z'), {NFLX: 1, GOOG: 10}) -> 513.31", function() {
    expect(stocks.portfolioValue(stockData, new Date('2016-06-30T00:00:00.000Z'), {NFLX: 1, GOOG: 10})).toBeCloseTo(513.31);
  });

  it("stocks.portfolioValue(data, new Date('2016-06-10T00:00:00.000Z'), {NFLX: 0, AMZN: 0, GOOG: 0}) -> 0", function() {
    expect(stocks.portfolioValue(stockData, new Date('2016-06-10T00:00:00.000Z'), {NFLX: 0, AMZN: 0, GOOG: 0})).toBeCloseTo(0);
  });
});

describe("stocks.totalPortfolioGains(data)", function() {

  it("should return a number", function() {
    expect(stocks.totalPortfolioGains(stockData, 'GOOG')).toEqual(jasmine.any(Number));
  });
  it("stocks.totalPortfolioGains(data, 'GOOG') -> 9982.371482823233", function() {
    expect(stocks.totalPortfolioGains(stockData, 'GOOG')).toEqual(ans.GOOG[0]);
  });
  it("stocks.totalPortfolioGains(data, 'AMZN') -> 6497.906748663934", function() {
    expect(stocks.totalPortfolioGains(stockData, 'AMZN')).toEqual(ans.AMZN[0]);
  });
});
