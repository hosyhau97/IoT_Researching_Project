'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var morgan = require("morgan");
var cors = require('cors');

var db = require('./db');
var port = process.env.PORT || 3000;

global.__root = __dirname + '/';
app.use(morgan("dev"));
app.use(cors());
app.use("/assets", express.static(__dirname + "/public"));
app.set("view engine", "ejs");

var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

try {
  var sensor = require('./sensor/SensorController');
  sensor.subscribeSensor(io);
} catch (error) {
  throw { status: error.status, message: error.message };
}

try {
  var engine = require('./engine/EngineController');
  engine.subscribeEngine(io);
} catch (error) {
  throw { status: error.status, message: error.message };
}

http.listen(port, function () {
  console.log('listening on *:' + port);
});


app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ status: err.status, message: err.message })
});