var express = require("express");
var hbs = require("hbs");

var server = express.createServer();
server.configure(function(){
  server.use(express.logger());
  server.use(express.bodyParser());
  server.use(express.static("./public"));
  server.register('.hbs.html', hbs);
  server.register('.html', hbs);
  server.set('view engine', 'hbs.html');
  server.set('views', __dirname + '/../views/');
  server.set('view options', {"layout": false});
});

exports.server = server;
