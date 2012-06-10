var express = require("express");
var fs = require("fs");
var hbs = require("hbs");

var server = express.createServer();
server.configure(function(){
  server.use(express.logger());
  server.use(express.bodyParser());
  server.use(express.static("./public"));
  server.register('hbs.html',hbs);
  server.set('view engine', 'hbs.html');
  server.set('views',__dirname + '/views/');
});

function db(name) {
  var json_s = fs.readFileSync(__dirname+'/db/'+name+'.json',"utf-8");
  return JSON.parse(json_s);
}

server.get("/", function(req,res){
  res.render('index', {
    "experiments": db('experiments'),
    "styles-extra":['index.css'],
    "forkme": "hugolnx/lnx-labs"
  });
});

var port = process.env.PORT || 3000;

console.log("Listening on port " + port);

server.listen(port);
