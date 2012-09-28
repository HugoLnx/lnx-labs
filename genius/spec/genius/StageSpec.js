describe("Stage", function() {
  var Stage = HugoLnx.Genius.Stage;
  var Color = HugoLnx.Genius.Color;

  function stageFactory() {
    return new Stage([Color.FIRST, Color.SECOND]);
  }

  describe("#level()", function() {
    it("returns your own level", function() {
      var stage = stageFactory();
      expect(stage.level()).toBe(2);
    });
  });

  describe("#nextColor()", function() {
    it("returns the next color to be show", function() {
      var stage = stageFactory();
      expect(stage.nextColor()).toEqual(Color.FIRST);
      expect(stage.nextColor()).toEqual(Color.SECOND);
    });
  });

  describe("#hit(color)", function() {
    it("return true if color is the first color shown", function() {
      var stage = stageFactory();
      var color1 = stage.nextColor();
      var color2 = stage.nextColor();

      expect(stage.hit(color1)).toBe(true);
      expect(stage.hit(color2)).toBe(true);
    });

    it("return false if color isnt the last color", function() {
      var stage = stageFactory();
      var color1 = stage.nextColor();
      var color2 = stage.nextColor();
      expect(stage.hit(color2)).toBe(false);
    });
  });

  describe("#passed()", function() {
    it("return true if all colors of stage was hitted", function() {
      var stage = stageFactory();
      var color1 = stage.nextColor();
      var color2 = stage.nextColor();
      stage.hit(color1);
      stage.hit(color2);
      expect(stage.passed()).toBe(true);
    });

    it("return false unless all colors of stage was hitted", function() {
      var stage = stageFactory();
      expect(stage.passed()).toBe(false);
    });
  });

  describe("#failed()", function() {
    it("return false if no hit was missing", function() {
      var stage = stageFactory();
      expect(stage.failed()).toBe(false);
    });

    it("return true if one hit was missing", function() {
      var stage = stageFactory();
      var color1 = stage.nextColor();
      var color2 = stage.nextColor();
      stage.hit(color2);
      expect(stage.failed()).toBe(true);
    });
  });
});
