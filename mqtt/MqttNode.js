var express = require('express');
var mqtt = require('mqtt');
var router = express.Router();
var config = require('./config');
var bodyParser = require('body-parser');
var url = require('url');

var mqtt_url = config.mqtt.CLOUDMQTT_URL;
var topic_subcribe = config.mqtt.TOPIC_PUBLISH;
var topic_publish = config.mqtt.TOPIC_PUBLISH;
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var client = mqtt.connect(mqtt_url);

router.get('/', function (req, res, next) {
  var config = url.parse(mqtt_url);
  res.render('index', {
    connected: client.connected,
    config: config
  });
});

client.on('connect', function () {
  console.log("connected");
  client.subscribe(topic_subcribe, function () {
    console.log('subcribed');
  });
});



module.exports = router;