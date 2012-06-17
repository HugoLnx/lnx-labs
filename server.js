var app = require("./lib/app.js");
var db = require("./lib/database.js");

app.start(function(server) {
  server.get("/", function(req,res){
    res.render('index', {
      "experiments": db.experiments(),
      "forlayout": {
        "styles-extra":['index.css'],
        "forkme": "hugolnx/lnx-labs",
        "keywords": "labs,hugolnx,html5,canvas",
        "description": "Sou Hugo Roque(a.k.a hugolnx) e esse é o meu laboratórios de experiências com html5 & cia."
      }
    });
  });

  server.get(/\/([^\/]+)/, function(req,res) {
    var experiment = db.experiment(req.params[0]);
    res.render("adapters/"+experiment.id, {
      "path": experiment.path,
      "forlayout": {
        "styles-extra": ['canvas-experiment.css'],
        "forkme": experiment.github,
        "keywords": experiment.keywords.join(','),
        "description": experiment.description
      }
    })
  });
});
