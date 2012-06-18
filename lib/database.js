var fs = require("fs");

function get(name){
  return fs.readFileSync(__dirname + '/../db/' + name + '.json',"utf-8");
};

exports.experiments = function() {
  return JSON.parse(get("experiments"));;
};

exports.labs = function() {
  return JSON.parse(get("labs"));
};

exports.experiment = function(id) {
  var experiments = exports.experiments()
  for(var i = 0; i<experiments.length; i++) {
    var experiment = experiments[i];
    if(experiment.id === id){
      return experiment;
    }
  }
}
