describe("Integration", function() {
  it("player rise to stage level 2 until he miss", function() {
    var game = new HugoLnx.Genius.Game();
    var stage;
    var colors = [];

    stage = game.nextStage();
    expect(stage.level()).toBe(1);
    expect(stage.passed()).toBe(false);
    
    colors[0] = stage.nextColor()
    expect(stage.hit(colors[0])).toBe(true);
    expect(stage.failed()).toBe(false);
    expect(stage.passed()).toBe(true);


    stage = game.nextStage();
    expect(stage.level()).toBe(2);

    stage.nextColor();
    stage.nextColor();
    expect(stage.hit(null)).toBe(false);
    expect(stage.failed()).toBe(true);
  });

  it("player have to hit the colors in order to pass", function() {
    var game = new HugoLnx.Genius.Game();
    var stage;
    var colors = [];

    game.nextStage();
    stage = game.nextStage();
    colors.push(stage.nextColor());
    colors.push(stage.nextColor());

    expect(stage.hit(colors[0])).toBe(true);
    expect(stage.hit(colors[1])).toBe(true);
    expect(stage.passed()).toBe(true);
  });

  it("the colors of the last stage repeat in the next one", function() {
    var game = new HugoLnx.Genius.Game();
    var stage;
    var colors = [];

    stage6 = nextStage(6, game);
    colors = allColorsOf(stage6);

    stage7 = game.nextStage();
    expect(stage7.nextColor()).toEqual(colors[0]);
    expect(stage7.nextColor()).toEqual(colors[1]);
    expect(stage7.nextColor()).toEqual(colors[2]);
    expect(stage7.nextColor()).toEqual(colors[3]);
    expect(stage7.nextColor()).toEqual(colors[4]);
    expect(stage7.nextColor()).toEqual(colors[5]);
  });

  function nextStage(level, game) {
    for(var i = 1; i < level; i++) {
      game.nextStage();
    }

    return game.nextStage();
  }

  function allColorsOf(stage) {
    var colors = [];
    for(var i = 1; i <= stage.level(); i++) {
      colors.push(stage.nextColor());
    }

    return colors;
  }
});
