(function(Genius) {
  var HappyArray = Genius.HappyArray;

  Genius.Stage = function (colors) {
    var _level = colors.length;
    var _failed = false;
    var _colorsToShow = new HappyArray(colors);
    var _colorsToHit = new HappyArray();

    this.nextColor = function() {
      var color = _colorsToShow.popBack();
      _colorsToHit.push(color);
      return color;
    };

    this.hit = function(color) {
      var hitted = color === _colorsToHit.popBack();
      if(!hitted) {
        _failed = true;
      }

      return hitted;
    };

    this.passed = function() {
      return this.allShown() && _colorsToHit.length === 0;
    };

    this.failed = function() {
      return _failed;
    }

    this.level = function() {
      return _level;
    };

    this.allShown = function() {
      return _colorsToShow.length === 0;
    };
  }
}(HugoLnx.Genius));
