var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// var db = require('./db');

global.__root   = __dirname + '/'; 

// view engine setup
// app.set('views', './views')
// app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'pug');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("socket is connected");
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat', msg);
  });
  socket.on('disconnect', function(data){
    console.log('disconected');
  })
});
// var UserController = require(__root + 'user/UserController');
// app.use('/api/users', UserController);

// var AuthController = require(__root + 'auth/AuthController');
// app.use('/api/auth', AuthController);

// var MqttNode = require(__root + 'mqtt/MqttNode');
// app.use('/api/mqtt', MqttNode);

// var sensor = require('./sensor/SensorController');
// sensor.subscribeSensor(io);

http.listen(port, function(){
  console.log('listening on *:' + port);
});




