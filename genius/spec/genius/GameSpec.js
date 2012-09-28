describe("Game", function() {
  var Game = HugoLnx.Genius.Game;

  describe("#nextStage()", function() {
    it("pass next stage with incrementing level", function() {
      var game = new Game();
      expect(game.nextStage().level()).toBe(1);
      expect(game.nextStage().level()).toBe(2);
      expect(game.nextStage().level()).toBe(3);
    });

    it("maintain the colors of the past stages", function() {
      var game = new Game();
      var stage1 = game.nextStage();
      var stage2 = game.nextStage();
      var stage3 = game.nextStage();
      var stage4 = game.nextStage();
      var stage5 = game.nextStage();

      var color1 = stage1.nextColor();
      expect(stage2.nextColor()).toEqual(color1);
      expect(stage3.nextColor()).toEqual(color1);
      expect(stage4.nextColor()).toEqual(color1);
      expect(stage5.nextColor()).toEqual(color1);

      var color2 = stage2.nextColor();
      expect(stage3.nextColor()).toEqual(color2);
      expect(stage4.nextColor()).toEqual(color2);
      expect(stage5.nextColor()).toEqual(color2);

      var color3 = stage3.nextColor();
      expect(stage4.nextColor()).toEqual(color3);
      expect(stage5.nextColor()).toEqual(color3);

      var color4 = stage4.nextColor();
      expect(stage5.nextColor()).toEqual(color4);
    });
  });
});
