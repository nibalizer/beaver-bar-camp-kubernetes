// Load Config File
var config = require('./config.json');

// Load libraries; instantiate express app and socket.io
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
var http = require('http').Server(app);

var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var valid_votes = ['pirate', 'ninja']

app.get('/valid_votes', function(req, res){
  res.json(valid_votes);
});

app.get('/info', function(req, res){
  var info = {}
  info['hostname'] = 'stuff'; //environ['HOSTNAME']; // TODO make real js
  info['version'] = '0.0.2';
  info['uptime'] = 0;

  res.json(info);
});

app.post('/validate', upload.array(), function(req, res, next){
  var vote = req.body['vote'];
  console.log(req.body);
  if (vote == undefined) {
    res.status(400).send('Bad Payload');
    return;
  }
  if (valid_votes.includes(vote)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// Start the web server on port 3000
http.listen(3002, function(){
  console.log('listening on *:3002');
});

