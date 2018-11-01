var cors = require('cors');
var morgan = require("morgan");
var verifyToken = require('./auth/VerifyToken');
var jwt = require('jsonwebtoken');
var config = require('./config');
var x_access_token = 'x-access-token';
var db = require('./db');
var cron = require('node-cron');
var FlatternLightEngine = require('./repository/enity/flatterner/engine/FlatternLightEngine');

module.exports.expressApp = function (app, io, express) {
  global.__root = __dirname + '/';
  app.use(morgan("dev"));
  app.use(cors());
  app.use("/assets", express.static(__dirname + "/public"));
  app.set("view engine", "ejs");

  var UserController = require('./user/UserController');
  app.use('/api/users', UserController);

  var AuthController = require('./auth/AuthController');
  app.use('/api/auth', AuthController);

  try {
    var sensor = require('./processor/SensorProcessor');
    sensor.subscribeSensor(io);
  } catch (err) {
    console.log('Error sensor from Server');
  }

  try {
    var engine = require('./processor/EngineProcessor');
    engine.subscribeEngine(io);
  } catch (err) {
    console.log('Error engine from Server');
  }

  try {
    var cronJobs = require('./processor/ReportingProcessor');
    cronJobs.cronJobsSensor(cron);
  } catch (error) {

  }

  app.get('/home', function (req, res) {

    console.log('redirect to home page...');
    return res.render('index');
  });

  app.post('/verify', verifyToken, function (req, res, next) {

    res.status(200).json({ message: "success", code: 200 });
  });

  app.get('/', function (req, res) {
    var token = req.headers[x_access_token];
    console.log(` t = ${token}`);
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        console.log(err);
        return res.render('page-signin');
      }
      else {
        return res.redirect('/home');
      }
    });
  });

  app.get('/chart-morris-sensor-day', function (req, res) {
    return  res.render('chart-morris-sensor-day');
  });

  app.get('/chart-morris-sensor-month', function (req, res) {
    res.render('chart-morris-sensor-month');
  });

  app.get('/chart-morris-engine-day', function (req, res) {
    res.render('chart-morris-engine-day');
  });

  app.get('/chart-morris-engine-month', function (req, res) {
    res.render('chart-morris-engine-month');
  });

  app.use(function (req, res) {
    res.status(400);
    res.render('page-notfound', { title: '404: File Not Found' });
  });
  app.use(function (req, res) {
    res.status(403);
    res.render('page-notfound', { title: '404: File Not Found' });
  });

  app.use(function (req, res) {
    res.status(500);
    res.render('page-notfound', { title: '404: File Not Found' });
  });

  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Having error from server.', err: 500 });
    next();
  })

  app.use((err, req, res, next) => {
    console.log(err);
    res.status(400).json({ message: 'Bad request from user.', err: 400 });
    next();
  })
}