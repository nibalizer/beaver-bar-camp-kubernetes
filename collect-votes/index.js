// Load Config File
var config = require('./config.json');

// Load libraries; instantiate express app and socket.io
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json

var votes = {}

function validate_vote(vote) {
  return true;
}
function record_vote(vote) {
  return true;
}

app.get('/votes', function(req, res){
  res.json(votes);
});

app.get('/info', function(req, res){
  var info = {}
  info['hostname'] = environ['HOSTNAME']; // TODO make real js
  info['version'] = '0.0.1';
  info['uptime'] = 0;

  res.json(info);
});

app.post('/vote', function(req, res){
  var vote = req.body['vote'];
  console.log(req.body);
  if (validate_vote(vote)) {
    record_vote(vote);
    res.send('Vote Recorded');
  } else {
    res.status(400).send("Bad Vote");
  }
});

// Start the web server on port 3000
http.listen(3001, function(){
  console.log('listening on *:3001');
});

