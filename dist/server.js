var express = require('express');
var path = require('path');
var http = require('http');
var pjson = require('./package.json');

var app = express();

app.use('/client_version', function(req, res){
  res.end(pjson.version);
});
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));
app.use('/app.full.min.css', express.static(path.join(__dirname, 'app.full.min.css')));
app.use('/app.full.min.js', express.static(path.join(__dirname, 'app.full.min.js')));

app.use('*', function(req,res){
	res.sendFile(path.join(__dirname, 'index.html'));
});

var server = http.createServer(app);
server.listen(5001, '0.0.0.0');
