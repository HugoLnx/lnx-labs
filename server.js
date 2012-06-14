var express = require("express");
var fs = require("fs");
var hbs = require("hbs");

var server = express.createServer();
server.configure(function(){
  server.use(express.logger());
  server.use(express.bodyParser());
  server.use(express.static("./public"));
  server.register('.hbs.html',hbs);
  server.register('.html',hbs);
  server.set('view engine', 'hbs.html');
  server.set('views',__dirname + '/views/');
});

function db(name) {
  var json_s = fs.readFileSync(__dirname+'/db/'+name+'.json',"utf-8");
  return JSON.parse(json_s);
}

function findExperimentById(id) {
  var experiments = db('experiments');
  for(var i in experiments) {
    var experiment = experiments[i];
    if(experiment.id === id){
      return experiment;
    }
  }
}

server.get("/", function(req,res){
  res.render('index', {
    "experiments": db('experiments'),
    "forlayout": {
      "styles-extra":['index.css'],
      "forkme": "hugolnx/lnx-labs"
    }
  });
});

server.get(/\/(estrelas|pingos)/, function(req,res) {
  var experiment = findExperimentById(req.params[0]);
  res.render("adapters/"+experiment.id, {
    "path": experiment.path,
    "forlayout": {
      "styles-extra": ['canvas-experiment.css'],
      "forkme": experiment.github
    }
  })
});

var port = process.env.PORT || 3000;

console.log("Listening on port " + port);

server.listen(port);
