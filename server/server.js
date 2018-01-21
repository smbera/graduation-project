var express = require('express');
var app = express();
var mongoose = require("mongoose");
var routes = require('./routes/index.js');

mongoose.connect("mongodb://127.0.0.1:27017/graduation-project");

app.use('/', routes);

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
