describe("EventEmitter", function() {
  beforeEach(function() {
    var testEmitter = new EventEmitter;
    var ten = 10, hundred = 100, thousand = 1000;
    var testFn10 = function () {
      return ten;
    }
    var testFn100 = function () {
      return hundred;
    }
    var testFn1000 = function () {
      return thousand;
    }

    var observers = [
      new Observer('testObserver1', testEmitter),
      new Observer('testObserver2', testEmitter),
      new Observer('testObserver3', testEmitter)
    ]

    observers.on('test1', testFn10);
    observers.on('test1', testFn100);
    observers.on('test2', testFn1000);
  });

  it("on", function() {
    //TODO
  });
});
