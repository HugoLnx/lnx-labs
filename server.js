var express = require("express");
var fs = require("fs");
var jsont = require("./lib/json-template.js").jsontemplate;

var server = express.createServer();
server.configure(function(){
  server.use(express.logger());
  server.use(express.bodyParser());
  server.use(express.static("./public"));
  server.set('views',__dirname + '/views/');
});

function find(name) {
  var json_s = fs.readFileSync(__dirname+'/db/'+name+'.json',"utf-8");
  return JSON.parse(json_s);
}

function views(name) {
  return fs.readFileSync(server.settings.views+name,"utf-8");
}
function experimentHtml(experiment) {
  return {
    body: views("/adapters/"+experiment+".body.jsont"),
    head: views("/adapters/"+experiment+".head.jsont")
  }
}

server.get("/", function(req,res){
  var body = jsont.expand(views('index.jsont'),{experiments: find('experiments')});
  var layout = jsont.expand(views('layout.jsont'),{"body-extra": body});
  res.send(layout);
});

server.get("/estrelas", function(req,res){
  var html = experimentHtml('estrelas');
  var body = jsont.expand(html.body,{path: '/experiments/estrelas/'});
  var head = jsont.expand(html.head,{path: '/experiments/estrelas/'});
  var layout = jsont.expand(views('layout.jsont'),{"body-extra": body,"head-extra":head});
  res.send(layout);
})

var port = process.env.PORT || 3000;

console.log("Listening on port " + port);

server.listen(port);
