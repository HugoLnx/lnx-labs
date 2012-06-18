var app = require("./lib/app.js");
var db = require("./lib/database.js");
var path = require("path");

app.start(function(server) {
  server.get("/", function(req,res){
    var labs = db.labs();
    var url = "http://" + path.join(req.header("host"));

    var index = app.render("index", {
      "experiments": db.experiments()
    });

    var socialMetatags = app.render("social-metatags", {
      "title": "Index",
      "description": labs.description,
      "image": path.join(url,"images/bigbutton.png"),
      "type": "website",
      "url": url,
      "site-name": labs.name,
      "fb-user-id": labs.author["fb-user-id"],
      "fb-app-id": labs["fb-app-id"]
    });

    var mainMetatags = app.render("main-metatags", {
      "keywords": labs.keywords.join(','),
      "description": labs.description
    });

    res.render('layout', {
      "body": index,
      "title": labs.name + ": Index",
      "main-metatags": mainMetatags,
      "social-metatags": socialMetatags,
      "styles-extra":['index.css'],
      "forkme": "hugolnx/lnx-labs"
    });
  });

  server.get(/\/([^\/]+)/, function(req,res) {
    var labs = db.labs();
    var url = "http://" + path.join(req.header("host"));
    var experiment = db.experiment(req.params[0]);

    var adapter = app.render("adapters/" + experiment.id, {
      "path": experiment.path
    });

    var metatags = app.render("main-metatags", {
      "keywords": experiment.keywords.join(','),
      "description": experiment.description
    });

    var socialMetatags = app.render("social-metatags", {
      "title": experiment.name,
      "description": experiment.description,
      "image": path.join(url,"images/bigbutton.png"),
      "type": "website",
      "url": url,
      "site-name": labs.name,
      "fb-user-id": labs.author["fb-user-id"],
      "fb-app-id": labs["fb-app-id"]
    });

    res.render("layout", {
      "body": adapter,
      "title": labs.name + ": " + experiment.name,
      "main-metatags": metatags,
      "social-metatags": socialMetatags,
      "styles-extra": ['canvas-experiment.css'],
      "forkme": experiment.github
    })
  });
});
