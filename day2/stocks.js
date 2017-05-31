"use strict";

window.stocks = {};

// # Introduction
//
// You will be implementing several key functions for a stock analysis program.
// We are providing you with the data whose format is described in the next paragraph.
// You can view the data under data/transactions.js. Each function you implement
// will be tested with the data from that file.

// # Data
//
// The data that will be run through each function is an array of Transaction objects.
// Transaction objects have three properties: 'ticker', 'time' and 'price'.
// The 'ticker' property is the name of the company to which the transaction refers to.
// The 'time' property is the time of the transaction on 5/17/2016.
// The 'price' property is the price of the stock of 'ticker' at 'time'.
// You can access these properties the usual ways, like (assuming a given item is called `trans`):
// `var price = trans["price"];` or `var ticker = trans.ticker`
//
// So, the data's gonna look something like:
// var data = [ { "ticker": "MSFT", "time": "2016-05-17T11:02:20", "price": 22.83 }, ... ];


// Exercise 1. stocks.gainAndLoss(data)
//
// Write a function that calculates the total loss or gain for each ticker/company.
// This function should return an object with stock tickers as keys and the total
// gain or loss for the given stock as the values.
//
// Total gain or loss is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.gainAndLoss(data) -> {
//   GOOG: -32.36,
//   NFLX: 43.44,
//   FB: -47.36,
//   MSFT: -16.21,
//   AMZN: 299.04,
//   NVDA: 17.5
// }
stocks.gainAndLoss = function(data) {
  // YOUR CODE HERE
  var tickerlist={};

  var grouped= _.groupBy(data,function(stock){
    return stock.ticker;
  })

  for(var company in grouped){

    var co_array=grouped[company];

    var first_stock = _.min(co_array,function(stock){
      return new Date(stock.time).getTime();
    })
    var first_price=first_stock.price;

    var last_stock = _.max(co_array,function(stock){
      return new Date(stock.time).getTime();
    })
    var last_price=last_stock.price;

    tickerlist[company]=last_price-first_price;
  }
  return tickerlist;

};

// Exercise 2. stocks.biggestGainer(data)
//
// Write a function that finds the stock that went up in price the most
// in absolute terms (i.e. not percentage-wise) over the lifetime of
// the given data.
//
// Total gain is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.biggestGainer(stockData) -> 'AMZN'
//
// You can use stocks.gainAndLoss() in your answer.
stocks.biggestGainer = function(data) {
  // YOUR CODE HERE
  var tickerlist=stocks.gainAndLoss(data);
  //console.log(tickerlist)
  var maxco;
  var max=0;
  for(var co in tickerlist){
    if(max<tickerlist[co]){
      maxco=co;
      max=tickerlist[co];
    }
  }
  return maxco;
};

// Exercise 3. stocks.biggestLoser(data)
//
// Write a function that finds the stock that went up in price the most
// in absolute terms (i.e. not percentage-wise) over the lifetime of
// the given data.
//
// Total loss is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.biggestLoser(stockData) -> 'GOOG'
//
// You can use stocks.gainAndLoss() in your answer.
stocks.biggestLoser = function(data) {
  // YOUR CODE HERE
  var tickerlist=stocks.gainAndLoss(data);
  //console.log(tickerlist)
  var minco;
  var min=0;
  for(var co in tickerlist){
    if(min>tickerlist[co]){
      minco=co;
      min=tickerlist[co];
    }
  }
  return minco;
};

// Exercise 4. stocks.widestTradingRange(data)
//
// Write a function that finds the ticker of the stock with the widest trading
// range (biggest difference between the lowest and the highest stock price)
// over the lifetime of the given dataset.
//
// Example.
// stocks.widestTradingRange(data) -> 'AMZN'
stocks.widestTradingRange = function(data) {
  // YOUR CODE HERE
  var grouped= _.groupBy(data,function(stock){
    return stock.ticker;
  })

  var max_dif_co;
  var max_dif=0;

  for(var company in grouped){

    var co_array=grouped[company];

    var lowest_stock = _.min(co_array,function(stock){
      return stock.price;
    })
    var lowest_stock_price=lowest_stock.price;

    var highest_stock= _.max(co_array,function(stock){
      return stock.price;
    })

    var highest_stock_price=highest_stock.price;

    var dif=highest_stock_price-lowest_stock_price;
    if(dif>max_dif){
      max_dif=dif;
      max_dif_co=company;
    }
  }
  return max_dif_co;

};

// Exercise 5. stocks.portfolioValue(data, date, portfolio)
// Write a function that calculates the value of a stock portfolio at a given
// date.
//
// Arguments:
//  - date: a JavaScript Date object indicating which point in time to calculate
//    the value of the portfolio for
//  - portfolio: an object mapping tickers to number of shares owned
//
// ex.
// stocks.totalPortfolioValue(data,
//                            new Date('2016-06-30T00:00:00.000Z'),
//                            {NFLX: 1, GOOG: 10})
//    -> 513.31
stocks.portfolioValue = function(data, date, portfolio) {
  // YOUR CODE HERE
  var value=0;
  var d1=new Date(date);
  for(var i=0;i<data.length;i++){
  //  console.log(data[i].time,d1);
    var cd=new Date(data[i].time);
    if(cd.getTime()===d1.getTime()){
      //console.log("here")
      for(var co in portfolio){
        if(data[i].ticker===co){
          var toadd=portfolio[co]*data[i].price;
          value=value+toadd;
        }
      }
    }
  }

  return value;

  /*
  var date = new Date(date);
  var portfolioArray = _.keys(portfolio);
  var value = 0;

  var filteredData = _.filter(data, function(curr) {
    var currDate = new Date(curr.time);
    return currDate.getTime() === date.getTime()
      && _.contains(portfolioArray, curr.ticker);
  });

  filteredData.forEach(function(curr) {
    value += (curr.price * portfolio[curr.ticker]);
  })

  return value;*/
};

// [Bonus] Exercise 6. stocks.bestTrade(data, ticker)
// Write a function to figure out the best time to buy and sell a given
// stock/ticker/company.
//
//  - You can only buy the stock once and sell it once.
//  - You need to buy the stock before you sell it.
//
// You should return an array containing three items:
//  1. buy date (a Date object)
//  2. sell date (a Date object)
//  3. amount of money made in trade i.e. selling price minus buying price (a number)
//
// Example.
// stocks.bestTrade(stockData, 'GOOG') ->
//  [new Date('2016-06-19T00:00:00.000Z'),
//   new Date('2016-06-28T00:00:00.000Z'),
//   55.54]
stocks.bestTrade = function(data, ticker) {
  // YOUR CODE HERE
  var grouped= _.groupBy(data,function(stock){
    return stock.ticker;
  })
  var array=grouped[ticker];
  //console.log(array);
  array=_.sortBy(array,function(stock){
    return new Date(stock.time).getTime();
  });
  //console.log(array);

  var price_array=[];

  _.forEach(array,function(stock){
    price_array.push(stock.price);
  })

  //console.log(price_array);

  var price_diff_array=[];

  for(var i=0;i<price_array.length-1;i++){
    price_diff_array.push(price_array[i+1]-price_array[i]);
  }
  //console.log(price_diff_array);

  var max=0;
  var max_here=0;
  var start=0;
  var end=0;
  var s=0;

  for (var i=0; i< price_diff_array.length; i++ ){
    max_here += price_diff_array[i];
    if (max < max_here){
      max = max_here;
      start = s;
      end = i;
    }

    if (max_here < 0){
      max_here = 0;
      s = i+1;
    }
  }
  //console.log(max);
  return [new Date(array[start].time),new Date(array[end+1].time),max];

};

// [Super Bonus] Exercise 8. stocks.bestTradeEver(data)
// Write a function to figure out the best stock to buy and when to
// buy and sell it.
//
//  - You can only buy one stock.
//  - You can only buy the stock once and sell it once.
//  - You need to buy the stock before you sell it.
//
// You should return an array containing four items:
//  1. ticker (a string)
//  2. buy date (a Date object)
//  3. sell date (a Date object)
//  4. amount of money made in trade i.e. selling price minus buying price (a number)
//
// Example.
// stocks.bestTradeEver(data) ->
//  ['AMZN',
//   new Date('2016-06-02:00:00.000Z'),
//   new Date('2016-06-24:00:00.000Z'),
//   55.54]
stocks.bestTradeEver = function(data) {
  // YOUR CODE HERE
  var grouped= _.groupBy(data,function(stock){
    return stock.ticker;
  })
  var results=[]
  for(var company in grouped){
    var temp=stocks.bestTrade(data,company);
    temp.unshift(company);
    results.push(temp);
  }
  //console.log(results);
  var bestTrade=0;
  var index=0;


  for(var i=0;i<results.length;i++){
    //console.log(results[i]);
    if(results[i][3]>bestTrade){
      bestTrade=results[i][3];
      index=i;
    }
  }
  return results[index];

};
