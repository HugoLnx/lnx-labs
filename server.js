var app = require("./lib/app.js");
var db = require("./lib/database.js");

app.start(function(server) {
  server.get("/", function(req,res){
    res.render('index', {
      "experiments": db.experiments(),
      "forlayout": {
        "styles-extra":['index.css'],
        "forkme": "hugolnx/lnx-labs"
      }
    });
  });

  server.get(/\/([^\/]+)/, function(req,res) {
    console.log(req.params[0]);
    var experiment = db.experiment(req.params[0]);
    res.render("adapters/"+experiment.id, {
      "path": experiment.path,
      "forlayout": {
        "styles-extra": ['canvas-experiment.css'],
        "forkme": experiment.github
      }
    })
  });
});
