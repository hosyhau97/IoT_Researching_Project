'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var morgan = require("morgan");
var cors = require('cors');
var cookieParser = require('cookie-parser');
var localStorage = require('localStorage');
var verifyToken = require('./auth/VerifyToken');

var db = require('./db');
var port = process.env.PORT || 3000;
var x_access_token = 'x-access-token';

var tokenFilter = require('./auth/TokenFilter');

global.__root = __dirname + '/';
app.use(morgan("dev"));
app.use(cors());
app.use("/assets",express.static(__dirname+"/public"));
app.set("view engine", "ejs");
app.use(cookieParser());

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
app.get('/index',verifyToken, function(req, res, next){
  var token = req.headers['x-access-token'];
  console.log(`token1 = ${token}`);
 return res.redirect('/');
});

app.get('/', function(req, res){
  var token = localStorage.getItem('token');
  if (!token){
    return res.render('page-signin');
  } else return res.render('index');
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});


app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ status: err.status, message: err.message })
});