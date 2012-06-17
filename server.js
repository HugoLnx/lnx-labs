var app = require("./lib/app.js");
var db = require("./lib/database.js");

app.start(function(server) {
  server.get("/", function(req,res){
    var index = app.render("index", {
      "experiments": db.experiments()
    });

    var mainMetatags = app.render("main-metatags", {
      "keywords": "labs,hugolnx,html5,canvas",
      "description": "Sou Hugo Roque(a.k.a hugolnx) e esse é o meu laboratórios de experiências com html5 & cia."
    });

    res.render('layout', {
      "body": index,
      "main-metatags": mainMetatags,
      "styles-extra":['index.css'],
      "forkme": "hugolnx/lnx-labs",
    });
  });

  server.get(/\/([^\/]+)/, function(req,res) {
    var experiment = db.experiment(req.params[0]);

    var adapter = app.render("adapters/" + experiment.id, {
      "path": experiment.path
    });

    var metatags = app.render("main-metatags", {
      "keywords": experiment.keywords.join(','),
      "description": experiment.description
    });

    res.render("layout", {
      "body": adapter,
      "main-metatags": metatags,
      "styles-extra": ['canvas-experiment.css'],
      "forkme": experiment.github,
    })
  });
});
