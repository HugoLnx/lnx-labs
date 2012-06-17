var fs = require("fs");
var hbs = require("hbs");
var path = require("path");

exports.render = function(viewName, data, settings) {
  var filename = viewName + "." + settings["view engine"];
  var viewPath = path.join(settings["views"], filename);
  var content = fs.readFileSync(viewPath,'utf-8');
  var template = hbs.handlebars.compile(content);
  return template(data);
};
