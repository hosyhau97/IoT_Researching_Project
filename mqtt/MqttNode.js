var express = require('express');
var mqtt = require('mqtt');
var router = express.Router();
var config = require('./config');
var bodyParser = require('body-parser');
var url = require('url');

var mqtt_url = config.mqtt.CLOUDMQTT_URL;
var topic_subcribe = config.mqtt.TOPIC_SUBCRIBE;
var topic_publish = config.mqtt.TOPIC_PUBLISH;
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var options = {
  port: 17585,
  host: 'm20.cloudmqtt.com',
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: 'lrflsodl',
  password: 'Mpw55C4wBqQQ',
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clean: true,
  encoding: 'utf8'
};
var client = mqtt.connect('m20.cloudmqtt.com', options);

router.get('/', function (req, res, next) {
  var config = url.parse(mqtt_url);
  //config.topic = topic;
  res.render('index', {
    connected: client.connected,
    config: config
  });
});

client.on('connect', function () {
  console.log("connected");
  router.post('/publish', function (req, res) {
    var msg = JSON.stringify({
      date: new Date().toString(),
      msg: req.body.msg
    });
    client.publish(topic_publish, msg, function () {
      console.log("published");
      res.status(204).json({ message: "success" });
    });
  });

  router.get('/stream', function (req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('\n');

    var timer = setInterval(function () {
      res.write('event: ping' + '\n\n');
    }, 20000);

    client.subscribe(topic_subcribe, function () {
      client.on('message', function (topic, msg, pkt) {
        var json = JSON.parse(msg);
        res.write("data: " + json.date + ": " + json.msg + "\n\n");
      });
    });
  });
});

module.exports = router;