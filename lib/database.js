var fs = require("fs");

function experimentsJSON(){
  return fs.readFileSync(__dirname + '/../db/experiments.json',"utf-8");
};

var experiments = JSON.parse(experimentsJSON());

exports.experiments = function() {
  return experiments;
};

exports.experiment = function(id) {
  for(var i = 0; i<experiments.length; i++) {
    var experiment = experiments[i];
    if(experiment.id === id){
      return experiment;
    }
  }
}
