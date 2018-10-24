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
var jwt = require('jsonwebtoken'); 
var config = require('./config'); 

var db = require('./db');
var port = process.env.PORT || 3000;
var x_access_token = 'x-access-token';

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

app.get('/home', function(req, res){

  console.log('success...');
  return res.render('index');
});

app.post('/verify',verifyToken, function(req, res, next){

    res.status(200).json({message:"success", code:200});
});


app.get('/', function(req, res){
    var token = req.headers[x_access_token];
    console.log(` t = ${token}`);
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.render('page-signin');
      }
      else {
       return res.redirect('/home');
      }
    });
});

app.use(function(req, res) {
  res.status(400);
 res.render('page-notfound', {title: '404: File Not Found'});
});
app.use(function(req, res) {
  res.status(403);
 res.render('page-notfound', {title: '404: File Not Found'});
});

app.use(function(req, res) {
  res.status(500);
 res.render('page-notfound', {title: '404: File Not Found'});
});
http.listen(port, function () {
  console.log('listening on *:' + port);
});