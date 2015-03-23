var http = require("http");
var PORT = process.env.PORT || 3000;
var fetch = require("firefox-versions").fetch;
var JSON_CACHE;
var server = http.createServer();
var FETCH_INTERVAL = process.env.FETCH_INTERVAL || 20000;
var SERVER_RUNNING = false;

server.on('request', function(req, res) {
  res.setHeader('Content-type', 'application/json; charset=utf-8');
  res.end(JSON_CACHE, 'utf8');
});

function runServer(err, JSON) {
  if (SERVER_RUNNING === true) {
    server.close(function() {
      server.listen(PORT, function() {
        SERVER_RUNNING = true;
        console.log("Listening on port %d", PORT);
      });
    });
  }
  else {
    server.listen(PORT, function() {
      SERVER_RUNNING = true;
      console.log("Listening on port %d", PORT);
    });
  }
}


if (!module.parent) {
  fetch(function(err, result) {
    if (err) throw err;
    JSON_CACHE = JSON.stringify(result);
    runServer();
  });

  var interval = setInterval(function() {
    console.log("hit interval");
    fetch(function(err, result) {
      if (err) throw err;
      // if (SERVER_RUNNING) {

      // }
      // else {

      // }
    });
  }, FETCH_INTERVAL);
}