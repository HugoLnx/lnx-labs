var server = require("../config/server.js").server;

exports.start = function(define_actions) {
  define_actions(server);

  var port = process.env.PORT || 3000;
  console.log("Listening on port " + port);
  server.listen(port);
}
