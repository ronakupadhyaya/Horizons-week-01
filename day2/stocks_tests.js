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

describe("stocks.totalPortfolioValue(data, ticker)", function() {

  it("should return a number", function() {
    expect(stocks.totalPortfolioValue(stockData, 'GOOG')).toEqual(jasmine.any(Number));
  });
  it("stocks.totalPortfolioValue(data, 'GOOG') should be between 538.94 and 538.96", function() {
    expect(stocks.totalPortfolioValue(stockData, 'GOOG') > 538.94 && stocks.totalPortfolioValue(stockData, 'GOOG') < 538.96).toBeTruthy();
  });
  it("stocks.totalPortfolioValue(data, 'AMZN') should be between -1339.44 and -1339.48", function() {
    expect(stocks.totalPortfolioValue(stockData, 'AMZN') < -1339.44 && stocks.totalPortfolioValue(stockData, 'AMZN') > -1339.48).toBeTruthy();
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
