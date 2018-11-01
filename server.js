'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var expressApp = require('./app');
expressApp.expressApp(app, io, express);

http.listen(port, function (){
  console.log('listening on *:' + port);
});