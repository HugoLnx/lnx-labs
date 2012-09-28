(function(Genius){
  Genius.Color = function(code) {
    var _code = code;

    this.code = function() {
      return _code;
    };
  };

  var Color = Genius.Color;

  Color.FIRST = new Color(0);
  Color.SECOND = new Color(1);
  Color.THIRD = new Color(2);
  Color.FOURTH = new Color(3);

  Color.ofCode = function(code) {
    var all = [
      Color.FIRST,
      Color.SECOND,
      Color.THIRD,
      Color.FOURTH
    ];

    return all[code];
  };

  Color.random = function() {
    var i = Math.round(Math.random()*10) % 4;
    return Color.ofCode(i);
  }
}(HugoLnx.Genius));
