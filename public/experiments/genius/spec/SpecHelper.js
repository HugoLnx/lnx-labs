beforeEach(function() {
  this.addMatchers({
    toBeKindOf: function(expected) {
      var prototype = Object.getPrototypeOf(this.actual)
      return prototype === expected.prototype;
    }
  });
});
