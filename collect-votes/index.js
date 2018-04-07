// Load Config File
var config = require('./config.json');

// Load libraries; instantiate express app and socket.io
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
var request = require("request");

var votes = {}

function validate_vote(vote, res) {
  console.log(vote);
  var body = {};
  body['vote'] = vote;
  var options = {
    url: "http://localhost:3002/validate",
    json: body
  }
  result = false;
  request.post(options, function(err, response, body){
    if (response.statusCode == 400) {
      console.log('Invalid word');
      res.status(400).send("Bad Vote");
    } else {
      record_vote(vote);
      res.send("Good Vote");
    }
  });
}

function record_vote(vote) {
  if (votes[vote] == undefined) {
    votes[vote] = 1;
  } else {
    votes[vote] += 1;
  }
}

app.get('/votes', function(req, res){
  res.json(votes);
});

app.get('/info', function(req, res){
  var info = {}
  info['hostname'] = 'hostname'; //environ['HOSTNAME']; // TODO make real js
  info['version'] = '0.0.2';
  info['uptime'] = 0;

  res.json(info);
});

app.post('/vote', function(req, res){
  var vote = req.body['vote'];
  console.log(req.body);
  validate_vote(vote, res);
});

// Start the web server on port 3000
http.listen(3001, function(){
  console.log('listening on *:3001');
});

