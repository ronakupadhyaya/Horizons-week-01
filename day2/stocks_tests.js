"use strict";
var ans = {
  "MSFT": [
    598.1629067169766,
    -496.44962268214647
  ],
  "NFLX": [
    1726.1701380307977,
    -1125.4095882724923
  ],
  "NVDA": [
    265.78877247700655,
    -385.9930718778983
  ],
  "AMZN": [
    6497.906748663934,
    -7837.375462256928
  ],
  "FB": [
    841.6178512506741,
    -851.7130028790667
  ],
  "GOOG": [
    9982.371482823233,
    -9443.41186187807
  ]
};

describe("stocks.biggestGainer(data)", function() {
  
  it("should return a string", function() {
    expect(stocks.biggestGainer(stockData)).toEqual(jasmine.any(String));
  });
  
  it("should return one of the given companies in the dataset", function() {
    var cos = ["GOOG", "AMZN", "FB", "NFLX", "MSFT", "NVDA"];
    expect(cos.indexOf(stocks.biggestGainer(stockData)) !== -1).toEqual(true);
  });
  
  it("should say the biggest gainer is Google", function() {
    expect(stocks.biggestGainer(stockData)).toEqual('GOOG');
  });
  
});

describe("stocks.biggestLoser(data)", function() {
  
  it("should return a string", function() {
    expect(stocks.biggestLoser(stockData)).toEqual(jasmine.any(String));
  });
  
  it("should return one of the given companies in the dataset", function() {
    var cos = ["GOOG", "AMZN", "FB", "NFLX", "MSFT", "NVDA"];
    expect(cos.indexOf(stocks.biggestLoser(stockData)) !== -1).toEqual(true);
  });
  
  it("should say the biggest loser is Google", function() {
    expect(stocks.biggestLoser(stockData)).toEqual('GOOG');
  });
  
});

describe("stocks.gainAndLoss(data)", function() {
  
  it("should return an object", function() {
    expect(stocks.gainAndLoss(stockData)).toEqual(jasmine.any(Object));
  });
  
  it("should have the companies in the dataset in the returned object", function() {
    var comps = ["GOOG", "AMZN", "FB", "NFLX", "MSFT", "NVDA"];
    for (var co in stocks.gainAndLoss(stockData)) {
      expect(comps.indexOf(co) != -1).toEqual(true);
    }
  });

  it("should return the object with the correct data", function() {
    expect(stocks.gainAndLoss(stockData)).toEqual(ans);
  })
  
});

describe("stocks.widestTradingRange(data)", function() {
  
  it("should return a string", function() {
    expect(stocks.widestTradingRange(stockData)).toEqual(jasmine.any(String));
  });
  
  it("should return one of the given companies in the dataset", function() {
    var cos = ["GOOG", "AMZN", "FB", "NFLX", "MSFT", "NVDA"];
    expect(cos.indexOf(stocks.widestTradingRange(stockData)) !== -1).toEqual(true);
  });
  
  it("should say the highest variance is Google", function() {
    expect(stocks.widestTradingRange(stockData)).toEqual('GOOG');
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
