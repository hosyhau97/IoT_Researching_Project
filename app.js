var express = require('express');
var app = express();
// var db = require('./db');
global.__root   = __dirname + '/'; 

// view engine setup
app.set('views', './views')
// app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});


// var UserController = require(__root + 'user/UserController');
// app.use('/api/users', UserController);

// var AuthController = require(__root + 'auth/AuthController');
// app.use('/api/auth', AuthController);
console.log("OK");
// var MqttNode = require(__root + 'mqtt/MqttNode');
// app.use('/api/mqtt', MqttNode);

var test = require('./test');
var t = test.router;
app.use('/', t);
module.exports = app;