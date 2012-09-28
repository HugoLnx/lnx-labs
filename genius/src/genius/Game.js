(function(Genius) {
  var Color = Genius.Color;
  var Stage = Genius.Stage;

  Genius.Game = function() {
    var _colors = [];

    this.nextStage = function() {
      _colors.push(Color.random());
      return new Stage(_colors);
    }
  }
}(HugoLnx.Genius));
