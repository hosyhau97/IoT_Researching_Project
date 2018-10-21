var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var db = require('./db');
global.__root   = __dirname + '/'; 

app.get('/', function(req, res){
  throw new Error("BROKEN");
  // res.sendFile(__dirname + '/index.html');
});

var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

var sensor = require('./sensor/SensorController');
sensor.subscribeSensor(io);

http.listen(port, function(){
  console.log('listening on *:' + port);
});