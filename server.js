'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var morgan = require("morgan");
var cors = require('cors');
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

var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

try {
  var sensor = require('./processor/SensorProcessor');
  sensor.subscribeSensor(io);
} catch (err) {
  // const error = new Error('Failed to connect to Cloud || Mongo DB.');
  // error.httpStatusCode = 500
  // return next(error)
}

try {
  var engine = require('./processor/EngineProcessor');
  engine.subscribeEngine(io);
} catch (err) {
  // const error = new Error('Failed to connect to Cloud || Mongo DB.');
  // error.httpStatusCode = 500;
  // return next(error);
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
/*
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({message:'Having error from server.', err:500});
  next();
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({message:'Bad request from user.', err:400});
  next();
})
*/

http.listen(port, function () {
  console.log('listening on *:' + port);
});

